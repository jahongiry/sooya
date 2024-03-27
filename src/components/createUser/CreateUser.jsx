import React from "react";
import "./CreateUser.css";
import { Tabs, Button, Form, Input, message } from "antd";
import axios from "axios";
import Layout from "../layout/Layout";
import User from "../users/User";

function CreateUser() {
  const [form] = Form.useForm();
  let API = "https://languageapp-production.up.railway.app/api/v1/users";
  let token =
    "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyMX0.Nw-3TZA3gafpDw2sAxR9Niur4FYa4bg48L6GynfmUfc";
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const onFinish = (values) => {
    let body = {
      user: {
        ...values,
      },
    };

    axios
      .post(API, body, { headers })
      .then((res) => {
        if (res.status === 201) {
          console.log(res);
          message.success("Student successfully created");
          form.resetFields("");
        }
      })
      .catch((err) => message.warning(err?.response?.data?.email[0]));
  };
  return (
    <Layout>
      <Tabs>
        <Tabs.TabPane defaultActiveKey="0" tab="Studens" key={0}>
          <User />
        </Tabs.TabPane>

        <Tabs.TabPane defaultActiveKey="1" tab="Create" key={1}>
          <div className="createUser">
            <Form onFinish={onFinish} layout="vertical" autoComplete="off">
              <h3 style={{ textAlign: "center", marginBottom: "30px" }}>
                Create student
              </h3>
              <Form.Item
                label="Name"
                name="name"
                id="1"
                rules={[
                  {
                    required: true,
                    message: "Please input your name!",
                  },
                ]}
              >
                <Input autoComplete="off" />
              </Form.Item>

              <Form.Item
                label="urname"
                name="surname"
                id="2"
                rules={[
                  {
                    required: true,
                    message: "Please input your surname",
                  },
                ]}
              >
                <Input autoComplete="off" />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                id="3"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                ]}
              >
                <Input autoComplete="off" />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                id="4"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password autoComplete="off" />
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 17,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
}

export default CreateUser;
