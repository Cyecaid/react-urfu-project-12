import { Anchor, Container, Text, Title } from "@mantine/core";
import { Link } from "react-router";

const NotFoundPage = () => (
  <Container size="sm" ta="center" mt="xl">
    <Title order={1}>Страница не найдена</Title>
    <Text c="dimmed" mt="md">
      Но вы можете перейти{" "}
      <Anchor component={Link} to="/">
        на главную страницу
      </Anchor>
    </Text>
  </Container>
);

export default NotFoundPage;
