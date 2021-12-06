const router = require('express').Router();
const { Course, Score, Review, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
   try {
      const newCourse = await Course.findAll({
         include: [{
            model: Review,
         }]
      })
      const courses = newCourse.map((course) => course.get({ plain: true }));
      res.render('homepage', {courses})
   }

   catch (err) {
      res.status(400).json(err);
   }
});

router.get('/dashboard', async (req, res) => {
   try {
      const newCourse = await Course.findAll({
         include: [{
            model: Score,
         }]
      })
      const courses = newCourse.map((course) => course.get({ plain: true }));
      res.render('dashboard', {courses})
   }

   catch (err) {
      res.status(400).json(err);
   }
});

router.get('/board', (req, res) => {
   try {
      res.render('myboard')
   }
   catch (err) {
      res.status(400).json(err);
   }
 });

router.get('/login', (req, res) => {
   // If the user is already logged in, redirect the request to another route
   if (req.session.logged_in) {
     res.redirect('/dashboard');
     return;
   }
 
   res.render('login');
 });

module.exports = router