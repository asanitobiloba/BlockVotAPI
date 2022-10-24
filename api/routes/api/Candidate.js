const express = require('express');
const router = express.Router();
const CandidateController = require('../../controllers/CandidateController');
// const parser = require('../../util/cloudinaryImageUpload');
const passport = require('passport');



// @route   Post api/candidate/upload
// @desc    Upload Candidate
// @access  Public
router.post('/upload',
    CandidateController.PostCandidate)



// @route   Post api/candidate/retrieve
// @desc    Retrieve candidate
// @access  Public
router.get('/retrieve',
    CandidateController.RetrieveAllCandidate)

// @route   Post api/candidate/retrieve/:name
// @desc    Retrive  candidate by name
// @access  Public
router.get('/retrieve/name/:name',
    CandidateController.RetrieveCandidateByName)


// @route   Post api/candidate/retrieve/:id
// @desc    Retrive  candidate by id
// @access  Public
router.get('/retrieve/Id/:id',
    CandidateController.RetrieveCandidateByID)



// @route   Post api/candidate/delete/:id
// @desc    Soft delete candidate by id
// @access  Public
router.delete('/delete/:id',
    CandidateController.SoftdelCandidate)



// @route   Post api/candidate/vote/:id
// @desc    get vote 
// @access  Private
router.put('/vote/:id',
    passport.authenticate('user', {
        session: false
    }), CandidateController.VoteCandidate)

// @route   Post api/candidate/vote
// @desc    get vote
// @access  Public
router.get('/vote',
    CandidateController.getVotes)


// @route   Post api/candidate/vote/:id
// @desc    get vote 
// @access  Public
router.get('/vote/:id',
    CandidateController.getVotetsforCandidate)











module.exports = router;