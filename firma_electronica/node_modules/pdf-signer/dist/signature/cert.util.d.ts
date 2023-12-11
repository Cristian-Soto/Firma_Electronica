/// <reference types="node" />
import forge from 'node-forge';
export declare const getDataFromP12Cert: (p12Buffer: Buffer, certPassword: string) => forge.pkcs12.Pkcs12Pfx;
export declare const getCertBags: (p12: forge.pkcs12.Pkcs12Pfx) => forge.pkcs12.Bag[];
