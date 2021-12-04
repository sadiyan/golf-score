const { Score } = require('../models')


const scoredata = [
    {
        "date": "12/04/2021",
        "hole": 1,
        "total": 100,
        "user_id": 1,
        "course_id": 1
    },
    {
        "date": "12/04/2021",
        "hole": 2,
        "total": 100,
        "user_id": 1,
        "course_id": 1
    },
    {
        "date": "12/04/2021",
        "hole": 1,
        "total": 100,
        "user_id": 1,
        "course_id": 1
    }
]

const seedScores = () => Score.bulkCreate(scoredata)

module.exports = seedScores;