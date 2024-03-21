import AppLayout from "../layout/AppLayout";
import Breadcrumb from "react-bootstrap/Breadcrumb";

export default function Dashboard() {
  return (
    <AppLayout>
      <Breadcrumb>
        <Breadcrumb.Item active>Dashboard</Breadcrumb.Item>
      </Breadcrumb>
    </AppLayout>
  );
}
