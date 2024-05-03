import Image from 'next/image';
import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import loginImage from '/public/imgs/login.png'
import Form from '@/components/Forms/Form';
import FormInput from '@/components/Forms/FormInput';
import SelectInput from '@/components/Forms/SelectInput';
import Link from 'next/link';
import { getBaseUrl } from '../../Config/envConfig';
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/navigation';


const baseUrl = getBaseUrl()

const Signup = () => {
    const router = useRouter();
    const onSubmit = async (data) => {

        try {
            const res = await fetch(`${baseUrl}/user/create-user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })

            const result = await res.json();

            if (result.success === true) {
                toast.success(result.message, {
                    position: "top-right"
                })
                setTimeout(() => {
                    router.push("/login");
                }, 2000);
            }

        } catch (err) {
            console.log(err)
        }

    }

    const selectOptions = [
        { value: "EXAMINER", label: "EXAMINER" },
        { value: "CANDIDATE", label: "CANDIDATE" },
    ];
    return (
        <>

            <Container>
                <Row>
                    <Col>
                        <Image src={loginImage} alt='image' />
                    </Col>
                    <Col>
                        <h1 className='text-center mt-4'> Please Create Account</h1>
                        <div >
                            <Form submithandler={onSubmit}>
                                <div className='mt-4'>
                                    <SelectInput options={selectOptions} name='role' label='Select Role' placeholder='Please select your role' />
                                </div>
                                <div className='mt-4'>
                                    <FormInput type='text' name='email' label='Your Email' placeholder='Enter your email' />
                                </div>
                                <div className='mt-4'>
                                    <FormInput type='password' name='password' label='Your Password' placeholder='Enter your password' />
                                </div>
                                <Button type='submit' variant="primary" className='w-full mt-8'>Submit</Button>
                            </Form>
                        </div>
                        <p className="mt-4">
                            Register User? Please <Link href={"/login"}>Sign In</Link>{" "}
                        </p>
                    </Col>

                </Row>
                <ToastContainer />
            </Container>
        </>
    );
};

export default Signup;