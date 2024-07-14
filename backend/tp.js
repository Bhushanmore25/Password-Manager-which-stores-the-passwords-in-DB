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
}).then(() => {
  console.log("Database connected");
}).catch((e) => {
  console.log(e);
});

const Managerschema = new mongoose.Schema({
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
  try {
    let passwords = await Password.find({});
    res.json(passwords);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

app.post("/", async (req, res) => {
  try {
    let { site, name, password } = req.body;
    let newPassword = new Password({ site, name, password });
    await newPassword.save();
    res.status(201).send("Password saved");
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

app.delete("/", async (req, res) => {
  try {
    let { id } = req.body;
    await Password.deleteOne({ _id: id });
    res.status(200).send("Password deleted");
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
