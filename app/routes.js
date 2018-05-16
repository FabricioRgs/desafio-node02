const express = require('express');

const routes = express.Router();

const authMiddleware = require('./middlewares/auth');

const authController = require('./controllers/authController');
const dashboardController = require('./controllers/dashboardController');
const projectController = require('./controllers/projectController');
const sectionController = require('./controllers/sectionController');

routes.use((req, res, next) => {
  res.locals.flashSuccess = req.flash('success');
  res.locals.flashError = req.flash('error');
  next();
});

/**
 * Auth
 */
routes.get('/', authController.signin);
routes.get('/signup', authController.signup);

routes.post('/register', authController.register);
routes.post('/authenticate', authController.authenticate);

/**
 * Dashboard
 */
routes.use('/app', authMiddleware);
routes.get('/app/dashboard', dashboardController.index);
routes.post('/app/dashboard/create', dashboardController.create);

/**
 * Project
 */
routes.get('/app/project/:id', projectController.show);

/**
 * Section
 */
routes.get('/app/section/:id', sectionController.show);

routes.use((err, req, res, next) => {
  res.status(err.status || 500);

  return res.render('errors/index', {
    message: err.message,
    error: process.env.NODE_ENV === 'production' ? {} : err,
  });
});

module.exports = routes;
