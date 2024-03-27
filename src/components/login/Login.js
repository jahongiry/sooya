import React from 'react';
import './style.css';
import Avatar from './img/avatar.svg';
import bg from './img/bg.svg';
import wave from './img/wave.png';
import { FaUser } from "react-icons/fa";
import { PiLockKeyFill } from "react-icons/pi";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';


const Login = () => {
    const [form] = Form.useForm();


    const onFinish = async (values) => {
        try {
            let res = await axios.post('https://languageapp-production.up.railway.app/api/v1/login', values);
            if (res) {
                message.success("Sign In is successful!");
                let token = res.data.token
                localStorage.setItem("token", token)
                window.location = "/createUser"
                form.resetFields();
            }
        } catch (error) {
            console.error(error);
            message.error("Error");
        }
    };
    return (
        <>
            <img className="wave" src={wave} />
            <div className="container">
                <div className="img-login">
                    <img src={bg} />
                </div>
                <div className="login-content">
                    <Form form={form} className="FormLogin" onFinish={onFinish}>
                        <img src={Avatar} alt="login LOGO" />
                        <h2 className="title">Welcome</h2>
                        <Form.Item name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
                            <Input className='inpLog' placeholder="Email"
                                style={{ border: 'none', borderBottom: "2px solid #cfcfcf", fontSize: "18px", height: "36px", width: '100%', boxShadow: "none" }}
                                prefix={<FaUser />} />
                        </Form.Item>

                        <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                            <Input.Password
                                placeholder="Password"
                                iconRender={visible => (visible ? <AiFillEye /> : <AiFillEyeInvisible />)}
                                style={{ border: 'none', marginTop: "15px", borderBottom: "2px solid #cfcfcf", fontSize: "18px", height: "36px", width: '100%', boxShadow: "none" }}
                                prefix={<PiLockKeyFill />}
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="btnIN">Login</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default Login
