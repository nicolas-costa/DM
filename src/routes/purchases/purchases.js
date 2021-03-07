const validators = require("../validators/purchases/purchases");

module.exports = (app) => {
    const purchaseController = app.src.controllers.purchaseController;

    app.route('/orders')
        .get(purchaseController.getAll)
        .post(validators.validatePurchase, purchaseController.create);

    app.route('/orders/:id')
        .get(purchaseController.getById);
};
