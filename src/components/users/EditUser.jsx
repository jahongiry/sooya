import React from "react";
import "./User.css";
import { Button, Form, Input } from "antd";

function EditUser({ userInfo }) {
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

    console.log(body);

    // axios
    //   .put(API, body, { headers })
    //   .then((res) => console.log("res=>>>", res))
    //   .catch((err) => console.log("err=>>>>", err));
  };
  return (
    <div className="editUser">
      <Form onFinish={onFinish} initialValues={userInfo} autoComplete="off">
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
          <Input.Password
            autoComplete="password"
            // defaultValue={userInfo.password}
          />
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
  );
}

export default EditUser;
