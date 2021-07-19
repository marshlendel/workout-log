const Express = require("express")
const app = Express()
require("dotenv").config()

//!Imports
const dbConnection = require("./db")
const controllers = require("./controllers")

app.use(Express.json())
 app.use("/user", controllers.userController)
// app.use("/log", controllers.logController)

dbConnection.authenticate()
    .then(() => dbConnection.sync())
    .then(() => {
        app.listen(3000, () => {
            console.log("[Server] App is listening on port 3000")
        } )
    })
    .catch((err) => {
        console.log("[Server] Server is crashed: "  + err)
    })

