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

module.exports = router