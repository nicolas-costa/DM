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
      // define association here
    }
  }
  ProductPurchase.init(
    {
      product_id: DataTypes.UUID,
      purchase_id: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "ProductPurchase",
    }
  );
  return ProductPurchase;
};
