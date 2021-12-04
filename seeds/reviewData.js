const { Review } = require('../models')


const reviewdata = [
    {
        "comment": "It is good",
        "created_Date": "12/04/2021",
        "rating": 5,
        "user_id": 1,
        "course_id": 1
    },
    {
        "comment": "It is bad",
        "created_Date": "12/04/2021",
        "rating": 5,
        "user_id": 1,
        "course_id": 2
    }
]

const seedReviews = () => Review.bulkCreate(reviewdata)

module.exports = seedReviews;