"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var find_object_1 = __importDefault(require("./find-object"));
var get_pages_dictionary_ref_1 = __importDefault(require("./get-pages-dictionary-ref"));
var getPageRef = function (pdf, info, annotationOnPage) {
    if (annotationOnPage === void 0) { annotationOnPage = 0; }
    var pagesRef = get_pages_dictionary_ref_1.default(info);
    var pagesDictionary = find_object_1.default(pdf, info.xref, pagesRef);
    var kidsPosition = pagesDictionary.indexOf('/Kids');
    var kidsStart = pagesDictionary.indexOf('[', kidsPosition) + 1;
    var kidsEnd = pagesDictionary.indexOf(']', kidsPosition);
    var pages = pagesDictionary.slice(kidsStart, kidsEnd).toString();
    var pageIndexList = pages.split('0 R').filter(function (p) { return p !== ''; });
    return (pageIndexList[annotationOnPage] + " 0 R").trim();
};
exports.default = getPageRef;
