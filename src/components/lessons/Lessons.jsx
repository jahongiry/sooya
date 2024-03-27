import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import {
  Table,
  Checkbox,
  message,
  Popconfirm,
  Button,
  Modal,
  Form,
  Input,
  Tabs,
} from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"; // Ant Design'dan kullanacağımız ikonlar
import axios from "axios";
import CreateLesson from "../createLesson/CreateLesson";

function Lessons() {
  const [lessons, setLessons] = useState([]);
  const [comleted, setChecked] = useState(false);
  const [id, setID] = useState(null);
  const [form] = Form.useForm();

  let API = "https://languageapp-production.up.railway.app/api/v1/lessons";
  let token =
    "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxMX0.1xVte9sqIKeUirdW2uuyKPze6K78VvdqrsagGq_BeUQ";
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  useEffect(() => {
    axios
      .get(API, { headers })
      .then((res) => {
        setLessons(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // Delete lessons
  const handleDelete = (lessonId) => {
    axios
      .delete(API + "/" + lessonId, { headers })
      .then((res) => {
        console.log(res);
        if (res.status === 204) {
          message.success("Lesson deleted successfully");
          setLessons(lessons.filter((user) => user.id !== lessonId));
        }
      })
      .catch((err) => console.log(err));
  };

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 1000);
  };

  // update lesson
  const onFinish = (values) => {
    let body = {
      ...values,
      comleted,
    };

    axios
      .patch(API + "/" + id, body, { headers })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          message.success("Lesson successfully updated");
          setOpen(false);
        }
      })
      .catch((err) => message.warning(err?.response?.data?.error));
  };

  const columns = [
    {
      title: "id",
      dataIndex: "id",
      // render: (inx, item) => inx,
    },
    {
      title: "index",
      dataIndex: "index",
      // render: (inx, item) => inx,
    },
    {
      title: "title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "description",
      dataIndex: "description",
      key: "description",
      // render: (_, item) => {
      //   return item?.teacher || "topilmadi";
      // },
    },
    {
      title: "score",
      dataIndex: "score",
      key: "score",
    },
    {
      title: "user_id",
      dataIndex: "user_id",
      key: "user_id",
    },
    {
      title: "completed",
      dataIndex: "completed",
      key: "completed",
      render: (_, item) => {
        return item?.completed ? (
          <p style={{ color: "green" }}>Tugatilgan</p>
        ) : (
          <p style={{ color: "crimson" }}>Tugatilmagan</p>
        );
      },
    },
    {
      title: "Controll",
      dataIndex: "id",
      key: "teacher",
      render: (_, item) => {
        return (
          <div className="userControll">
            {/* delete confirm */}
            <Popconfirm
              title="Are you sure you want to delete this lesson ?"
              onConfirm={() => handleDelete(item.id)}
            >
              <DeleteOutlined style={{ color: "crimson" }} />
            </Popconfirm>

            {/* edit confirm */}
            <EditOutlined
              onClick={() => {
                setOpen(true);
                setID(item.id);
                form.setFieldValue("title", item?.title);
                form.setFieldValue("index", item.index);
                form.setFieldValue("description", item.description);
                form.setFieldValue("score", item.score);
              }}
              style={{ color: "green" }}
            />
            <Modal
              title=""
              open={open}
              onOk={handleOk}
              confirmLoading={confirmLoading}
              onCancel={() => setOpen(false)}
            >
              <div>
                <Form
                  onFinish={(v) => onFinish(v, item.id)}
                  form={form}
                  layout="vertical"
                  autoComplete="off"
                >
                  <h3 style={{ textAlign: "center", marginBottom: "30px" }}>
                    Update lesson
                  </h3>
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
                    <Checkbox
                      checked={comleted}
                      onChange={(e) => setChecked(e.target.checked)}
                    >
                      Completed
                    </Checkbox>
                  </Form.Item>

                  <Form.Item
                    wrapperCol={{
                      offset: 17,
                      span: 16,
                    }}
                  >
                    <Button type="primary" htmlType="submit">
                      Update
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </Modal>
          </div>
        );
      },
    },
  ];

  console.log(lessons);

  return (
    <Layout>
      <Tabs>
        <Tabs.TabPane defaultActiveKey="0" tab="Lessons" key={0}>
          <Table
            pagination={false}
            size="smoll"
            bordered={true}
            dataSource={lessons}
            rowKey="id"
            columns={columns}
          />
        </Tabs.TabPane>

        <Tabs.TabPane defaultActiveKey="1" tab="Create lesson" key={1}>
          <CreateLesson />
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
}

export default Lessons;
