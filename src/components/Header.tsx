import { Layout, Typography, Space } from 'antd';
import { CloudOutlined, FlagOutlined, EyeOutlined } from '@ant-design/icons';

const { Header } = Layout;
const { Title } = Typography;

const AppHeader = () => {
  return (
    <Header style={{ padding: 0 }}>
      <div
        style={{
          background: 'linear-gradient(to right, #4c6ef5, #9b4dca, #f72585)', // Gradient background
          padding: '20px', // Space around content
          textAlign: 'center', // Center-align the content
          borderRadius: '8px', // Add rounded corners
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', // Subtle shadow
          color: '#fff', // White text color for better contrast
        }}
      >
        <Space align="center" size="large">
          {/* Cloud Icon with Styled Text */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <CloudOutlined style={{ fontSize: '24px', marginRight: '8px', color: '#4cddf5' }} />
            <Title level={3} style={{ margin: 0, color: '#fff' }}>
              Daily Weather
            </Title>
          </div>

          {/* Flag Icon with Styled Text */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <FlagOutlined style={{ fontSize: '24px', marginRight: '8px', color: '#ffda4d' }} />
            <Title level={3} style={{ margin: 0, color: '#fff' }}>
              Global Updates
            </Title>
          </div>

          {/* Eye Icon with Styled Text */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <EyeOutlined style={{ fontSize: '24px', marginRight: '8px', color: '#ff758f' }} />
            <Title level={3} style={{ margin: 0, color: '#fff' }}>
              Air Quality
            </Title>
          </div>
        </Space>
      </div>
    </Header>
  );
};

export default AppHeader;
