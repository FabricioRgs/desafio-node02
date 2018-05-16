const { User, Project, Section } = require('../models');

module.exports = {
  async show(req, res, next) {
    try {

      const user = await User.findOne({
        where: {
          id: req.session.user.id
        },
      });

      const section = await Section.findOne({
        where: {
          id: req.params.id
        },
      });

      const project = await Project.findOne({
        where: {
          id: section.ProjectId
        },
      });

      const sections = await Section.findAll({
        where: {
          ProjectID: section.ProjectId
        }
      });

      return res.render('project/index', {
        user,
        project,
        sections,
        section,
        activeSection: req.params.id,
      });
    } catch (err) {
      return next(err);
    }
  },
}
