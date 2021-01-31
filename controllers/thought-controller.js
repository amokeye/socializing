const { User, Thought } = require('../models');


const allThoughtInfo = {
    getAllThoughts(req, res) {
        Thought.find({}).then(thoughts => {
            res.json(thoughts);
        }).catch(error => {
            console.log(error);
            res.status(400).json(error);
        });
    },
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.thoughtId }).then(singleThought => {
            if (!singleThought) {
                return res.status(404).json({ message: 'Id does not match any thoughts in database; no thought found.' });
            }
            return res.json(singleThought);
        }).catch(error => {
            res.json(error);
        });
    },
    addThought({ body }, res) {
        Thought.create(body).then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: body.userId },
                { $push: { thoughts: _id } },
                { new: true }
            );
        }).then(userData => {
            if (!userData) {
                return res.status(404).json({ message: 'User not found.' });
            }
            res.json(userData)
        }).catch(error => {
            res.json(error);
        });
    },
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true }
        ).then(thoughtRxn => {
            if (!thoughtRxn) {
                return res.status(400).json({ message: 'Id does not match any thoughts in database; no thought found.' });
            }
            res.json(thoughtRxn);
        }).catch(error => {
            res.json(error);
        });
    },
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtId }, body, { new: true }).then(thoughtUpdate => {
            if (!thoughtUpdate) {
                return res.status(404).json({ message: 'Id does not match any thoughts in database; no thought found.' });
            }
            res.json(thoughtUpdate);
        }).catch(err => res.json(err));
    },
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
            .then(thoughtToDelete => {
                if (!thoughtToDelete) {
                    return res.status(404).json({ message: 'Id does not match any thoughts in database; no thought found.' });
                }
                res.json(thoughtToDelete);
            }).catch(err => {
                res.json(err)
            });
    },
    deleteReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: body.reactionId } } },
            { new: true }
        ).then(thoughtData => {
            res.json(thoughtData);
        }).catch(err => {
            res.json(err);
        });
    }
}

module.exports = allThoughtInfo;