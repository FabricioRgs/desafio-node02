const { Project, User, Section } = require('../models');

module.exports = {
  async show(req, res, next) {
    try {
      const user = await User.findOne({
        where: {
          id: req.session.user.id
        },
      });

      const project = await Project.findOne({
        where: {
          id: req.params.id
        },
      });

      const sections = await Section.findAll({
        where: {
          ProjectID: req.params.id
        }
      });

      return res.render('project/index', { user, project, sections });
    } catch (err) {
      return next(err);
    }
  },
}
