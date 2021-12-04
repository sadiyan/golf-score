const { Review } = require('../models')


const reviewdata = [
    {
        "comment": "It is good",
        "rating": 5,
        "user_id": 1,
        "course_id": 1
    },
    {
        "comment": "It is bad",
        "rating": 5,
        "user_id": 1,
        "course_id": 2
    }
]

const seedReviews = () => Review.bulkCreate(reviewdata)
.catch(err => console.log(err))

module.exports = seedReviews;