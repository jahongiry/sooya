import React from "react";
import "./CreateUser.css";
import { Tabs, Button, Form, Input, Table } from "antd";
import axios from "axios";
import Layout from "../layout/Layout";
import User from "../users/User";

function CreateUser() {
  let API = "https://languageapp-production.up.railway.app/api/v1/users";
  let token =
    "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyfQ.AhAK7fKNiu6VZ9XVQt8EPumF_liGFDgDMbVnnthMqUY";
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
      .then((res) => console.log("res=>>>", res))
      .catch((err) => console.log("err=>>>>", err));
  };
  return (
    <Layout>
      <Tabs>

        <Tabs.TabPane defaultActiveKey="0" tab="Studens" key={0}>
          <User />
        </Tabs.TabPane>

        <Tabs.TabPane defaultActiveKey="1" tab="Create" key={1}>
          <div className="createUser">
            <Form onFinish={onFinish} autoComplete="off">
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password autoComplete="password" />
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
