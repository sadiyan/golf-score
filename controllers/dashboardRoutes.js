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
            model: Score
         }]
      })



      // const newCourse = await Course.findAll({
      //    include: [{
      //       model: Score,
      //    }]
      // })
      // const courses = newCourse.map((course) => course.get({ plain: true }));
      // const userData = await User.findByPk(req.session.user_id, {
      //    attributes: { exclude: ['password'] },
      //    include: [{ model: Course, Score }],
      // })

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

router.get('/add', withAuth, (req, res) => {
   res.render('add-dashboard', {
      logged_in: true
   })
})


module.exports = router
