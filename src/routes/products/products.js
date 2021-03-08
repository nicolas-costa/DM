module.exports = (app) => {
  const productController = app.src.controllers.productController;

  app.route('/api/products/:name').get(productController.byName);
};
