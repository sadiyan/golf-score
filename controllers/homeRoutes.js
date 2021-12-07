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
      console.log(courses)
      res.render('homepage', { courses })
   }

   catch (err) {
      res.status(400).json(err);
   }
});

router.get('/addreview', (req, res) => {
   try {
      res.render('addcoursereview')
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

router.post('/addreview', async (req, res) => {
   try {

     const courseData = await Course.create({
      name: req.body.coursename,
      par: req.body.coursepar,
      user_id: req.session.userId,
    });

    const course = courseData.get({ plain: true })

    const reviewData = await Review.create({
      comment: req.body.coursereview,
      rating: req.body.courserating,
      course_id: course.id,
      user_id: req.session.userId,
    });

    const review = reviewData.get({ plain: true })

       res.status(200).json({course, review});
     } catch (err) {
     console.log(err);
     res.status(500).json(err);
   }
});

router.get('/dashboard', withAuth, async (req, res) => {
   try {
      const newCourse = await Course.findAll({
         include: [{
            model: Score,
         }]
      })
      const courses = newCourse.map((course) => course.get({ plain: true }));
      const userData = await User.findByPk(req.session.user_id, {
         attributes: { exclude: ['password'] },
         include: [{ model: Course, Score }],
      })

      const user = userData.get({ plain: true });

      res.render('dashboard', {
         ...user,
         logged_in: true,
         courses }
      )}
   catch (err) {
      res.status(400).json(err);
   }
});

module.exports = router