const { check, validationResult } = require('express-validator');

exports.validatePurchase = [
    check('products')
        .notEmpty()
        .isArray()
        .withMessage('Produtos deve ser um array com pelo menos 1 item.')
        .bail(),
    check('products.*.name')
        .isLength({ min: 1})
        .withMessage('O produto do pedido deve ter um nome válido.')
        .bail(),
    check('products.*.quantity')
        .isInt({ min: 1})
        .withMessage('O produto do pedido deve ter um número inteiro positivo como quantidade.')
        .bail(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({errors: errors.array()});
        next();
    }
];
