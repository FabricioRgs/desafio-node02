const { Project, User } = require('../models');

module.exports = {
  async index(req, res, next) {
    try {
      const projects = await Project.findAll({
        where: {
          UserId: req.session.user.id
        },
      });

      const user = await User.findOne({
        where: {
          id: req.session.user.id
        },
      });

      return res.render('dashboard/index', { projects, user });
    } catch (err) {
      return next(err);
    }
  },

  async create(req, res, next) {
    try {
      await Project.create({ ...req.body, UserId: req.session.user.id });
      req.flash('success', 'Projeto criado com sucesso');
      res.redirect('/app/dashboard');
    } catch (err) {
      return next(err)
    }
  },
};

