// Import
const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addaFriend,
    removeaFriend
} = require('../../controllers/user-controller');

router.route('/')
    .get(getAllUsers)
    .post(createUser);

router.route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

router.route('/:userId/friends/:friendId')
    .post(addaFriend)
    .delete(removeaFriend);


module.exports = router;