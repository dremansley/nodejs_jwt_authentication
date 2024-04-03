
const express = require('express');
const bcrypt = require("bcrypt");
const {sign} = require("jsonwebtoken");
const User = require("../../models/User");

const accountRoutes = express();

accountRoutes.post('/login',  (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(async(user) => {

        if (!user) {
            return res.status(401).send({
                success: false,
                message: "No User Found"
            })
        }

        const passwordCheck = await bcrypt.compare(req.body.password, user.passwordHash);

        if (!passwordCheck) {
            return res.status(401).send({
                success: false,
                message: "Incorrect password"
            })
        }

        const jwtPayload = {
            username: user.username,
            id: user.userUUID
        }

        const jwtToken = sign(jwtPayload, process.env.JWT_SECRET_KEY, { expiresIn: "1d" })

        return res.status(200).send({
            message: "Successful login",
            token: "Bearer " + jwtToken,
            success: true
        })
    })
})

accountRoutes.post('/password-reset', (req, res) => {
    // TODO: Send a password reset email
    res.status(201).json({"message": "You have been sent an email with instructions on how to reset your password"});
});

accountRoutes.post('/register', async (req, res) => {
    try {

        const email  = req.body.email;
        const firstName = req.body.firstName
        const lastName = req.body.lastName

        const passwordHash = await bcrypt.hash(req.body.password, 10);

        const newUser = await User.create({email:email, firstname:firstName, lastname:lastName, passwordHash:passwordHash} );

        res.status(201).json(newUser);

    } catch (e) {
        console.log(`An error occurred: ${e}`)
        res.status(400).json({"message": "Invalid user form data"});
    }
});

module.exports = accountRoutes;
