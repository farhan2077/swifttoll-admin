import React from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { Layout, Menu } from "antd";
import { DollarOutlined, UserOutlined } from "@ant-design/icons";

import styles from "./App.module.css";
// eslint-disable-next-line no-unused-vars
import fixedStyles from "./fixantdstyle.css";
import Transactions from "./pages/transactions/Transactions";
import Users from "./pages/users/Users";

const { Header, Sider, Content } = Layout;

function App() {
  const location = useLocation();
  return (
    <>
      <Layout>
        <Header>
          {/* <div className="logo" /> */}
          <p className={styles.headerText}>SwiftToll</p>
        </Header>
        <Layout>
          <Sider>
            <Menu
              className={styles.menuSpacing}
              mode="inline"
              defaultSelectedKeys={`${location.pathname.substring(1)}`}
            >
              <Menu.Item key="transactions" icon={<DollarOutlined />}>
                <Link to="/transactions">Transactions</Link>
              </Menu.Item>
              <Menu.Item key="users" icon={<UserOutlined />}>
                <Link to="/users">Users</Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Content className={styles.contentSpacing}>
            <Routes>
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/users" element={<Users />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default App;
