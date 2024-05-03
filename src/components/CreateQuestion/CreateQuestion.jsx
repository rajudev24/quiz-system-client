import React from "react";
import Form from "../Forms/Form";
import { Button, Col, Container, Row } from "react-bootstrap";
import FormInput from "../Forms/FormInput";
import SelectInput from "../Forms/SelectInput";
import { getUserInfo } from "@/services/auth.service";
import { getBaseUrl } from "../../Config/envConfig";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";

const baseUrl = getBaseUrl();
const CreateQuestion = () => {
  const loggedInUser = getUserInfo();
  const router = useRouter();

  const onSubmit = async (data) => {
    const formattedData = {
      question: data.question,
      questionType: data.questionType,
      options: {
        option_1: data.option_1,
        option_2: data.option_2,
        option_3: data.option_3,
        option_4: data.option_4,
      },
      corretAnswers: {
        answer_1: data.answer_1,
        answer_2: data.answer_2 ? data.answer_2 : null,
      },
      marks: Number(data.marks),
      exmainerId: loggedInUser.id,
    };

    try {
      const res = await fetch(`${baseUrl}/question/create-question`, {
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
          router.push("/create-exam");
        }, 2000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const selectOptions = [
    { value: "SINGLE", label: "SINGLE" },
    { value: "MULTIPLE", label: "MULTIPLE" },
  ];
  return (
    <Container>
      <h1>Please Create Question</h1>
      <Form submithandler={onSubmit}>
        <Row>
          <Col>
            <div className="mt-4">
              <SelectInput
                options={selectOptions}
                name="questionType"
                label="Select question choice type"
                placeholder="Please select choice"
                require={true}
              />
            </div>
          </Col>
          <Col>
            <div className="mt-4">
              <FormInput
                type="text"
                name="question"
                label="Please write the question"
                placeholder="Write the question"
                required={true}
              />
            </div>
          </Col>
          <Col>
            <div className="mt-4">
              <FormInput
                type="text"
                name="option_1"
                label="Write First Option"
                placeholder="Write first option"
                required={true}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="mt-4">
              <FormInput
                type="text"
                name="option_2"
                label="Write Seccond Option"
                placeholder="Write seccond option"
                required={true}
              />
            </div>
          </Col>
          <Col>
            <div className="mt-4">
              <FormInput
                type="text"
                name="option_3"
                label="Write Third Option"
                placeholder="Write third option"
              />
            </div>
          </Col>
          <Col>
            <div className="mt-4">
              <FormInput
                type="text"
                name="option_4"
                label="Write Fourth Option"
                placeholder="Write fourth option"
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="mt-4">
              <FormInput
                type="text"
                name="answer_1"
                label="Write Corret Answer"
                placeholder="Write corret answers"
                required={true}
              />
            </div>
          </Col>
          <Col>
            <div className="mt-4">
              <FormInput
                type="text"
                name="answer_2"
                label="Write Corret Answer (if applicable)"
                placeholder="Write corret answers"
              />
            </div>
          </Col>
          <Col>
            <div className="mt-4">
              <FormInput
                type="text"
                name="marks"
                label="Write the Mark"
                placeholder="Write the mark"
                required={true}
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

export default CreateQuestion;
