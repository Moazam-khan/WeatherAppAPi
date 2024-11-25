import React from "react";

import { Layout } from "antd";

const { Content } = Layout;

interface Props {
  children: React.ReactNode;
}

const AppLayout = ({ children }: Props) => {
  return (
    <Layout style={{ backgroundColor: "#181819" }}>
<h1>Header</h1>
      <Content style={{}}>{children}</Content>
      <h1>Footer</h1>
    </Layout>
  );
};

export default AppLayout;
