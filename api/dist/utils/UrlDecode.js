"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlEncode = exports.urlDecode = void 0;
function urlDecode(encodedString) {
    const decodedString = decodeURIComponent(encodedString);
    return decodedString.replace("###DOTCOM###", ".com");
}
exports.urlDecode = urlDecode;
function urlEncode(inputString) {
    const stringWithoutDotCom = inputString.replace(".com", "###DOTCOM###");
    const encodedString = encodeURIComponent(stringWithoutDotCom);
    return encodedString;
}
exports.urlEncode = urlEncode;
//# sourceMappingURL=UrlDecode.js.map