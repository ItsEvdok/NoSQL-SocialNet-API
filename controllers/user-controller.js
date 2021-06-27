const { User, Thought } = require("../models");

const userController = {
    // GET all users
    getAllUsers(req, res) {
        User.find({}).then((dbUserData) => {
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // GET single user by ID
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        .populate({
            path: ( "thoughts","friends" ),
            select: "-__v"
        })
        .select("-__v")
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json({ message: "No User found with this id!" });
                return;
            }
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // POST new user
    createUser({body}, res){
        User.create(body)
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => res.status(400).json(err));
    },

    // UPDATE user by id
    updateUser({params, body}, res) {
        User.findOneAndUpdate({_id: params.id}, body, { new:true })
        .then((dbUserData) => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No User found with this id!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

    // DELETE user
    deleteUser({params}, res){
        User.fineOneAndDelete({ _id:params.id })
        .then((dbUserData) => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No User found with this id!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },
};

module.exports = userController;