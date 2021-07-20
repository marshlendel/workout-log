const jwt = require("jsonwebtoken")
const {UserModel} = require("../models")

let validateSession = async (req, res, next) => {
    if(req.method === "OPTIONS") {
        next()
    }else if(req.headers.authorization) {
        const {authorization} = req.headers
        const payload = (authorization) ? jwt.verify(authorization, process.env.JWT_SECRET): undefined

        if(payload) {
          let foundUser = await UserModel.findOne({
                where: {
                    id: payload.id
                }
            })
            if(foundUser) {
                req.user = foundUser
                next()
            }else {
                res.status(400).json({
                    message: "Not authorized"
                })
            }
        }else {
            res.status(401).json({
                message:"Invalid token"
            })
        }
    }else {
        res.status(403).json({
            message: "Forbidden"
        })
    }
}

module.exports = validateSession