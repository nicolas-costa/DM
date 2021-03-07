const getPurchasesQuery = (Product, sequelize) => ({
  attributes: ['id'],
  include: {
    model: Product,
    through: {
      attributes: [],
    },
    attributes: [
      'id',
      'name',
      'price',
      [
        sequelize.fn(
          'COUNT',
          sequelize.col('Products->ProductPurchase.product_id')
        ),
        'quantity',
      ],
    ],
  },
  group: ['Purchase.id', 'Products.id'],
});

exports.getAll = async (req) => {
  const { Purchase, Product, sequelize } = req.app.src.models.index;
  try {
    return await Purchase.findAll({
      ...getPurchasesQuery(Product, sequelize),
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
  const { Purchase, Product, sequelize } = req.app.src.models.index;
  try {
    const {
      params: { id = 0 },
    } = req;

    return await Purchase.findOne({
      where: {
        id,
      },
      ...getPurchasesQuery(Product, sequelize),
    }).then((purchase) => {
      let total = 0;

      purchase.Products.forEach((prod) => {
        total += prod.price;
      });
      purchase.dataValues['total'] = total;

      return purchase;
    });
  } catch (e) {
    throw e;
  }
};

exports.create = async (req) => {
  const {
    Purchase,
    ProductPurchase,
    Product,
    sequelize,
    Sequelize,
  } = req.app.src.models.index;
  const { Op } = Sequelize;
  const transaction = await sequelize.transaction();

  try {
    const {
      body: { products = [] },
    } = req;

    const purchase = await Purchase.create({}, { transaction });

    for (const product of products) {
      const { name = '', quantity: quantityToOrder = 0 } = product;

      const productToOrder = await Product.findOne({
        where: {
          name,
          quantity: {
            [Op.gte]: quantityToOrder,
          },
        },
      });

      if (!productToOrder) {
        throw new Error('Product unavailable');
      } else {
        for (let a = 0; a < quantityToOrder; a++) {
          await ProductPurchase.create({
            product_id: productToOrder.dataValues.id,
            purchase_id: purchase.dataValues.id,
          }, { transaction });
        }

        await productToOrder.update({
          quantity: productToOrder.quantity - quantityToOrder,
        }, { transaction });
      }
    }

    await transaction.commit();

    req.params.id = purchase.id;
    return await this.getById(req);
  } catch (e) {
    transaction.rollback();
    throw e;
  }
};
