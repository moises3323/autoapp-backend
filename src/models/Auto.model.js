const { Model } = require("sequelize");
const { preInsert } = require("../shared/helpers");

class AutoModel extends Model {}

module.exports = (sequelize, DataTypes, commonFields) => {
  AutoModel.init(
    {
      id_auto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(300),
        allowNull: false,
      },
      brand: {
        type: DataTypes.STRING(300),
        allowNull: false,
      },
      model: {
        type: DataTypes.STRING(300),
        allowNull: false,
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      imageUrl: {
        type: DataTypes.STRING(300),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(300),
        allowNull: false,
      },
      price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      ...commonFields,
    },
    {
      sequelize,
      modelName: "Auto",
      tableName: "Auto",
      timestamps: true,
    }
  );

  AutoModel.associate = (models) => {};

  AutoModel.beforeCreate(async (model) => {
    const { createdBy, updatedBy } = preInsert.creating();
    model.createdBy = createdBy;
    model.updatedBy = updatedBy;
  });

  AutoModel.beforeBulkUpdate(async ({ attributes, fields }) => {
    const { updatedBy } = preInsert.updating();
    fields.push("updatedBy");
    attributes.updatedBy = updatedBy;
  });

  AutoModel.beforeBulkCreate(async (models) => {
    const { createdBy, updatedBy } = preInsert.creating();
    models.forEach((model) => {
      model.createdBy = createdBy;
      model.updatedBy = updatedBy;
    });
  });

  return AutoModel;
};
