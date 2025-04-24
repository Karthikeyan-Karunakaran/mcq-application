import React, { useState } from "react";
import "./App.css";

const questions = [
  {
    question: "Which keyword allows you to define environment variables in a GitHub Actions workflow?",
    answer: ["env"],
    options: ["vars", "env", "config", "secrets"],
    multiple: false,
  },
  {
    question: "Which configuration is appropriate for triggering a workflow to run on webhook events related to check_run actions?",
    answer: [`on:
                check_run:
                  types: [rerequested, completed]`
            ],
    options: [`on:
                check_run:
                  types: [started]`, 
              `on:
                check_run:
                  types: [rerequested, completed]`,
              `on:
                check_run:
                  filter: [requested]`,
              `on:
                check_run:
                  type: [closed]`],
    multiple: false,
  },
  {
    question: `When will job3 run?
                  jobs:
                    job1:
                    job2:
                      needs: job1
                    job3:
                      if: \${{ always() }}
                        needs: [job1, job2]`,
    answer: ["job3 will run after job1 and job2 have completed, regardless of whether they were successful"],
    options: ["You cannot use if: ${{ always() }} and needs together. The workflow will fail on startup.", "job3 will run after both job1 and job2 have failed", "job3 will run after job1 and job2 have completed, regardless of whether they were successful", "job3 will run after job1 and job2 have been successfully completed"],
    multiple: false,
  },
  {
    question: "What is the default shell used by GitHub Actions on Windows runners?",
    answer: ["powershell"],
    options: ["sh", "bash","cmd", "powershell"],
    multiple: false,
  },
  {
    question: "Where can you find network connectivity logs for a GitHub self-hosted-runner?",
    answer: ["In the _diag folder directly on the runner machine"],
    options: ["On GitHub.com on that specific Runner's page", "In the job run logs of a job that ran on that Runner", "In the _diag folder directly on the runner machine", "In the job run logs of a job that ran on that Runner with debug logging enabled"],
    multiple: false,
  },
  {
    question: "Is this statement true? Not all steps run actions, but all actions run as a step",
    answer: ["True"],
    options: ["True", "False"],
    multiple: false,
  },
  {
    question: "Which is true about environments?",
    answer: ["Each job in a workflow can reference a single environment."],
    options: ["Each job in a workflow can reference a maximum of two environments.", "Each job in a workflow can reference a single environment.", "Each workflow can reference a maximum of two environments.", "Each workflow can reference a single environment."],
    multiple: false,
  },
  {
    question: "How can organizations which are using GitHub Enterprise Server enable automatic syncing of third party GitHub Actions hosted on GitHub.com to their GitHub Enterprise Server instance?",
    answer: ["Using GitHub Connect"],
    options: ["Using GitHub Connect", "GitHub Enterprise Server cannot use GitHub.com Actions because of it's on-premise nature and no internet access", "GitHub Enterprise Server has access to all GitHub.com Actions by default", "Using actions-sync tool"],
    multiple: false,
  },
  {
    question: "What are activity types of an event used for ?",
    answer: ["Limiting workflow runs to specific activity types using the types filter"],
    options: ["Reacting to new activity on a repository (e.g new contributor)", "Checking if the activity comes from an user or a bot", "Limiting workflow runs to specific activity types using the types filter"],
    multiple: false
  },
  {
    question: "What are activity types of an event used for ?",
    answer: ["Limiting workflow runs to specific activity types using the types filter"],
    options: ["Reacting to new activity on a repository (e.g new contributor)", "Checking if the activity comes from an user or a bot", "Limiting workflow runs to specific activity types using the types filter"],
    multiple: false
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
      <h1 className="header">Github MCQ DEV</h1>

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
            data-testid={`option-${index}`}
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
