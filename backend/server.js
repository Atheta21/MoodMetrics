const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { Parser } = require("json2csv");


const app = express();

app.use(cors());
app.use(express.json());

// ================== DATABASE CONNECTION ==================
mongoose.connect("mongodb://127.0.0.1:27017/depressionApp")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));




// ================== RESPONSE SCHEMA ==================
const responseSchema = new mongoose.Schema({
  name: String,
  email: String,
  answers: [Number],
  totalScore: Number,
  level: String,
  createdAt: { type: Date, default: Date.now }
});
const Response = mongoose.model("Response", responseSchema);


// ================== CONTACT SCHEMA ==================
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});

const Contact = mongoose.model("Contact", contactSchema);


// ================== ROUTES ==================



// 🔹 Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });

  if (user) {
    res.json({ success: true, message: "Login successful" });
  } else {
    res.json({ success: false, message: "Invalid credentials" });
  }
});




app.post("/submit-assessment", async (req, res) => {
  const { email, answers, totalScore, level } = req.body;

  // find user name using email
  const user = await User.findOne({ email });

  const newResponse = new Response({
    name: user ? user.name : "Unknown",
    email,
    answers,
    totalScore,
    level
  });

  await newResponse.save();

  res.json({ message: "Assessment saved successfully" });
});
// 🔹 Contact
app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  const newContact = new Contact({ name, email, message });
  await newContact.save();

  res.json({ message: "Message received successfully " });
});

// 🔹 Export Dataset as CSV


app.get("/export-data", async (req, res) => {
  try {
    const data = await Response.find().lean();  // 🔥 VERY IMPORTANT (lean removes mongoose metadata)

    const formattedData = data.map(item => {
      let row = {
        Name: item.name || "Unknown",
        Email: item.email || item.userEmail || "Not Provided",
        TotalScore: item.totalScore || item.score,
        Level: item.level,
        Date: item.createdAt
      };

      // Add each question as separate column
      if (item.answers && item.answers.length > 0) {
        item.answers.forEach((ans, index) => {
          row[`Q${index + 1}`] = ans;
        });
      }

      return row;
    });

    const parser = new Parser();
    const csv = parser.parse(formattedData);

    res.header("Content-Type", "text/csv");
    res.attachment("depression_dataset.csv");
    res.send(csv);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error exporting data" });
  }
});


// ================== SERVER ==================
app.listen(5000, () => console.log("Server running on port 5000"));