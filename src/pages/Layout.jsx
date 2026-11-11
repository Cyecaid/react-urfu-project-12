import { Anchor, AppShell, Container } from "@mantine/core";
import { Link, Outlet } from "react-router";

const Layout = () => (
  <AppShell header={{ height: 60 }} padding="md">
    <AppShell.Header>
      <Container size="lg" h="100%" display="flex" style={{ alignItems: "center" }}>
        <Anchor component={Link} to="/" c="dark" fw={500} underline="never">
          Hexlet Chat
        </Anchor>
      </Container>
    </AppShell.Header>
    <AppShell.Main>
      <Outlet />
    </AppShell.Main>
  </AppShell>
);

export default Layout;
