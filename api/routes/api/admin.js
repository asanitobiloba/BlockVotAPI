const express = require('express');
const router = express.Router();
const AdminController = require('../../controllers/AdminController');
const passport = require('passport');



// @route   Post api/admin/register
// @desc    Register user
// @access  Public
router.post('/register',
    AdminController.AdminRegister)

// @route   GET api/admin/login
// @desc    Login Admin / Returning jwtAdmin Token
// @access  Public
router.post('/login', AdminController.AdminLogin)

// @route   GET api/admin/password
// @desc    change password
// @access  Public
router.put('/password', AdminController.ChangePassword)

// @route   Post api/admin/register
// @desc    Returns current Admin
// @access  Private
router.get('/current',
    passport.authenticate('admin', {
        session: false
    })
    , AdminController.ReturnAdmin)

// @route   Post api/admin/all
// @desc    Returns all Admin
// @access  Public
router.get('/all',
    AdminController.AllAdmin)


// @route   Post api/delete/:id
// @desc    Returns all Admin
// @access  Private
router.delete('/delete/:id',
    AdminController.SoftDelAdmin)


// @route   Get api/admin/undo/delete/:id'
// @desc    Undo admin delete
// @access  Private
router.get('/undo/delete/:id',
    AdminController.UndoSoftdel)



// @route   Get api/admin/retrieve/:id'
// @desc    Returns Admin by id
// @access  Private
router.get('/retrieve/:id',
    AdminController.RetrieveAdminById)


module.exports = router;