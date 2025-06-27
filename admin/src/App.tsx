import { Layout } from 'antd';
import Dashboard from './pages/Dashboard';

const { Header, Content } = Layout;

export default function App() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ color: 'white', fontSize: 20 }}>Game Admin</Header>
      <Content style={{ padding: 24 }}>
        <Dashboard />
      </Content>
    </Layout>
  );
}
