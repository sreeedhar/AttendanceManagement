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

// @route    POST api/Parent/register
// @desc     Register a Parent
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
    })
], async (req, res) => {

    const {
        email,
        password,
        name,
        roll,
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
    db.Parent.findOne({
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

                    db.Parent.create({
                        email: email,
                        password: hash,
                        name: name,
                        roll: roll,
                        year: year

                    }).then(newParent => {
                        const payload = {
                            email: email,
                            name: name,
                            roll: roll,
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

// @route    POST api/parent/login
// @desc     Login a parent
// @access   Public
router.post("/login", check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(), (req, res) => {
        //check if roll exists, then check if name matches 
        db.Parent.findOne({
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
                                roll: user.roll,
                                year: user.year
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

// @route   GET api/parent/current
// @desc    Return current user
// @access  Private
router.get(
    '/current',
    passport.authenticate('parent', {
        session: false
    }),
    (req, res) => {
        res.json(req.user);
    }
);

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
router.post('/chat/:course/:year', passport.authenticate('parent', {
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


// @route   GET api/parents/courses
// @desc    Get courses of that batch
// @access  Private
router.get('/courses', passport.authenticate('parent', {
    session: false
}), (req, res) => {
    db.Student.findOne({
        where: {
            roll: req.user.roll
        }
    }
    )
        .then(student => {
            db.Course.findAll({
                where: {
                    year: req.user.year,
                    dept: student.dept
                }
            })
                .then(courses => res.json(courses))
                .catch(err =>
                    res.status(404).json({
                        nopostfound: 'No post found with that ID'
                    })
                );
        })

});

// @route   GET api/parent/courses/:course
// @desc    Get course by year and course name
// @access  Public
router.get('/courses/:course', passport.authenticate('parent', {
    session: false
}), (req, res) => {
    db.Course.findAll({
        where: {
            year: req.user.year,
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

// @route   GET api/faculty/attendance/:year/:roll
// @desc    Get attendance of a parent
// @access  Private
router.get('/attendance/:course', passport.authenticate('parent', {
    session: false
}), (req, res) => {


    db.Attendance.findAll({
        where: {
            roll: req.user.roll,
            year: req.user.year,
            course: req.params.course
        }
    })
        .then(records => {
            res.json(records);
        })
        .catch(err => console.log(err.message));
});


// @route   GET api/faculty/attendance/:year/:roll
// @desc    Get attendance of a student
// @access  Private
router.get('/attendance', passport.authenticate('parent', {
    session: false
}), (req, res) => {

    db.Attendance.findAll({
        where: {
            roll: req.user.roll,
            year: req.user.year,
        }
    })
        .then(records => {
            let total = records.length;
            let present = 0;
            records.map(record => {
                if (record.status === "Present") present++;
            })
            let avg = present / total * 100
            res.json({
                present: present,
                avg: avg
            })
        })
        .catch(err => console.log(err.message));
});


// @route   GET api/faculty/attendance/:year/:roll
// @desc    Get attendance of a parent
// @access  Private
router.get('/attendance/:course', passport.authenticate('parent', {
    session: false
}), (req, res) => {

    db.Attendance.findAll({
        where: {
            roll: req.user.roll,
            year: req.user.year,
            course: req.params.course
        }
    })
        .then(records => {
            res.json(records);
        })
        .catch(err => console.log(err.message));
});

// @route   GET api/faculty/attendance/:year/:roll
// @desc    Get attendance of a parent
// @access  Private
router.get('/percent/:course', passport.authenticate('parent', {
    session: false
}), (req, res) => {

    db.Attendance.findAll({
        where: {
            roll: req.user.roll,
            year: req.user.year,
            course: req.params.course
        }
    })
        .then(records => {
            let present = 0;
            let total = 0;
            records.map(record => {
                total++;
                if (record.status === "Present") present++;
            })

            res.send({
                Present: present,
                Absent: total - present,
                Percent: present / total * 100
            })
        })
        .catch(err => console.log(err.message));
});



module.exports = router;