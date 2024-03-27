import React, { useState } from "react";
import { Button, Form, Input, Checkbox, message } from "antd";
import axios from "axios";

function CreateLesson() {
  const [comleted, setChecked] = useState(false);
  const [file, setFile] = useState(null);
  const [lessonID, setLessonID] = useState(null);

  let API = "https://languageapp-production.up.railway.app/api/v1/lessons";
  let token =
    "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxMX0.1xVte9sqIKeUirdW2uuyKPze6K78VvdqrsagGq_BeUQ";
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const onFinish = (values) => {
    const formData = new FormData();
    formData.append("media_item[media_file]", file);
    let body = {
      lesson: {
        ...values,
        comleted,
      },
    };

    axios
      .post(API, body, { headers })
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          setLessonID(res.data.id);
          message.success("Lesson successfully created");
        }
      })
      .catch((err) => message.warning(err?.response?.data?.email[0]));

    // let mediaAPI = "http://localhost:3000/api/v1/lessons/1/media_items";

    let body_url = {
      mode: "raw",
      raw: {
        media_item: {
          media_type: "link",
          media_link: values.iframe_url,
        },
      },
    };

    axios
      .post(`${API}/${lessonID}/media_items`, body_url, { headers })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <div className="createUser">
      <Form onFinish={onFinish} layout="vertical" autoComplete="off">
        <h3 style={{ textAlign: "center", marginBottom: "30px" }}>
          Create lesson
        </h3>
        <Form.Item
          label="Index"
          name="index"
          rules={[
            {
              required: true,
              message: "Please, enter lesson index!",
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
              message: "Please, enter lesson title!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Please, enter lesson description!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Score"
          name="score"
          rules={[
            {
              required: true,
              message: "Please, enter lesson score!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Checkbox onChange={(e) => setChecked(e.target.checked)}>
            Completed
          </Checkbox>
        </Form.Item>

        <hr />
        <Form.Item label="address video" name="iframe_url">
          <Input />
        </Form.Item>

        <Form.Item label="address video" name="photo_url">
          <Input
            type="file"
            multiple
            onChange={(e) => setFile(e.target.files[0])}
          />
        </Form.Item>

        {/* btn */}
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

export default CreateLesson;
