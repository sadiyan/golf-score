const { Course } = require('../models')

const coursedata = [
    {
        "name": "Stone mountain",
        "par": 72,
        "user_id": 2,
        "course_id": 1
    },
    {
        "name": "Mystery",
        "par": 72,
        "user_id": 2,
        "course_id": 1
    }
];

const seedCourses = () => Course.bulkCreate(coursedata)

module.exports = seedCourses;