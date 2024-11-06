"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchema = void 0;
function validateSchema(schema) {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            return res
                .status(422)
                .send(error.details.map((detail) => detail.message));
        }
        next();
    };
}
exports.validateSchema = validateSchema;
//# sourceMappingURL=validateSchema.js.map