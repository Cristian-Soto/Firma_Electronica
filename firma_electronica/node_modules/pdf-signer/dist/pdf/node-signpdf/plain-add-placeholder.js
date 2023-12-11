"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var const_1 = require("./const");
var pdf_creator_1 = require("./pdf-creator");
var pdf_kit_add_placeholder_1 = require("./pdf-kit-add-placeholder");
var pdf_kit_reference_mock_1 = __importDefault(require("./pdf-kit-reference-mock"));
var plainAddPlaceholder = function (pdfBuffer, signatureOptions, signatureLength) {
    if (signatureLength === void 0) { signatureLength = const_1.DEFAULT_SIGNATURE_LENGTH; }
    return __awaiter(void 0, void 0, void 0, function () {
        var annotationOnPages, pdfAppender, acroFormPosition, isAcroFormExists, acroFormId, fieldIds, acroForm, imageReference, signatureReference, helveticaFontReference, zapfDingbatsFontReference, widgetReferenceList, formReference;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    annotationOnPages = signatureOptions.annotationOnPages != null ? signatureOptions.annotationOnPages : [0];
                    pdfAppender = new pdf_creator_1.PdfCreator(pdfBuffer, annotationOnPages);
                    acroFormPosition = pdfAppender.pdf.lastIndexOf('/Type /AcroForm');
                    isAcroFormExists = acroFormPosition !== -1;
                    fieldIds = [];
                    if (isAcroFormExists) {
                        acroForm = getAcroForm(pdfAppender.pdf, acroFormPosition);
                        acroFormId = getAcroFormId(acroForm);
                        fieldIds = getFieldIds(acroForm);
                    }
                    return [4 /*yield*/, pdf_kit_add_placeholder_1.appendImage(pdfAppender, signatureOptions)];
                case 1:
                    imageReference = _a.sent();
                    signatureReference = pdf_kit_add_placeholder_1.appendSignature(pdfAppender, signatureOptions, signatureLength);
                    helveticaFontReference = pdf_kit_add_placeholder_1.appendFont(pdfAppender, 'Helvetica');
                    zapfDingbatsFontReference = pdf_kit_add_placeholder_1.appendFont(pdfAppender, 'ZapfDingbats');
                    widgetReferenceList = annotationOnPages.map(function (annotationPage, index) {
                        var annotationReference = pdf_kit_add_placeholder_1.appendAnnotationApparance(pdfAppender, signatureOptions, helveticaFontReference, imageReference);
                        var widgetReference = pdf_kit_add_placeholder_1.appendWidget(pdfAppender, fieldIds.length > 0 ? fieldIds.length + index + 1 : index + 1, signatureOptions, signatureReference, annotationReference);
                        return widgetReference;
                    });
                    formReference = pdf_kit_add_placeholder_1.appendAcroform(pdfAppender, fieldIds, widgetReferenceList, [
                        { name: 'Helvetica', ref: helveticaFontReference },
                        { name: 'ZapfDingbats', ref: zapfDingbatsFontReference },
                    ], acroFormId);
                    pdfAppender.close(formReference, widgetReferenceList);
                    return [2 /*return*/, pdfAppender.pdf];
            }
        });
    });
};
var getAcroForm = function (pdfBuffer, acroFormPosition) {
    var endobjPosition = pdfBuffer.lastIndexOf('endobj', acroFormPosition);
    var content = pdfBuffer.slice(endobjPosition, pdfBuffer.length);
    var regex = new RegExp(/(\d+)\s+0\s+obj\s+<<\s+\/Type\s+\/AcroForm\s+\/SigFlags\s+\d+\s+\/Fields\s+\[(.+)\]/, 'gm');
    var acroFormMatch = regex.exec(content.toString('utf-8'));
    var acroForm = acroFormMatch[0];
    return acroForm;
};
var getAcroFormId = function (acroForm) {
    var acroFormFirsRow = acroForm.split('\n')[0];
    var acroFormId = parseInt(acroFormFirsRow.split(' ')[0]);
    return acroFormId;
};
var getFieldIds = function (acroForm) {
    var fieldIds = [];
    var acroFormFields = acroForm.slice(acroForm.indexOf('/Fields [') + 9, acroForm.indexOf(']'));
    fieldIds = acroFormFields
        .split(' ')
        .filter(function (_element, index) { return index % 3 === 0; })
        .map(function (fieldId) { return new pdf_kit_reference_mock_1.default(fieldId); });
    return fieldIds;
};
exports.default = plainAddPlaceholder;
