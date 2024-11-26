import React from "react";
import Header from "./Header";

import { Layout } from "antd";

const { Content } = Layout;

interface Props {
  children: React.ReactNode;
}

const AppLayout = ({ children }: Props) => {
  return (
    <Layout style={{width:'100%', height:'100vh',background:'linear-gradient(to right, #4c6ef5, #9b4dca, #f72585)'}}>
<Header ></Header>
      <Content style={{}}>{children}</Content>

    </Layout>
  );
};

export default AppLayout;
