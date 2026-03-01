import React, { useState } from "react";
import axios from "axios";

const questions = [
  "On most days, does your mood feel more like ☀ sunshine or 🌧 cloudy skies?",
  "Do things you once enjoyed now feel 'meh'?",
  "Do you feel emotionally drained even without doing much?",
  "Do you find yourself smiling less than before?",
  "Do you feel disconnected from people around you?",
  "Has your sleep schedule become unpredictable lately?",
  "Do you wake up feeling tired even after enough sleep?",
  "Do you struggle to get out of bed some mornings?",
  "Do small tasks feel unusually exhausting?",
  "Do you feel low energy throughout the day?",
  "Do you find it hard to concentrate on work or studies?",
  "Do your thoughts feel heavier than usual?",
  "Do you overthink small situations repeatedly?",
  "Do you feel mentally slow or foggy?",
  "Do you struggle to make simple decisions?",
  "Do you feel like you're not good enough sometimes?",
  "Do you blame yourself for things beyond your control?",
  "Do you feel less confident than before?",
  "Do you feel like others are doing better than you?",
  "Do you sometimes feel hopeless about the future?"
];

const options = [
  { text: "Never", value: 0 },
  { text: "Rarely", value: 1 },
  { text: "Sometimes", value: 2 },
  { text: "Often", value: 3 },
  { text: "Almost Always", value: 4 }
];

function Questions() {
  const [answers, setAnswers] = useState(Array(20).fill(null));
  const [result, setResult] = useState(null);

  const handleSelect = (qIndex, value) => {
    const updated = [...answers];
    updated[qIndex] = value;
    setAnswers(updated);
  };

  const handleSubmit = async () => {
    if (answers.includes(null)) {
      alert("Please answer all questions before submitting.");
      return;
    }

    const totalScore = answers.reduce((sum, val) => sum + val, 0);

    let level = "";
    if (totalScore <= 15) level = "Emotionally Balanced 🌼";
    else if (totalScore <= 30) level = "Mild Mood Changes 🌤";
    else if (totalScore <= 50) level = "Moderate Emotional Distress 🌥";
    else if (totalScore <= 65) level = "High Emotional Strain 🌧";
    else level = "Severe Mood Concerns 🌩";

    // 🔥 Save to backend
    await axios.post("http://localhost:5000/submit-assessment", {
      userEmail: localStorage.getItem("userEmail"),
      answers,
      totalScore,
      level
    });

    setResult({ totalScore, level });
  };

  return (
    <div className="questions-page">
      <h2>Mood Assessment</h2>

      {questions.map((question, qIndex) => (
        <div key={qIndex} className="question-card">
          <p>{qIndex + 1}. {question}</p>

          <div className="options">
            {options.map((opt, i) => (
              <button
                key={i}
                className={
                  answers[qIndex] === opt.value
                    ? "option selected"
                    : "option"
                }
                onClick={() => handleSelect(qIndex, opt.value)}
              >
                {opt.text}
              </button>
            ))}
          </div>
        </div>
      ))}

      <button className="submit-btn" onClick={handleSubmit}>
        Submit Assessment
      </button>

      {result && (
        <div className="result-box">
          <h3>Your Score: {result.totalScore}</h3>
          <h3>{result.level}</h3>
        </div>
      )}
    </div>
  );
}

export default Questions;