import { Layout } from "antd";
import { AppHeader } from "./header";
import { AppFooter } from "./footer";
import "./style.css";

const { Content } = Layout;

interface AppLayoutProps {
  children: JSX.Element | JSX.Element[];
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <Layout className="app-layout-container">
      <AppHeader />
      <Content>{children}</Content>
      <AppFooter />
    </Layout>
  );
}
