const router = require("express").Router()
const {LogModel} = require("../models")

//! Create Log
router.post("/", async (req, res) => {
    const {description, definition, result} = req.body
    const {id} = req.user

    try {
        let log = {
            description,
            definition, 
            result, 
            owner: id
        }

        let newLog = await LogModel.create(log)
        res.status(200).json({
            log: newLog
        })
    } catch(err) {
        res.status(500).json({
            error: err
        })
    }
   
})

//! My logs
router.get("/", async (req, res) => {
    let {id} = req.user

    try {
        let allLogs = await LogModel.findAll({
            where: {
                owner: id
            }
        })
        res.status(200).json({
            logs: allLogs
        })
    }catch (err) {
        res.status(500).json({
            error: err
        })
    }
})


//! Search Logs by id
router.get("/:id", async (req, res) => {
    let {id} = req.params
    let ownerId = req.user.id
    try {
        let query = {
            where: {
                id: id,
                owner: ownerId
            }
        }
        let idLogs = await LogModel.findAll(query)
        res.status(200).json({
            searchedLog: idLogs
        })
    }catch(err) {
        res.status(500).json({
            error: err
        })
    }
})

//! Update Log
router.put("/:id", async (req, res) => {
    const {description, definition, result} = req.body
    let {id} = req.params
    let ownerId = req.user.id

    let query = {
        where: {
            id: id,
            owner: ownerId
        }
    }

    let log = {
        description: description,
        definition: definition,
        result: result
    }

    try {
        const updatedLog = await LogModel.update(log, query)
        res.status(200).json({
            message: "Successfully updated",
            upDatatedLog: updatedLog
        })
    }catch(err) {
        res.status(500).json({
            error: err
        })
    }
})

//! Delete Log
router.delete("/:id", async (req, res) => {
    let {id} = req.params
    let ownerId = req.user.id
    let query = {
        where: {
            id: id,
            owner: ownerId
        }
    }

    try {
        let deletedEntry = await LogModel.destroy(query)
        res.status(200).json({
            message: "Successfuly deleted entry",
            deletedEntry: deletedEntry
        })
    }catch(err) {
        res.status(500).json({
            error: err
        })
    }
}) 

module.exports = router