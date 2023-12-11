/// <reference types="node" />
import { SignatureOptions } from './pdf/model/signature-options';
export declare const sign: (pdf: Buffer, certBuffer: Buffer, certPassword: any, signatureOptions: SignatureOptions) => Promise<Buffer>;
