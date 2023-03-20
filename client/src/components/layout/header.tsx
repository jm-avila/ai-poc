import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { AppPath } from "../../pages/index";
const { Header } = Layout;

export function AppHeader() {
  const navigate = useNavigate();
  const items = [
    {
      key: AppPath.home,
      label: "Home",
    },
    {
      key: AppPath.search,
      label: "Search",
    },
    {
      key: AppPath.embedding,
      label: "Embeddings",
    },
  ];

  return (
    <Header>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[AppPath.home]}
        items={items}
        onClick={(event) => navigate(event.key)}
      />
    </Header>
  );
}
