import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [examStarted, setExamStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);
  const [selected, setSelected] = useState(null);

  const questions = [
    {
      question: "React is a ___ ?",
      options: ["Library", "Framework", "Language", "Database"],
      answer: "Library"
    },
    {
      question: "HTML stands for?",
      options: [
        "Hyper Text Markup Language",
        "High Text Machine Language",
        "Hyper Transfer Markup Language",
        "None"
      ],
      answer: "Hyper Text Markup Language"
    },
    {
      question: "CSS is used for?",
      options: ["Styling", "Logic", "Database", "Server"],
      answer: "Styling"
    }
  ];

  useEffect(() => {
    if (!examStarted || showResult) return;

    if (timeLeft === 0) {
      handleAnswer("");
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, examStarted, showResult]);

  const handleAnswer = (option) => {
    setSelected(option);

    if (option === questions[currentQ].answer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      const next = currentQ + 1;

      if (next < questions.length) {
        setCurrentQ(next);
        setTimeLeft(20);
        setSelected(null);
      } else {
        setShowResult(true);
      }
    }, 500);
  };

  const restartExam = () => {
    setCurrentQ(0);
    setScore(0);
    setShowResult(false);
    setExamStarted(false);
    setTimeLeft(20);
    setSelected(null);
  };

  // LOGIN
  if (!loggedIn) {
    return (
      <div className="container">
        <div className="card">
          <h1>Online Exam System</h1>

          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />

          <button onClick={() => setLoggedIn(true)}>
            Login
          </button>
        </div>
      </div>
    );
  }

  // RESULT
  if (showResult) {
    const percent = (score / questions.length) * 100;

    return (
      <div className="dashboard">
        <h1>Result</h1>

        <div className="card">
          <h2>Score: {score} / {questions.length}</h2>
          <h3>Percentage: {percent}%</h3>

          <h3>
            {percent >= 50 ? "🎉 Pass" : "❌ Fail"}
          </h3>

          <button onClick={restartExam}>
            Restart Exam
          </button>
        </div>
      </div>
    );
  }

  // DASHBOARD
  if (!examStarted) {
    return (
      <div className="dashboard">
        <h1>Student Dashboard</h1>

        <div className="card">
          <h2>Available Exams</h2>

          <button onClick={() => setExamStarted(true)}>
            Start Exam
          </button>
        </div>
      </div>
    );
  }

  // EXAM
  const q = questions[currentQ];

  return (
    <div className="dashboard">
      <h1>Online Exam</h1>

      <div className="progress">
        Question {currentQ + 1} / {questions.length}
      </div>

      <h3>Time Left: {timeLeft}s ⏱</h3>

      <div className="card">
        <h3>{q.question}</h3>

        {q.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(opt)}
            style={{
              background:
                selected === opt ? "green" : "blue"
            }}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;