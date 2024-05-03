import React from "react";
import Form from "../Forms/Form";
import { Button, Col, Container, Row } from "react-bootstrap";
import FormInput from "../Forms/FormInput";
import SelectInput from "../Forms/SelectInput";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import { getUserInfo } from "@/services/auth.service";
import { getBaseUrl } from "../../Config/envConfig";

const baseUrl = getBaseUrl();
const CreateExam = () => {
  const loggedInUser = getUserInfo();
  const router = useRouter();

  const onSubmit = async (data) => {
    const formattedData = {
      ...data,
      exmainerId: loggedInUser.id,
      negativeMarkValue: data.negativeMarkValue,
      numberOfQuestions: Number(data.numberOfQuestions),
      duration: Number(data.duration),
      negativeMarks: Boolean(data.negativeMarks),
    };
    try {
      const res = await fetch(`${baseUrl}/exam/create-exam`, {
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

  const selectOptions = [
    { value: true, label: "YES" },
    { value: false, label: "NO" },
  ];
  const selectDurationTypeOptions = [
    { value: "PerQuestion", label: "Per Question" },
    { value: "ExamWise", label: "Exam Wise" },
  ];
  return (
    <Container>
      <h1>Please Create Exam</h1>
      <Form submithandler={onSubmit}>
        <Row>
          <Col>
            <div className="mt-4">
              <FormInput
                type="text"
                name="title"
                label="Please write the Exam Name"
                placeholder="Write the exam name"
              />
            </div>
          </Col>
          <Col>
            <div className="mt-4">
              <SelectInput
                options={selectDurationTypeOptions}
                name="durationType"
                label="Select Exam Duration Type"
                placeholder="Please select choice"
              />
            </div>
          </Col>

          <Col>
            <div className="mt-4">
              <FormInput
                type="text"
                name="duration"
                label="Write Exam Duration (In Mintue)"
                placeholder="Write exam duration (ex: 30)"
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="mt-4">
              <SelectInput
                options={selectOptions}
                name="negativeMarks"
                label="Negative Marks Apply"
                placeholder="Please select choice"
              />
            </div>
          </Col>
          <Col>
            <div className="mt-4">
              <FormInput
                type="text"
                name="negativeMarkValue"
                label="Write Negative Mark Value (If Yes)"
                placeholder="Write negative mark Value"
              />
            </div>
          </Col>
          <Col>
            <div className="mt-4">
              <FormInput
                type="text"
                name="numberOfQuestions"
                label="Write Number of Questions "
                placeholder="Write number of questions (ex: 20)"
              />
            </div>
          </Col>
        </Row>

        <Button type="submit" variant="primary" className=" mt-8">
          Submit
        </Button>
      </Form>
      <ToastContainer />
    </Container>
  );
};

export default CreateExam;
