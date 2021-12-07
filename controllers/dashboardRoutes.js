const router = require('express').Router();
const { Course, Score, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
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
