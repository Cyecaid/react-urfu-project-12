import { Anchor, AppShell, Button, Container, Group } from "@mantine/core";
import { Link, Outlet } from "react-router";

import useAuthStore from "../stores/useAuthStore.js";

const Layout = () => {
  const token = useAuthStore((state) => state.token);
  const logOut = useAuthStore((state) => state.logOut);

  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <Container size="lg" h="100%">
          <Group h="100%" justify="space-between">
            <Anchor component={Link} to="/" c="dark" fw={500} underline="never">
              Hexlet Chat
            </Anchor>
            {token && <Button onClick={logOut}>Выйти</Button>}
          </Group>
        </Container>
      </AppShell.Header>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default Layout;
