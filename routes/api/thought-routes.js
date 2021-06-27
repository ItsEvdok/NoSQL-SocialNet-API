const router = require("express").Router();

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
} = require("../../controllers/thought-controller");

// /api/thoughts/:thoughtId/reactions
// POST to create a reaction
// DELETE to pull and remove a reaction

module.exports = router;