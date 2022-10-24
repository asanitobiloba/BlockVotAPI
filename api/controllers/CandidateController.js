var models = require('../models');
const Candidate = models.Candidate
const votes = models.votes
const User = models.User
const isEmpty = require('../util/validation/isEmpty')

exports.PostCandidate = (req, res) => {


    const newCandidate = {
        CandidateName: req.body.CandidateName,
        CandidateEmail: req.body.CandidateEmail,
        // CandidatePicture: req.body.CandidatePicture

    }
    Candidate.create(newCandidate)
        .then(Candidate => res.json(Candidate))
        .catch(err => console.log(err));
}

exports.RetrieveAllCandidate = (req, res) => {
    Candidate.findAll({

    })
        .then(Candidate => res.json(Candidate))
        .catch(err =>
            res.status(404).json({
                nocandiddatefound: 'No candiddate found'
            })
        );
}

exports.RetrieveCandidateByName = (req, res) => {
    Candidate.findOne({
        where: {
            CandidateName: req.params.CandidateName
        }
    }).then(Candidate => {
        if (Candidate) { res.json(Candidate) }
        else {
            res.status(404).json({ noCandidatefound: 'No Candidate found with that Name' })
        }
    }
    )
        .catch(err => res.status(404).json({
            noCandidatefound: 'No Candidate found'
        }));
}

exports.RetrieveCandidateByID = (req, res) => {
    Candidate.findOne({
        where: {
            id: req.params.id
        },

    })
        .then(Candidate => res.json(Candidate))
        .catch(err =>
            res.status(404).json({
                noCandidatefound: 'No Candidate found'
            })
        );
};
exports.SoftdelCandidate = (req, res) => {
    Candidate.findOne({
        where: {
            id: req.params.id,
        },
    }).then(Candidate => {
        if (Candidate !== null) {
            Candidate.destroy().then(() => {
                res.json({
                    success: true
                })
            }).catch((err) => {
                res.status(404).json({
                    error: 'something went wrong'
                })
            })

        } else {
            res.status(404).json({
                noCandidatefound: 'Candidate not found'
            })
        }
    })
}
exports.VoteCandidate = (req, res) => {
    User.findOne({ where: { id: req.user.id } }).then(user => {
        votes.findOne({ where: { userId: req.user.id } }).then(vote => {
            if (isEmpty(vote) !== true) {
                vote.destroy().then(() => {
                    res.json({
                        err: "unvote successful"
                    })
                })
                    .catch(err => {
                        res.json({
                            err: "Something went wrong"
                        })
                    });
            }
            else {
                votes.create({
                    candidateId: req.params.id,
                    userId: user.id

                })
                    .then(video => res.json({
                        err: "vote successful"
                    }))
                    .catch(err => {
                        res.json({
                            err: "Something went wrong"
                        })
                    });
            }
        })

    })

}

exports.getVotetsforCandidate = (req, res) => {

    votes.findAll({ where: { candidateId: req.params.id } }).then(votes => { res.json(votes) }).catch(err => {
        res.json({
            err: "Something went wrong"
        })
    });


}
exports.getVotes = (req, res) => {

    votes.findAll().then(votes => { res.json(votes) }).catch(err => {
        res.json({
            err: "Something went wrong"
        })
    });


}