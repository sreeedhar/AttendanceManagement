const express = require("express");
const router = express.Router();
const db = require("../models");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const {
    check,
    validationResult
} = require("express-validator");
const passport = require('passport');
const keys = {
    secretOrKey: "secret"
}

// @route    POST api/faculty/register
// @desc     Register a faculty
// @access   Public
router.post("/register",
    [
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
            "dept",
            "Please enter department"
        ).isLength({
            min: 1
        })
    ]
    , async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors);
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const {
            email,
            password,
            name,
            dept
        } = req.body;

        //check if email already exists. if it does, do not register
        db.Faculty.findOne({
            where: {
                email: req.body.email
            }
        }).then(user => {
            if (user) {
                console.log(errors);
                return res.status(400).json({
                    errors: [{
                        msg: "User already exists"
                    }]
                });
            } else {
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(password, salt, (err, hash) => {
                        if (err) throw err;

                        db.Faculty.create({
                            email: email,
                            password: hash,
                            name: name,
                            dept: dept

                        }).then(newFaculty => {
                            const payload = {
                                email: email,
                                name: name,
                                dept: dept
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

// @route    POST api/Faculty/login
// @desc     Login a Faculty
// @access   Public
router.post("/login", [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
], (req, res) => {


    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }


    const {
        email,
        password,
    } = req.body;
    //check if roll exists, then check if name matches 
    db.Faculty.findOne({
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
                bcrypt.compare(password, user.password).then(isMatch => {
                    if (isMatch) {
                        const payload = {
                            email: email,
                            name: name,
                            coursename: user.coursename
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

// @route   GET api/faculty/current
// @desc    Return current user
// @access  Private
router.get(
    '/current',
    passport.authenticate('faculty', {
        session: false
    }),
    (req, res) => {
        res.json(req.user);
    }
);

// @route   POST api/faculty/courses
// @desc    Add a course
// @access  Private
router.post('/courses', passport.authenticate('faculty', {
    session: false
}), (req, res) => {
    const {
        course,
        year
    } = req.body;

    db.Course.create({
        dept: req.user.dept,
        faculty: req.user.name,
        course,
        year
    })
        .then(course => {
            try {
                res.send(course);
            } catch (err) {
                res.status(500).send(err);
            }

        })
        .catch(err => console.error(err.message));

});

// @route   GET api/faculty/courses
// @desc    Get all courses offered by faculty
// @access  Private
router.get('/courses', passport.authenticate('faculty', {
    session: false
}), (req, res) => {
    db.Course.findAll({
        where: {
            faculty: req.user.name
        }
    })
        .then(courses => res.json(courses))
        .catch(err =>
            res.status(404).json({
                nopostfound: 'No post found with that ID'
            })
        );
});

// @route   GET api/faculty/courses/:year/:course
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