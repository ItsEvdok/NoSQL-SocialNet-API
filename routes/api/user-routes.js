const router = require("express").Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
} = require("../../controllers/user-controller");

// /api/users/:userId/friends/:friendId
// POST to add a new friend
// DELETE to remove a friend

module.exports = router;