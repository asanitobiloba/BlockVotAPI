'use strict';
module.exports = (sequelize, DataTypes) => {
  const votes = sequelize.define('votes', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    userId: DataTypes.UUID
  }, {});
  votes.associate = function (models) {
    // associations can be defined here
    models.votes.belongsTo(models.Candidate, {
      foreignKey: 'candidateId',
    });
  };
  return votes;
};