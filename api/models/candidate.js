'use strict';
module.exports = (sequelize, DataTypes) => {
  const Candidate = sequelize.define('Candidate', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    candidateId: {
      type: DataTypes.STRING
    },
    candidatePicture: DataTypes.STRING,
    candidateName: DataTypes.STRING,
    candidateEmail: DataTypes.STRING,
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    deletedAt: {
      type: DataTypes.DATE
    }
  }, {
    timestamps: true,
    paranoid: true
  });
  Candidate.associate = function (models) {
    // associations can be defined here
    models.Candidate.hasMany(models.votes, {
      foreignKey: 'candidateId',
      as: 'votes'
    });
  };
  return Candidate;
};