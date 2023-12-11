import { SignatureOptions } from '../model/signature-options';
import { PdfCreator } from './pdf-creator';
import PDFKitReferenceMock from './pdf-kit-reference-mock';
export declare const appendFont: (pdf: PdfCreator, fontName: string) => PDFKitReferenceMock;
export declare const appendAcroform: (pdf: PdfCreator, fieldIds: PDFKitReferenceMock[], widgetReferenceList: PDFKitReferenceMock[], fonts: {
    name: string;
    ref: PDFKitReferenceMock;
}[], acroFormId?: any) => PDFKitReferenceMock;
export declare const appendImage: (pdf: PdfCreator, signatureOptions: SignatureOptions) => Promise<PDFKitReferenceMock | undefined>;
export declare const appendAnnotationApparance: (pdf: PdfCreator, signatureOptions: SignatureOptions, apFontReference: PDFKitReferenceMock, image?: PDFKitReferenceMock | undefined) => PDFKitReferenceMock;
export declare const appendWidget: (pdf: PdfCreator, widgetIndex: number, signatureOptions: SignatureOptions, signatureReference: PDFKitReferenceMock, apReference: PDFKitReferenceMock) => PDFKitReferenceMock;
export declare const appendSignature: (pdf: PdfCreator, signatureOptions: SignatureOptions, signatureLength?: number, byteRangePlaceholder?: string) => PDFKitReferenceMock;
