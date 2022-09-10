const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require("dotenv").config()
const dbURL = process.env.MONGO_URL
const User = require("./models/user.model")
const PORT = 5000
const bcrypt = require('bcrypt');
const saltRounds = 10;


mongoose.connect(dbURL)
    .then(() => {
        console.log("Mongodb is connected")
    })
    .catch((error) => {
        console.log(error);
        process.exit(1)
    })

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.post("/register", async (req, res) => {
    try {
        bcrypt.hash(req.body.password, saltRounds, async function (err, hash) {

            const email = req.body.email
            const newUser = new User({ email, password: hash })
            await newUser.save()
            res.status(201).json(newUser)
        });

    }
    catch (error) {
        res.status(403).json({ error })
    }
})

app.post("/login", async (req, res) => {
    try {
        const email = req.body.email;
        const userExist = await User.findOne({ email: email })

        if (userExist) {
            bcrypt.compare(req.body.password, userExist.password, function (err, result) {
                if (result) {
                    res.status(201).json({ message: "Logged in" })
                }
                else {
                    res.status(401).json({ message: "User not found" })
                }
            });
        }

    }
    catch (error) {
        res.status(403).json({ error })
    }
})


app.use((req, res, next) => {
    res.status(404).json({
        message: "route not found"
    })
})
app.use((err, req, res, next) => {
    res.status(500).json({
        message: "something broke"
    })
})

app.listen(PORT || process.env.port, () => {
    console.log(`server is running at ${PORT}`)
})