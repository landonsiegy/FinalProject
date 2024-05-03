var express = require("express");
var cors = require("cors");
var app = express();
var fs = require("fs");
const mongoose = require('mongoose')
var bodyParser = require("body-parser");

const port = "8081";
const host = "localhost";

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/secoms319')

const questionInfo = new mongoose.Schema({
    id: Number,
    text: String,
    text2: String,
    answer: Boolean,
    imageUrls: [String]
});

const QuestionModel = mongoose.model("questions", questionInfo)

app.get("/getQuestions", async (req, res) => {
    try {
        const questions = await QuestionModel.find({});
        res.json(questions);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.get("/:id", async (req, res) => {
    try {
        const fetchid = req.params.id;
        const question = await QuestionModel.findOne({ id: fetchid });
        if (!question) {
            res.status(404).json({ message: "Question not found" });
        } else {
            res.status(200).json(question);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.post("/addQuestion", async (req, res) => {
    try {
        const { id, text, text2, answer, imageUrls } = req.body;

        const newQuestion = {
            id,
            text,
            text2,
            answer,
            imageUrls
        };

        const question = new QuestionModel(newQuestion);

        await question.save();

        res.status(201).json({ message: "Question added successfully" });
    } catch (error) {
        console.error("Error adding question:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.put("/updateQuestion/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { modimageURL1, modimageURL2 } = req.body;

        let question = await QuestionModel.findOne({ id });

        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }

        question.imageUrls.set(0, modimageURL1 || question.imageUrls[0]);
        question.imageUrls.set(1, modimageURL2 || question.imageUrls[1]);

        await question.save();

        res.status(200).json({ message: "Image URLs updated successfully", question });
    } catch (error) {
        console.error("Error updating image URLs:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.delete("/deleteQuestion/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const deletedQuestion = await QuestionModel.findOneAndDelete({ id });

        if (!deletedQuestion) {
            return res.status(404).json({ message: "Question not found" });
        }

        res.status(200).json({ message: "Question deleted successfully", deletedQuestion });
    } catch (error) {
        console.error("Error deleting question:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.listen(port, () => {
    console.log("App listening at http://%s:%s", host, port);
});  
