import { getBaseUrl } from "@/Config/envConfig";
import React, { useEffect, useState } from "react";
import Question from "../Question/Question";
import { Button, Container } from "react-bootstrap";
import { formatTime } from "@/helpers/timer";
import { ToastContainer, toast } from "react-toastify";
import { getUserInfo } from "@/services/auth.service";

const baseUrl = getBaseUrl();

const Exam = () => {
  const loggedInUser = getUserInfo();
  const [examData, setExamData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(examData.duration);
  const [rightAnswer, setRightAnswer] = useState(0);
  const [wrongAnswer, setWrongAnswer] = useState(0);

  const fetchData = async () => {
    const res = await fetch(`${baseUrl}/exam`);
    const result = await res.json();

    setExamData(result.data[0]);
    try {
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (examData.durationType === "ExamWise") {
      const durationInSeconds = examData.duration * 60;
      setTimeRemaining(durationInSeconds);
    } else if (examData.durationType === "PerQuestion") {
      const totalDurationInSeconds = examData.duration * 60;
      const durationPerQuestionInSeconds =
        totalDurationInSeconds / examData.questions.length;
      setTimeRemaining(durationPerQuestionInSeconds);
    }
  }, [examData]);

  useEffect(() => {
    if (examData.durationType === "PerQuestion") {
      const totalDurationInSeconds = examData.duration * 60;
      const durationPerQuestionInSeconds =
        totalDurationInSeconds / examData.questions.length;
      const interval = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
        if (timeRemaining <= 0) {
          setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
          setTimeRemaining(durationPerQuestionInSeconds);
          handleNext();
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [currentQuestionIndex, timeRemaining]);

  const handleNext = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handlePrev = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  const getCurrentQuestion = () => {
    if (examData && examData.questions && examData.questions.length > 0) {
      return examData.questions[currentQuestionIndex];
    }
    return null;
  };

  useEffect(() => {
    if (examData.durationType === "ExamWise") {
      const interval = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [examData.duration]);

  const handleSubmit = async () => {
    const formattedData = {
      candidateId: loggedInUser.id,
      examId: examData.id,
      rightAnswer: rightAnswer,
      wrongAnswer: wrongAnswer,
    };
    try {
      const res = await fetch(`${baseUrl}/candidate/create-candidate-exam`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      const result = await res.json();

      if (result.success === true) {
        toast.success(result.message, {
          position: "top-right",
        });
        setTimeout(() => {
          router.push("/welcome");
        }, 2000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <h2 className="text-center">{examData.title}</h2>
      <p className="text-right">Time Remaining: {formatTime(timeRemaining)}</p>
      <div className="flex justify-center">
        {getCurrentQuestion() && (
          <Question
            questionData={getCurrentQuestion()}
            rightAnswer={rightAnswer}
            setRightAnswer={setRightAnswer}
            wrongAnswer={wrongAnswer}
            setWrongAnswer={setWrongAnswer}
          />
        )}
      </div>

      <div className=" flex justify-evenly">
        <div className="me-20">
          {currentQuestionIndex > 0 && (
            <Button onClick={handlePrev}>Previous</Button>
          )}
        </div>
        <div className="ms-50">
          {currentQuestionIndex < examData.questions?.length - 1 && (
            <Button onClick={handleNext}>Next</Button>
          )}
        </div>
      </div>
      <div className="flex justify-center mt-24">
        <Button onClick={(e) => handleSubmit()}> Submit Exam</Button>
      </div>
      <ToastContainer />
    </Container>
  );
};

export default Exam;
