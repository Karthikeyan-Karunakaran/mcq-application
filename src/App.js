import React, { useState } from "react";
import "./App.css";

const questions = [
  {
    question: "Which is true about Starter Workflows ? (Select three.)",
    answer: ["They allow users to leverage ready-to-use (or requiring minimal changes) workflow templates", "Your organization can create custom starter workflows for users in your organization", "GitHub provides and maintains starter workflows for different categories, languages and tooling "],
    options: ["Starter workflows cannot call reusable workflows", "Starter workflows are a paid GitHub feature", "Your organization can create custom starter workflows for users in your organization", "Starter workflows are provided ready-to-use and cannot be modified or enhanced", "They allow users to leverage ready-to-use (or requiring minimal changes) workflow templates", "GitHub provides and maintains starter workflows for different categories, languages and tooling"],
    multiple: true,
  },
  {
    question: "Which of the following are programming languages?",
    answer: ["JavaScript", "Python", "Rust"],
    options: ["HTML", "JavaScript", "CSS", "Python", "Rust"],
    multiple: true,
  },
];

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState(
    questions.map((q) => (q.multiple ? [] : null))
  );
  const [submitted, setSubmitted] = useState(false);

  const handleOptionClick = (option) => {
    const updatedSelections = [...selectedOptions];

    if (questions[currentQuestion].multiple) {
      const selected = updatedSelections[currentQuestion] || [];
      if (selected.includes(option)) {
        updatedSelections[currentQuestion] = selected.filter((o) => o !== option);
      } else {
        updatedSelections[currentQuestion] = [...selected, option];
      }
    } else {
      updatedSelections[currentQuestion] = option;
    }

    setSelectedOptions(updatedSelections);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const getOptionClass = (option) => {
    const q = questions[currentQuestion];
    const selected = q.multiple
      ? selectedOptions[currentQuestion]?.includes(option)
      : selectedOptions[currentQuestion] === option;
    const correct = q.answer.includes(option);

    if (!submitted) return selected ? "option selected" : "option";
    if (selected && correct) return "option correct";
    if (selected && !correct) return "option incorrect";
    if (!selected && correct) return "option correct";
    return "option";
  };

  return (
    <div className="container">
      <h1 className="header">Github MCQ</h1>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{
            width: `${(selectedOptions.filter((opt) => opt && opt.length !== 0).length / questions.length) * 100}%`,
          }}
        />
      </div>

      <div className="question-nav">
        {questions.map((q, i) => (
          <button
            key={i}
            onClick={() => setCurrentQuestion(i)}
            className={`question-button ${
              i === currentQuestion
                ? "active"
                : selectedOptions[i] && selectedOptions[i].length !== 0
                ? "answered"
                : ""
            }`}
          >
            Q{i + 1}
          </button>
        ))}
      </div>

      <div className="card">
        <p className="text-lg font-bold mb-4">
          {questions[currentQuestion].question}
        </p>

        {questions[currentQuestion].options.map((option, index) => (
          <div
            key={index}
            onClick={() => handleOptionClick(option)}
            className={getOptionClass(option)}
          >
            <strong>{String.fromCharCode(65 + index)}.</strong> {option}
          </div>
        ))}

        <div className="flex justify-between mt-4">
          <button
            className="button prev"
            onClick={() => setCurrentQuestion((prev) => prev - 1)}
            disabled={currentQuestion === 0}
          >
            ← Previous
          </button>

          {currentQuestion < questions.length - 1 ? (
            <button
              className="button next"
              onClick={() => setCurrentQuestion((prev) => prev + 1)}
            >
              Next →
            </button>
          ) : !submitted ? (
            <button className="button submit" onClick={handleSubmit}>
              Submit
            </button>
          ) : (
            <span className="text-green-700 font-semibold">Submitted</span>
          )}
        </div>
      </div>
      {submitted && (
        <div className="result">
          <h2 className="text-xl font-bold mb-2">Final Result</h2>
          <p>Total Questions: {questions.length}</p>
          <p>
            Attempted:{" "}
            {
              selectedOptions.filter((ans) =>
                Array.isArray(ans) ? ans.length > 0 : ans !== null
              ).length
            }
          </p>
          <p>
            Correct Answers:{" "}
            {
              questions.filter((q, i) => {
                const selected = selectedOptions[i];
                if (q.multiple) {
                  return (
                    Array.isArray(selected) &&
                    selected.length === q.answer.length &&
                    selected.every((opt) => q.answer.includes(opt))
                  );
                } else {
                  return selected === q.answer[0];
                }
              }).length
            }
          </p>
          <p className="font-bold text-green-700 mt-2">
            Score:{" "}
            {
              (() => {
                const correctCount = questions.filter((q, i) => {
                  const selected = selectedOptions[i];
                  if (q.multiple) {
                    return (
                      Array.isArray(selected) &&
                      selected.length === q.answer.length &&
                      selected.every((opt) => q.answer.includes(opt))
                    );
                  } else {
                    return selected === q.answer[0];
                  }
                }).length;
                const percentage = ((correctCount / questions.length) * 100).toFixed(2);
                return `${correctCount} / ${questions.length} (${percentage}%)`;
              })()
            }
          </p>
        </div>
      )}
    </div>
  );
}