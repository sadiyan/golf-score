const sequelize = require('../config/connection');
const seedUsers = require('./userData');
const seedReviews = require('./reviewData');
const seedScores = require('./scoreData');
const seedCourses = require('./courseData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUsers();

  await seedReviews();

  await seedScores();

  await seedCourses();


  process.exit(0);
};

seedAll();
