// Imports
const router = require('express').Router();
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

// Use routes for endpoints shown below
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;