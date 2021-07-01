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
        User.findOneAndDelete({ _id:params.id })
        .then((dbUserData) => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No User found with this id!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $addToSet: { friends: params.friendId } },
            { new: true, runValidators: true }
        )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this Id' });
                return;
            }
            // add userId to friendId's friend list
            User.findOneAndUpdate(
                { _id: params.friendId },
                { $addToSet: { friends: params.userId } },
                { new: true, runValidators: true }
            )
            .then(dbUserData2 => {
                if(!dbUserData2) {
                    res.status(404).json({ message: 'No user found with this Id' })
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
        })
        .catch(err => res.json(err));
    },

    // DELETE /api/users/:userId/friends/:friendId
    deleteFriend({ params }, res) {
        // remove friendId from userId's friend list
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true, runValidators: true }
        )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this Id' });
                return;
            }
            // remove userId from friendId's friend list
            User.findOneAndUpdate(
                { _id: params.friendId },
                { $pull: { friends: params.userId } },
                { new: true, runValidators: true }
            )
            .then(dbUserData2 => {
                if(!dbUserData2) {
                    res.status(404).json({ message: 'No user found with this Id' })
                    return;
                }
                res.json({message: 'Successfully removed friend'});
            })
            .catch(err => res.json(err));
        })
        .catch(err => res.json(err));
    },
};

module.exports = userController;