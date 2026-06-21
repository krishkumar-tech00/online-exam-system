import { useState } from "react";

function App() {
  const [examStarted, setExamStarted] = useState(false);
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [score, setScore] = useState(null);

  const submitExam = () => {
    let totalScore = 0;

    if (answer1 === "Hyper Text Markup Language") {
      totalScore++;
    }

    if (answer2 === "Cascading Style Sheets") {
      totalScore++;
    }

    setScore(totalScore);
  };

  if (score !== null) {
    return (
      <div>
        <h1>Exam Result</h1>
        <h2>Your Score: {score} / 2</h2>

        <button
          onClick={() => {
            setScore(null);
            setExamStarted(false);
            setAnswer1("");
            setAnswer2("");
          }}
        >
          Restart Exam
        </button>
      </div>
    );
  }

  if (examStarted) {
    return (
      <div>
        <h1>Online Exam</h1>

        <h3>Q1. HTML ka full form kya hai?</h3>

        <input
          type="radio"
          name="q1"
          value="Hyper Text Markup Language"
          onChange={(e) => setAnswer1(e.target.value)}
        />
        Hyper Text Markup Language
        <br />

        <input
          type="radio"
          name="q1"
          value="High Transfer Machine Language"
          onChange={(e) => setAnswer1(e.target.value)}
        />
        High Transfer Machine Language

        <br />
        <br />

        <h3>Q2. CSS ka full form kya hai?</h3>

        <input
          type="radio"
          name="q2"
          value="Cascading Style Sheets"
          onChange={(e) => setAnswer2(e.target.value)}
        />
        Cascading Style Sheets
        <br />

        <input
          type="radio"
          name="q2"
          value="Computer Style Sheets"
          onChange={(e) => setAnswer2(e.target.value)}
        />
        Computer Style Sheets

        <br />
        <br />

        <button onClick={submitExam}>
          Submit Exam
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1>Student Dashboard</h1>

      <button onClick={() => setExamStarted(true)}>
        Start Exam
      </button>
    </div>
  );
}

export default App;