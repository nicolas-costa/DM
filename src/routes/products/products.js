module.exports = (app) => {
  const productController = app.src.controllers.productController;

  app.route('/products/:name').get(productController.byName);
};
