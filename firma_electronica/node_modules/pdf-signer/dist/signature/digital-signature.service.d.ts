/// <reference types="node" />
export declare const getSignature: (pdfWithByteRange: Buffer, p12Buffer: Buffer, placeholderLength: number, certPassword: string) => string;
export declare const getOnlyRawSignature: (pdfWithByteRange: Buffer, p12Buffer: Buffer, placeholderLength: number, certPassword: string) => string;
export declare const getSignatureFromRawSignature: (rawSignature: string, placeholderLength: number) => string;
