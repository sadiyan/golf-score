const router = require('express').Router();
const { Course, Score, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
   try {
      const userData = await User.findByPk(req.session.user_id, {
         attributes: { exclude: ['password'] },
         include: [{
            model: Course
         }]
      }
      )

      const courseData = await Course.findAll({
         where: {
            user_id: req.session.user_id,
         },
         include: [{
            model: Score,
            attributes: ['date', 'total']
         }]
      })

      const user = userData.get({ plain: true });
      const course = courseData.map(course => course.get({ plain: true }));

      console.log(user)
      console.log(course)

      res.render('dashboard', {
         ...user,
         logged_in: true,
         user,
         course }
      )}
   catch (err) {
      res.status(400).json(err);
   }
});

router.post('/add', async (req, res) => {
   console.log(req.body)

   try {
      const courseData = await Course.create({
         name: req.body.coursename,
         par: req.body.coursepar,
         user_id: req.session.user_id,
       });
   
      const course = courseData.get({ plain: true })

       const scoreData = await Score.create({
         date: req.body.coursedate,
         total: req.body.coursescore,
         user_id: req.session.user_id,
         course_id: course.id,
       });
      
      const score = scoreData.get({ plain: true })

      res.status(200).json({course, score});
   } catch (err) {
      console.log(err);
      res.status(500).json(err);
   }
   
})

router.get('/add', withAuth, (req, res) => {
   res.render('add-dashboard', {
      logged_in: true
   })
})


module.exports = router
