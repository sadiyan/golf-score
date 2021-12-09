const User = require('./User')
const Score = require('./Score')
const Review = require('./review')
const Course = require('./Course')

User.hasMany(Score, {
   foreignKey: 'user_id'
})

Score.belongsTo(User ,  {
   foreignKey: 'user_id'
})

User.hasMany(Course, {
   foreignKey: 'user_id'
})

Course.belongsTo(User,  {
   foreignKey: 'user_id'
})

Course.hasMany(Score, {
   foreignKey: 'course_id',
   onDelete: 'CASCADE'
})

Score.belongsTo(Course ,  {
   foreignKey: 'course_id'
})

User.hasMany(Review, {
   foreignKey: 'user_id'
})

Review.belongsTo(User, {
   foreignKey: 'user_id'
})

Course.hasMany(Review, {
   foreignKey: 'course_id'
})

Review.belongsTo(Course, {
   foreignKey: 'course_id'
})




module.exports = { User, Score, Review, Course};
