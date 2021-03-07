const productRepository = require('../repositories/productRepository');

/**
 * Retorna a lista de produtos com seu preço e quantidade atual em estoque
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.byName = async (req, res) => {
  try {
    const product = await productRepository.byName(req);

    if (!product) {
      res.status(404).send({});
    } else {
      res.status(200).send(product);
    }
  } catch (e) {
    res.status(500).send({
      error: e,
    });
  }
};
