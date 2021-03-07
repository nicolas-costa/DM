module.exports = (app) => {
    const purchaseController = app.src.controllers.purchaseController;

    app.route('/orders')
        .get(purchaseController.getAll);
};
