// Import
const { User } = require('../models');

const allUserInfo = {

    getAllUsers(req, res) {
        User.find({}).select('-__v').then(allUsers => {
            res.json(allUsers);
        }).catch(error => {
                console.log(error);
                res.status(500).json(error);
            });
    },

    getUserById({ params }, res) {
        User.findOne({ _id: params.id }).select('-__v').populate('thoughts').populate('friends').then(singleUser => {
                if (!singleUser) {
                    res.status(404).json({ message: 'Invalid id; no user found.' });
                    return;
                }
                res.json(singleUser);
            }).catch(error => {
                console.log(error);
                res.status(400).json(error);
            });
    },

    createUser({ body }, res) {
        User.create(body).then(createSingleUser => {
            res.json(createSingleUser);
        }).catch(error => {
            res.status(400).json(error);
        });
    },

    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true }).then(userUpdate => {
                if (!userUpdate) {
                    res.status(404).json({ message: 'Invalid id; no user found.' });
                    return;
                }
                res.json(userUpdate);
            }).catch(err => {
                res.status(400).json(err);
            });
    },

    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id }).then(userToDelete => {
                if (!userToDelete) {
                    res.status(404).json({ message: 'Invalid id; no user found.' });
                    return;
                }
                res.json({ message: 'User successfully deleted!'});
            }).catch(error => {
                res.status(400).json(error);
            });
    },

    addaFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: params.friendId} },
            { new: true }).then(friendToAdd => {
                if (!friendToAdd) {
                    res.status(404).json({ message: 'Invalid id; no user found.' });
                    return;
                }
                res.json(friendToAdd);
            }).catch(error => {
                console.log(error);
                res.status(400).json(error);
            });
    },

    removeaFriend({ params }, res){
        User.findByIdAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId} },
            { new: true }).then(deleteFriend => {
                if (!deleteFriend) {
                    res.status(404).json({ message: 'Invalid id; no user found.' });
                    return;
                }
                res.json(deleteFriend);
            }).catch(error => {
                console.log(error);
                res.status(400).json(error);
            });
        }
}

module.exports = allUserInfo;