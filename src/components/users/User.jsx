import React, { useEffect, useState } from "react";
import { Table, message, Popconfirm, Button } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"; // Ant Design'dan kullanacağımız ikonlar
import axios from "axios";
import "./User.css";
import EditUser from "./EditUser";

function User() {
  const [users, setUsers] = useState([]);
  const [editState, setEditstate] = useState(false);

  let API = "https://languageapp-production.up.railway.app/api/v1/users";
  let token =
    "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo1fQ.qecv3n7CRc4r90vZoMheXi5QOPRUGq-Q2H8MlGbdg5k";
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

  const columns = [
    {
      title: "id",
      dataIndex: "id",
      render: (inx, item) => item + 1
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
            <Popconfirm
              title="Userni malumotlarini o'zgartirmoqchimisiz?"
              onConfirm={() => {
                setEditstate(item);
              }}
            >
              <EditOutlined style={{ color: "dodgerblue" }} />
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      {editState && <EditUser userInfo={editState} />}
      <Table pagination={false} size="smoll" bordered={true} dataSource={users} rowKey="id" columns={columns} />
    </div>
  );
}

export default User;
