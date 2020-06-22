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
const { restart } = require("nodemon");
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
                            name: user.name,
                            dept: user.dept
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

// @route   GET api/faculty/courses
// @desc    Get all courses offered by faculty
// @access  Private
router.put('/archive/:course/:year', passport.authenticate('faculty', {
    session: false
}), (req, res) => {
    db.Course.findOne({
        where: {
            faculty: req.user.name,
            course: req.params.course,
            year: req.params.year,
            archived: 0
        }
    })
        .then(course => {
            course.archived = 1;
            course.save();
            res.json(course);
        })
        .catch(err =>
            res.status(404).json({
                nopostfound: 'No post found with that ID'
            })
        );
});

// @route   GET api/faculty/courses
// @desc    Get all courses offered by faculty
// @access  Private
router.put('/unarchive/:course/:year', passport.authenticate('faculty', {
    session: false
}), (req, res) => {
    db.Course.findOne({
        where: {
            faculty: req.user.name,
            course: req.params.course,
            year: req.params.year,
            archived: 1
        }
    })
        .then(course => {
            course.archived = 0;
            course.save();
            res.json(course);
        })
        .catch(err =>
            res.status(404).json({
                nopostfound: 'No post found with that ID'
            })
        );
});

// @route   GET api/faculty/courses/:year/:course
// @desc    Get course by year and course name
// @access  Private
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

// @route   GET api/faculty/students
// @desc    Get students of a year
// @access  Private
router.get('/students/:year', passport.authenticate('faculty', {
    session: false
}), (req, res) => {
    db.Student.findAll({
        where: {
            year: req.params.year,
            dept: req.user.dept
        }
    })
        .then(students => res.json(students))
        .catch(err =>
            res.status(404).json({
                nopostfound: 'No post found with that ID'
            })
        );
});

// @route   POST api/faculty/attendance/:year/:roll
// @desc    Mark attendance
// @access  Private
router.post('/attendance/:year/:roll/:course', passport.authenticate('faculty', {
    session: false
}), (req, res) => {
    db.Student.findOne({
        where: {
            roll: req.params.roll
        }
    })
        .then(student => {
            const {
                date,
                status
            } = req.body;

            db.Course.findOne({
                where: {
                    faculty: req.user.name,
                    year: req.params.year,
                    dept: req.user.dept,
                    course: req.params.course
                }
            })
                .then(course => {
                    db.Attendance.create({
                        roll: req.params.roll,
                        course: req.params.course,
                        year: req.params.year,
                        name: student.name,
                        date: date,
                        status: status
                    }).then(record => res.json(record))
                        .catch(err => console.error(err.message))


                })

        })
        .catch(err =>
            res.status(404).json({
                nopostfound: 'No post found with that ID'
            })
        );
});

// @route   GET api/faculty/attendance/:year/:roll
// @desc    Get attendance of a student
// @access  Private
router.get('/attendance/:year/:roll/:course', passport.authenticate('faculty', {
    session: false
}), (req, res) => {

    db.Attendance.findAll({
        where: {
            roll: req.params.roll,
            year: req.params.year,
            course: req.params.course
        }
    })
        .then(records => res.json(records))
        .catch(err => console.log(err.message));


});

// @route   Update api/faculty/attendance/:year/:roll
// @desc    Get attendance of a student
// @access  Private
router.put('/attendance/:year/:roll/:course/:date', passport.authenticate('faculty', {
    session: false
}), (req, res) => {
    const { status } = req.body;

    db.Course.findOne({
        where: {
            faculty: req.user.name,
            year: req.params.year,
            dept: req.user.dept,
            course: req.params.course

        }
    })
        .then(course => {
            db.Attendance.findOne({
                where: {
                    roll: req.params.roll,
                    year: req.params.year,
                    course: course.course,
                    date: req.params.date
                }
            })
                .then(record => {
                    record.status = status;
                    record.save();
                    res.json(record)
                })
                .catch(err => console.log(err.message));


        })
});

// @route   GET api/comment/:id
// @desc    Get comment
// @access  Public
router.get('/chat/:course/:year', (req, res) => {
    db.Chat.findAll({
        where: {
            course: req.params.course,
            year: req.params.year
        }
    })
        .then(comments => res.json(comments))
        .catch(err => res.status(404).json({
            error: 'No comments found'
        }))
});


// @route   GET api/comment/:id
// @desc    Get comment
// @access  Public
router.post('/chat/:course/:year', passport.authenticate('faculty', {
    session: false
}), (req, res) => {
    db.Chat.create({
        from: req.user.name,
        course: req.params.course,
        year: req.params.year,
        msg: req.body.msg
    })
        .then(chat => res.json(chat))
        .catch(err => console.error(err.message));
});


module.exports = router;