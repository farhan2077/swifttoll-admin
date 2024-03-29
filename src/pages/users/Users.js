import React, { useEffect, useState } from "react";
import { Space, Table, Button, message, Tooltip } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

import pageStyle from "../pages.module.css";
import { getUsers, deleteUser } from "../../client/users.client";
import AddUserModal from "./AddUserModal";
import EditUserModal from "./EditUserModal";

const copyIdSuccessful = () => {
  message.success("Id has been copied to the clipboard", 2);
};

export default function Users() {
  const [usersData, setUsersData] = useState([]);
  const [addUserModalOpen, setAddUserModalOpen] = useState(false);
  const [editUserModalOpen, setEditUserModalOpen] = useState(false);
  const [selectedUser, setSelecteduser] = useState(null);

  function fetchUsers() {
    getUsers()
      .then((res) => res.json())
      .then(({ data }) => {
        setUsersData(data);
      });
  }

  function onCreateAddUserModal() {
    fetchUsers();
    setAddUserModalOpen(false);
  }

  function onCreateEditUserModal(record) {
    fetchUsers();
    setEditUserModalOpen(false);
    setSelecteduser(record);
  }

  function handleDelete(userId) {
    deleteUser(userId)
      .then((res) => res.json())
      .then(({ success, message: msg }) => {
        if (success) {
          message.success(msg);
        } else {
          message.error(msg);
        }
      })
      .then(() => fetchUsers());
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      fixed: "left",
      ellipsis: true,
      width: "50px",
      render: (id) => (
        <Tooltip title="Click to copy id">
          <span
            onClick={() => {
              navigator.clipboard.writeText(id).then(copyIdSuccessful());
            }}
          >
            {id}
          </span>
        </Tooltip>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ellipsis: true,
      width: "60px",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      ellipsis: true,
      responsive: ["lg"],
      width: "45px",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      ellipsis: true,
      responsive: ["lg"],
      width: "60px",
    },
    {
      title: "Vehicle Type",
      dataIndex: "vehicleType",
      key: "vehicleType",
      ellipsis: true,
      width: "50px",
    },
    {
      title: "Vehicle Id",
      dataIndex: "vehicleId",
      key: "vehicleId",
      ellipsis: true,
      width: "60px",
      render: (vehicleId) => (
        <span
          onClick={() => {
            navigator.clipboard.writeText(vehicleId);
          }}
        >
          {vehicleId}
        </span>
      ),
    },
    {
      title: "Toll Rate (BDT)",
      dataIndex: "tollRate",
      key: "tollRate",
      ellipsis: true,
      width: "130px",
    },
    {
      title: "Action",
      key: "action",
      width: "110px",
      fixed: "right",
      render: (_, record) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              onCreateEditUserModal(record);
              setEditUserModalOpen(true);
            }}
          >
            Edit
          </Button>
          <Button
            icon={<DeleteOutlined />}
            type="primary"
            danger
            onClick={() => {
              handleDelete(record.id);
            }}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        className={pageStyle.buttonBottomSpace}
        onClick={() => {
          setAddUserModalOpen(true);
        }}
      >
        Add new user
      </Button>

      <AddUserModal
        open={addUserModalOpen}
        onCreate={onCreateAddUserModal}
        onCancel={() => {
          setAddUserModalOpen(false);
        }}
      />

      <EditUserModal
        open={editUserModalOpen}
        onCreate={onCreateEditUserModal}
        currentUser={selectedUser}
        onCancel={() => {
          setEditUserModalOpen(false);
        }}
      />
      <Table
        style={{
          marginBottom: "1.5rem",
        }}
        rowKey={(record) => record.id}
        columns={columns}
        dataSource={usersData}
        bordered
        pagination={{
          position: ["bottomCenter"],
          defaultCurrent: 1,
        }}
        scroll={{
          x: 1200,
        }}
      />
    </div>
  );
}
