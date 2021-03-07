
const getPurchasesQuery = (Product, sequelize) => ({
  attributes: ["id"],
  include: {
    model: Product,
    through: {
      attributes: [],
    },
    attributes: ["id", "name", "price",
      [sequelize.fn('COUNT', sequelize.col('Products->ProductPurchase.product_id')), 'quantity']]
  },
  group: ['Purchase.id', 'Products.id']
});

exports.getAll = async (req) => {
  try {
    const { Purchase, Product, sequelize } = req.app.src.models.index;
    return await Purchase.findAll({
      ...getPurchasesQuery(Product, sequelize)
    }).then((purchases) => {
      return purchases.map((purchase) => {
        let total = 0;

        purchase.Products.forEach((prod) => {
          total += prod.price * prod.quantity;
        });

        purchase.dataValues['total'] = total;

        return purchase;
      });
    });
  } catch (e) {
    throw e;
  }
};

exports.getById = async (req) => {
  try {
    const { params: {
      id = 0
    }} = req;
    const { Purchase, Product, sequelize } = req.app.src.models.index;

    return await Purchase.findOne({
      where: {
        id
      },
      ...getPurchasesQuery(Product, sequelize)
    }).then((purchases) => {
      let total = 0;

      purchases.Products.forEach((prod) => {
        total += prod.price;
      });
      purchases.dataValues['total'] = total;

      return purchases;
    });
  } catch (e) {
    throw e;
  }
}

