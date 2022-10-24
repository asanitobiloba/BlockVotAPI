const express = require('express');
const router = express.Router();

//user routes
router.use('/user', require('./user'));

//admin routes
router.use('/admin', require('./admin'));

//candidate routes
router.use('/candidate', require('./candidate'));

module.exports = router;
