const express = require("express");
const path = require("path");
const multer = require("multer");
const fs = require('fs').promises;
const { sign } = require('pdf-signer');
const { verifySignature  } = require('pdf-signer');

const app = express();
const port = 3000;

const p12FilePath = '../firma_electronica/certificado/pdf-signer.p12';

app.use(express.static(path.join(__dirname, "../public")));

app.use(express.raw({ type: "application/pdf" }));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // Utiliza path.join para especificar la ruta completa deseada
      const destinationPath = path.join(__dirname, '..', 'uploads');
      cb(null, destinationPath);
    },
    filename: function (req, file, cb) {
      // Utiliza path.join para concatenar las rutas de manera segura
      cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    },
});
  
const upload = multer({ storage: storage });

const outputFilePath = path.join(__dirname, '..', 'uploads', 'documentofirmado.pdf');

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/views/index.html"));
});

app.post("/sign-pdf", upload.single("archivo"), async (req, res) => {
    try {
        const pdfBuffer = await fs.readFile(req.file.path);
        const p12Buffer = await fs.readFile(p12FilePath);

        // Asegúrate de que 'sign' devuelve una Promise resolviendo su valor
        const signedPdfBuffer = await sign(pdfBuffer, p12Buffer, '12345', {
            reason: 'Firma electrónica',
            location: 'Ciudad',
            signerName: 'Test User',
            annotationAppearanceOptions: {
                signatureCoordinates: { left: 0, bottom: 700, right: 190, top: 860 },
                signatureDetails: [
                    {
                        value: 'Signed by: Test User',
                        fontSize: 7,
                        transformOptions: { rotate: 0, space: 1, tilt: 0, xPos: 20, yPos: 20 },
                    },
                    {
                        value: `Date: ${new Date().toISOString().split('T')[0]}`,
                        fontSize: 7,
                        transformOptions: { rotate: 0, space: 1, tilt: 0, xPos: 20, yPos: 30 },
                    },
                ],
            },
        });

        // Utiliza writeFile de manera asíncrona
        await fs.writeFile(outputFilePath, signedPdfBuffer);

        console.log(`Documento firmado guardado en: ${outputFilePath}`);
        res.send("Documento firmado correctamente");
    } catch (err) {
        console.error("Error al firmar el documento:", err);
        res.status(500).send(`Error al firmar el documento: ${err.message}`);
    }
});

app.post("/validate-pdf", upload.single("validate-arch"), async (req, res) => {
    try {
        const pdfBuffer = await fs.readFile(req.file.path);
        
        // Aquí asumimos que tienes la clave pública o el certificado para verificar la firma
        // Debes reemplazar 'publicKeyBuffer' con tu clave pública real
        const publicKeyBuffer = await fs.readFile('./certificado/public_key.pem');

        const isValid = verifySignature(pdfBuffer, publicKeyBuffer);

        if (isValid) {
            res.send("La firma del documento es válida");
        } else {
            res.status(400).send("La firma del documento no es válida");
        }
    } catch (err) {
        console.error("Error al validar la firma del documento:", err);
        res.status(500).send(`Error al validar la firma del documento: ${err.message}`);
    }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
