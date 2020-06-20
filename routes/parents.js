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
        roll
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

                    }).then(newParent => {
                        const payload = {
                            email: email,
                            name: name,
                            roll: roll,
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


module.exports = router;