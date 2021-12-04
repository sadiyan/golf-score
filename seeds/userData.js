const { User } = require('../models')


const userdata = [
    {
        "username": "Bora",
        "email": "bbora1119@gmail.com",
        "password": "borabora"
    },
    {
        "username": "Baylor",
        "email": "Baylor@gmail.com",
        "password": "Baylor123"
    },
    {
        "username": "Ian",
        "email": "Ian@gmail.com",
        "password": "Ian12345"
    }
]
const seedUsers = () => User.bulkCreate(userdata)

module.exports = seedUsers;