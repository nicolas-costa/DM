"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Purchase extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Purchase.belongsToMany(models.Product, {
        through: models.ProductPurchase,
      });
    }
  }
  Purchase.init(
    {
      user_id: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "Purchase",
    }
  );
  return Purchase;
};
