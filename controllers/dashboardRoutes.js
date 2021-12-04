const router = require('express').Router();
const { Course, Score, User } = require('../models');
const withAuth = require('../utils/auth');

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
