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


// 🔹 Register
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Create new user
    const newUser = new User({ name, email, password });
    await newUser.save();

    res.json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Error in /register:", err);
    res.status(500).json({ message: "Server error" });
  }
});

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
// app.get("/export-data", async (req, res) => {
//   const data = await Response.find();

//   const parser = new Parser();
//   const csv = parser.parse(data);

//   res.header("Content-Type", "text/csv");
//   res.attachment("dataset.csv");
//   res.send(csv);
// });
app.get("/export-data", async (req, res) => {
  try {
    const data = await Response.find();

    const fields = [
      { label: "User Email", value: "userEmail" },
      { label: "Response ID", value: "_id" },
      { label: "Total Score", value: "totalScore" },
      { label: "Level", value: "level" },
      { label: "Created At", value: row => new Date(row.createdAt).toLocaleString() },
      ...Array.from({ length: 20 }, (_, i) => ({
        label: `Q${i+1}`, value: row => row.answers[i] || ""
      }))
    ];

    const parser = new Parser({ fields });
    const csv = parser.parse(data);

    res.header("Content-Type", "text/csv");
    res.attachment("dataset.csv");
    res.send(csv);
  } catch (err) {
    console.error("Error exporting data:", err);
    res.status(500).json({ message: "Server error" });
  }
});



// ================== SERVER ==================
app.listen(5000, () => console.log("Server running on port 5000"));