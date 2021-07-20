const router = require("express").Router()
const {UserModel} = require("../models")
const bcrypt = require("bcryptjs")
const { UniqueConstraintError } = require("sequelize")
const jwt = require("jsonwebtoken")

//! Create User
router.post("/register", async (req, res) => {
    let {email, password} = req.body

    try {
        const newUser = await UserModel.create({
            email,
            password: bcrypt.hashSync(password, 12)
        })
        let token = jwt.sign({id: newUser.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 48})
        res.status(201).json({
            message: "User Created!",
            user: newUser,
            sessionToken: token
        })

    } catch(err) {
        if(err instanceof UniqueConstraintError) {
            res.status(409).json({
                message: "Email already in use"
            })
        }else {
            res.status(500).json({
                error: err
            })
        }
    }
})

//! Login User
router.post("/login", async (req, res) => {
    let {email, password} = req.body

    try{
        const loggedInUser = await UserModel.findOne({
            where: {
                email: email
            }
        })
        if(loggedInUser) {                                      //The password in the database for the selected user
            let passwordComparison = await bcrypt.compare(password, loggedInUser.password)
            if(passwordComparison) {
                let token = jwt.sign({id: loggedInUser.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 48})
                res.status(200).json({
                    message: "Logged In",
                    user: loggedInUser,
                    sessionToken: token
                })
            }else {
                res.status(401).json({
                    message: "incorrect email or password"
                })
            }
        }else {
            req.status(401).json({
                message: "incorrect email or password"
            })
        }  
    } catch(err) {
        res.status(500).json({
            message: "Failed to log in"
        })
    }
})

module.exports = router