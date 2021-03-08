"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductPurchase extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ProductPurchase.belongsTo(models.Product, { foreignKey: 'product_id'})
    }
  }
  ProductPurchase.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      product_id: DataTypes.INTEGER,
      purchase_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ProductPurchase",
    }
  );
  return ProductPurchase;
};
