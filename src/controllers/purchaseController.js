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

/**
 * Retorna um pedido e seus produtos associados de acordo com o id especificado
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.getById = async (req, res) => {
  try {
    const purchase = await purchaseRepository.getById(req);

    if(!purchase) {
      res.status(404)
          .send();
    }

    res.status(200)
        .send(purchase)
  } catch (e) {
    res.status(500)
        .send(e)
  }
};

/**
 * Cria um novo pedido com os produtos especificados
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.create = async (req, res) => {
  try {
    const purchase = await purchaseRepository.create(req);

    res.status(201)
        .send(purchase)
  } catch (e) {
    res.status(e.message === 'Product unavailable' ? 400 : 500)
        .send(e)
  }
};
