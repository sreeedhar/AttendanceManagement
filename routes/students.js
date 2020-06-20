const express = require("express");
const router = express.Router();
const {
    check,
    validationResult
} = require("express-validator");
const bcrypt = require('bcryptjs');
const db = require("../models");
const jwt = require("jsonwebtoken");
const passport = require('passport');
const keys = {
    secretOrKey: "secret"
}

// @route    POST api/student/register
// @desc     Register a student
// @access   Public
router.post("/register", [
    check("name", "Name is required")
        .not()
        .isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
        "password",
        "Please enter a password"
    ).isLength({
        min: 1
    }),
    check(
        "roll",
        "Please enter roll"
    ).isLength({
        min: 1
    }),
    check(
        "dept",
        "Please enter department"
    ).isLength({
        min: 1
    }),
    check(
        "year",
        "Please enter year"
    ).isLength({
        min: 1
    })
], async (req, res) => {

    const {
        email,
        password,
        name,
        roll,
        dept,
        year
    } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        return res.status(400).json({
            errors: errors.array()
        });
    }

    //check if email already exists. if it does, do not register
    db.Student.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if (user) {
            return res.status(400).json({
                errors: [{
                    msg: "User already exists"
                }]
            });
        } else {
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, (err, hash) => {
                    if (err) throw err;

                    db.Student.create({
                        email: email,
                        password: hash,
                        name: name,
                        roll: roll,
                        dept: dept,
                        year: year

                    }).then(newStudent => {
                        const payload = {
                            email: email,
                            name: name,
                            roll: roll,
                            dept: dept,
                            year: year
                        }

                        jwt.sign(
                            payload,
                            keys.secretOrKey, {
                            expiresIn: 360000
                        },
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: 'Bearer ' + token
                                });
                            }
                        );

                    })
                        .catch(err => {
                            console.log(err.message);
                            res.status(500).send('Status Error');
                        })

                });
            });

        }
    })
})

// @route    POST api/student/login
// @desc     Login a student
// @access   Public
router.post("/login", check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(), (req, res) => {
        //check if roll exists, then check if name matches 
        db.Student.findOne({
            where: {
                email: req.body.email
            }
        })
            .then(user => {
                if (!user) {
                    return res.status(400).json({
                        errors: [{
                            msg: 'User does not exist'
                        }]
                    });
                } else {
                    // Check Password
                    bcrypt.compare(req.body.password, user.password).then(isMatch => {
                        if (isMatch) {
                            const payload = {
                                email: user.email,
                                name: user.name,
                                roll: user.roll
                            }

                            jwt.sign(
                                payload,
                                keys.secretOrKey, {
                                expiresIn: 360000
                            },
                                (err, token) => {
                                    res.json({
                                        success: true,
                                        token: 'Bearer ' + token
                                    });
                                }
                            );
                        } else {
                            return res.status(400).json({
                                errors: [{
                                    msg: 'Incorrect login'
                                }]
                            });
                        }
                    })
                }
            })

    })

// @route   GET api/student/current
// @desc    Return current user
// @access  Private
router.get(
    '/current',
    passport.authenticate('student', {
        session: false
    }),
    (req, res) => {
        res.json(req.user);
    }
);

// @route   GET api/students/courses
// @desc    Get courses of that batch
// @access  Private
router.get('/courses', passport.authenticate('student', {
    session: false
}), (req, res) => {
    db.Course.findAll({
        where: {
            year: req.user.year,
            dept: req.user.dept
        }
    })
        .then(courses => res.json(courses))
        .catch(err =>
            res.status(404).json({
                nopostfound: 'No post found with that ID'
            })
        );
});

// @route   GET api/student/courses/:year/:course
// @desc    Get course by year and course name
// @access  Public
router.get('/courses/:year/:course', passport.authenticate('faculty', {
    session: false
}), (req, res) => {
    db.Course.findAll({
        where: {
            year: req.params.year,
            course: req.params.course
        }
    })
        .then(courses => res.json(courses))
        .catch(err =>
            res.status(404).json({
                nopostfound: 'No post found with that ID'
            })
        );
});


module.exports = router;