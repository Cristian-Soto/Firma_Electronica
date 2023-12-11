/// <reference types="node" />
import PDFKitReferenceMock from './pdf-kit-reference-mock';
export declare class PdfCreator {
    pdf: any;
    originalPdf: any;
    maxIndex: any;
    addedReferences: Map<any, any>;
    annotationOnPages: {
        pageRef: PDFKitReferenceMock;
        pageIndex: number;
    }[];
    widgetCounter: number;
    constructor(originalPdf: Buffer, annotationOnPages: number[]);
    initAnnotationInfos(annotationOnPage: number): void;
    getCurrentWidgetPageReference(): PDFKitReferenceMock;
    append(pdfElement: any, additionalIndex?: number | undefined): PDFKitReferenceMock;
    appendStream(pdfElement: any, stream: any, additionalIndex?: number | undefined): PDFKitReferenceMock;
    close(form: any, widgetReferenceList: PDFKitReferenceMock[]): void;
    private appendPdfObjectWithStream;
    private appendPdfObject;
    private isContainBufferRootWithAcrofrom;
}
