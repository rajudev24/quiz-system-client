import React, { useState } from "react";

const Question = ({
  questionData,
  rightAnswer,
  setRightAnswer,
  wrongAnswer,
  setWrongAnswer,
}) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (option) => {
    let newSelectedOptions;

    if (questionData.questionType === "SINGLE") {
      newSelectedOptions = option;
    } else {
      const isSelected = selectedOption
        ? selectedOption.includes(option)
        : false;
      if (isSelected) {
        newSelectedOptions = selectedOption.filter(
          (selected) => selected !== option
        );
      } else {
        newSelectedOptions = selectedOption
          ? [...selectedOption, option]
          : [option];
      }
    }
    setSelectedOption(newSelectedOptions);

    const correctAnswers = Object.values(questionData.corretAnswers);
    const isCorrect = correctAnswers.every((answer) =>
      newSelectedOptions.includes(answer)
    );

    if (isCorrect || correctAnswers.length === newSelectedOptions.length) {
      setRightAnswer(rightAnswer + 1);
    } else {
      setWrongAnswer(wrongAnswer + 1);
    }
  };

  return (
    <div>
      <h4 className="mt-8">{questionData.question}</h4>

      <ul>
        {Object.keys(questionData.options).map((optionKey) => (
          <li key={optionKey} className="py-2 ">
            <label>
              <input
                type={
                  questionData.questionType === "SINGLE" ? "radio" : "checkbox"
                }
                name="options"
                value={questionData.options[optionKey]}
                checked={
                  questionData.questionType === "SINGLE"
                    ? selectedOption === questionData.options[optionKey]
                    : selectedOption.includes(questionData.options[optionKey])
                }
                onChange={() =>
                  handleOptionChange(questionData.options[optionKey])
                }
                className="me-2"
              />
              {questionData.options[optionKey]}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Question;
