module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    name: DataTypes.STRING,
  });

  Project.associate = (models) => {
    Project.belongsTo(models.User);
  }

  return Project;
};
