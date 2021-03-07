exports.getAll = async (req) => {
  try {
    const { Purchase, Product, sequelize } = req.app.src.models.index;
    return await Purchase.findAll({
      attributes: ["id"],
      include: {
        model: Product,
        through: {
          attributes: [],
        },
        attributes: ["id", "name", "price"],
      },
    }).then((purchases) => {
      return purchases.map((purchase) => {
        let total = 0;

        purchase.Products.forEach((prod) => {
          total += prod.price;
        });

        purchase.dataValues['total'] = total;

        return purchase;
      });
    });
  } catch (e) {
    throw e;
  }
};
