const router = require('express').Router();
const { Course, Score, Review, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
   try {
      const newCourse = await Course.findAll({
         include: [{
            model: Review
         },
         {
            model: User,
            attributes: ['username']
         }]
      })

      const courses = newCourse.map((course) => course.get({ plain: true }));

      res.render('homepage', { 
         courses,          
         logged_in: true
      })
   }

   catch (err) {
      res.status(400).json(err);
   }
});

router.get('/addreview', (req, res) => {
   try {
      res.render('addcoursereview', {
         logged_in: true
      })
   }

   catch (err) {
      res.status(400).json(err);
   }
});


router.get('/board', withAuth, (req, res) => {
   try {
      res.render('myboard', {
         logged_in: true
      })
   }
   catch (err) {
      res.status(400).json(err);
   }
 });

router.get('/login', (req, res) => {
   // If the user is already logged in, redirect the request to another route
   if (req.session.logged_in) {
     res.redirect('/dashboard', {
      logged_in: true
     });
     return;
   }
 
   res.render('login');
 });

router.post('/addreview', async (req, res) => {
   try {
      var checkcourse = await Course.findOne({
         where: {
            name: req.body.coursename
         }
      })

      if (checkcourse) {
         var courseData = checkcourse
      } else {
         var courseData = await Course.create({
            name: req.body.coursename,
            par: req.body.coursepar,
            userId: req.session.user_id,
         });

   }

    const course = courseData.get({ plain: true })

    const reviewData = await Review.create({
      comment: req.body.coursereview,
      rating: req.body.courserating,
      courseId: course.id,
      userId: req.session.user_id,
    });

    const review = reviewData.get({ plain: true })

       res.status(200).json({course, review});
     } catch (err) {
     console.log(err);
     res.status(500).json(err);
   }
});


module.exports = router