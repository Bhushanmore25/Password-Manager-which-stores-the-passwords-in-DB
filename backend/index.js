import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017", {
    dbName: 'PasswordManager'
}).then(() => { console.log("Database connected"); }).catch((e) => { console.log(e) });

const Managerschema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true // Ensure uniqueness for the ID
    },
    site: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const Password = mongoose.model("passwords", Managerschema);

app.get("/", async (req, res) => {
    let passwords = await Password.find({});
    res.json(passwords);
});

app.post("/", async (req, res) => {
    let password = req.body;

    try {
        let newPassword = new Password(password);
        await newPassword.save();
        res.status(201).json({ "Success": true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});


app.delete("/", async (req, res) => {
    let password = req.body;
    let result = await Password.deleteOne(password);
    res.json({ "success": true, "result": result });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
