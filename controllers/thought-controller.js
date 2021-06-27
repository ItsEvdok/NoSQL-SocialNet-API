const { User, Thought } = require("../models");

const thoughtController = {
    // GET all thoughts
    getAllThoughts(req, res){
        Thought.find({}).then((dbThoughtData) => {
            res.json(dbThoughtData);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // GET single thought by Id
    getThoughtById({ params }, res){
        Thought.findOne({ _id:params.id })
        .then((dbThoughtData) => {
            if(!dbThoughtData) {
                res.status(404).json({ message: "No Thought found with this id!" });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // POST new thought
    createThought({ body }, res){
        Thought.create(body)
        .then((dbThoughtData) => res.json(dbThoughtData))
        .catch((err) => res.status(400).json(err));
    },

    // PUT update thought by ID
    updateThought({ params,body }, res) {
        Thought.findOneAndUpdate({_id: params.id}, body, { new:true })
        .then((dbThoughtData) => {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'No Thought found with this id!' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    },

    // DELETE thought by ID
    deleteThought({ params }, res) {
        Thought.fineOneAndDelete({ _id:params.id })
        .then((dbThoughtData) => {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'No Thought found with this id!' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    },
};

module.exports = thoughtController;
