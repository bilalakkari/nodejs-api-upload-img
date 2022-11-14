const Users = require('../models/user');
const mongodb = require('mongodb')

exports.getUsers = async (req, res) => {
    const users = await Users.find();
    res.json(users);
};

exports.getUsersId = async (req, res) => {
    const id = req?.params?.id;
    const query = { _id: new mongodb.ObjectId(id) };

    const product = await Users.findOne(query)
    if (product) {
        res.send(product)
    } else {
        res.send(`Failed to find the product ID :${id}`)
    }
};

exports.addUser = async (req, res) => {
    try {
        const { username, email, pwd } = req.body;
        const userProfile = 'http://localhost:3000/images/' + req.file.filename; // Note: set path dynamically
        const user = new Users({
            username,
            email,
            pwd,
            userProfile,
        });
        const createUser = await user.save();
        res.json({
            user: {
                ...createUser._doc,
            },
        });
        console.log(req.body)
    } catch (error) {
        console.log(error.message)
    }
};