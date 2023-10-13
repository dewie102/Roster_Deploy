const express = require("express");
const router = express.Router();
const { rosterDB } = require("../db");
const { validateFields } = require("../middleware");

/*
- READ
    GET /api/studtents/id/:userId
    get one student with userId
*/
router.get("/id/:userId", (req, res) => {
    const { userId } = req.params;

    let student = rosterDB.getOneStudent(userId);
    res.send(student);
});

/*
- READ
    GET /api/students
    GET /api/students?name&location
    get all students, or get all students that match name and/or location
*/
router.get("/", (req, res) => {
    const { name, location } = req.query;

    result = rosterDB.getStudents({ name, location });
    res.send(result);
});

/* 
- CREATE
    POST /api/students
    {name, location}
*/
router.post("/", async (req, res) => {
    // req.body is undefined by default we had to add
    // app.use(express.json()) to turn it into a json body
    // we put it at the top at the app level but we could have specified a path or put it as a post parameter
    const { name, location } = req.body;

    if (!name || !location) {
        return res
            .status(400)
            .json({ error: "name and location are required" });
    }

    /* rosterDB.push(newStudent); */
    const newStudent = await rosterDB.addStudent({ name, location });
    res.send(newStudent);
});

/*
- UPDATE
    PUT /api/students/<id>
    {name?, location?}
*/
router.put("/:id", async (req, res) => {
    const { name, location } = req.body;
    const { id } = req.params;

    if (!name && !location) {
        return res.status(400).json({
            error: "Need to provide name or location to be replaced",
        });
    }

    let student = await rosterDB.updateStudent(id, { name, location });

    if (!student) {
        return res
            .status(404)
            .json({ error: `Student with ID: ${id} not found` });
    }

    res.send(student);
});

/*  
- DELETE
    DELETE /api/students/<id>
*/
router.delete("/:id", (req, res) => {
    const { id } = req.params;

    let succeeded = rosterDB.deleteStudent(id);

    if (succeeded) {
        return res.send("OK");
    } else {
        return res
            .status(404)
            .json({ error: `Student with ID: ${id} not found` });
    }
});

module.exports = router;
