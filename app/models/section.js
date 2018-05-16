module.exports = (sequelize, DataTypes) => {
  const Section = sequelize.define('Section', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    ProjectID: DataTypes.INTEGER,
  });

  Section.associate = (models) => {
    Section.belongsTo(models.Project);
  }

  return Section;
};
