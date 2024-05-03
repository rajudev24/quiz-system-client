import Image from "next/image";
import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import loginImage from "/public/imgs/login.png";
import FormInput from "@/components/Forms/FormInput";
import Form from "../Forms/Form";
import Link from "next/link";
import { getBaseUrl } from "../../Config/envConfig";
import { ToastContainer, toast } from "react-toastify";
import { storeUserInfo } from "@/services/auth.service";
import { useRouter } from "next/navigation";

const baseUrl = getBaseUrl();

const Login = () => {
  const router = useRouter();
  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${baseUrl}/user/login-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success === true) {
        toast.success(result.message, {
          position: "top-right",
        });
        storeUserInfo(result.data.accessToken);
        setTimeout(() => {
          router.push("/welcome");
        }, 2000);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Container>
        <Row>
          <Col>
            <Image src={loginImage} alt="image" />
          </Col>
          <Col>
            <h1 className="text-center mt-4"> Login your Account</h1>
            <div>
              <Form submithandler={onSubmit}>
                <div className="mt-20">
                  <FormInput
                    type="text"
                    name="email"
                    label="Your Email"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="mt-4">
                  <FormInput
                    type="password"
                    name="password"
                    label="Your Password"
                    placeholder="Enter your password"
                  />
                </div>
                <Button type="submit" variant="primary" className="w-full mt-8">
                  Submit
                </Button>
              </Form>
            </div>

            <p className="mt-4">
              New User? Please <Link href={"/signup"}>Signup</Link>{" "}
            </p>
          </Col>
        </Row>
        <ToastContainer />
      </Container>
    </>
  );
};

export default Login;
