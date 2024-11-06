"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUUID = void 0;
function isUUID(str) {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(str);
}
exports.isUUID = isUUID;
//# sourceMappingURL=validations.js.map