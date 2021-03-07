const purchaseRepository = require("../repositories/purchaseRepository");

/**
 * Retorna a lista de todos os pedidos com seus respsectivos produtos
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.getAll = async (req, res) => {
  try {
    const purchases = await purchaseRepository.getAll(req);

    res.status(200).send(purchases);
  } catch (e) {
    res.status(500).send(e);
  }
};
