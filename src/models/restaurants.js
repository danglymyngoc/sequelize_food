import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class restaurants extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    res_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    res_name: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    Image: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    description: {
      type: DataTypes.STRING(200),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'restaurants',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "res_id" },
        ]
      },
    ]
  });
  }
}
