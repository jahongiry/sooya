import React, { useEffect, useState } from "react";
import { Table, message, Popconfirm, Button, Modal, Form, Input } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"; // Ant Design'dan kullanacağımız ikonlar
import axios from "axios";
import "./User.css";

function User() {
  const [users, setUsers] = useState([]);
  const [form] = Form.useForm();
  const [id, setId] = useState(null);

  let API = "https://languageapp-production.up.railway.app/api/v1/users";
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
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (userId) => {
    axios
      .delete(API + "/" + userId, { headers })
      .then((res) => {
        if (res.status === 204) {
          message.success("User o'chirildi!");
          setUsers(users.filter((user) => user.id !== userId));
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
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const onFinish = (values) => {
    let body = {
      user: {
        ...values,
      },
    };

    axios
      .patch(`${API}/${id}`, body, { headers })
      .then((res) => {
        if (res.status === 200) {
          handleCancel()
        }
      })
      .catch((err) => message.warning(err?.response?.data?.email[0]));
  };

  const columns = [
    {
      title: "id",
      dataIndex: "id",
    },
    {
      title: "name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "surname",
      dataIndex: "surname",
      key: "surname",
    },
    {
      title: "email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "teacher",
      dataIndex: "teacher",
      key: "teacher",
      render: (_, item) => {
        return item?.teacher || "topilmadi";
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
              title="Ushbu userni o'chirmoqchimisiz?"
              onConfirm={() => handleDelete(item.id)}
            >
              <DeleteOutlined style={{ color: "crimson" }} />
            </Popconfirm>

            {/* edit confirm */}
            <EditOutlined
              onClick={() => {
                setOpen(true);
                setId(item.id);
                form.setFieldValue("name", item.name);
                form.setFieldValue("surname", item.surname);
                form.setFieldValue("email", item.email);
                // form.setFieldValue("surname", item.surname);
              }}
              style={{ color: "green" }}
            />
            <Modal
              title=""
              open={open}
              onOk={handleOk}
              confirmLoading={confirmLoading}
              onCancel={handleCancel}
            >
              <Form
                form={form}
                onFinish={(v) => onFinish(v)}
                layout="vertical"
                autoComplete="off"
              >
                <h3 style={{ textAlign: "center", marginBottom: "30px" }}>
                  Update student
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
                  label="Surname"
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

                <Form.Item label="Password" name="password" id="4">
                  <Input.Password autoComplete="off" />
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
            </Modal>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <Table
        pagination={false}
        size="smoll"
        bordered={true}
        dataSource={users}
        rowKey="id"
        columns={columns}
      />
    </div>
  );
}

export default User;
