import { Card, Container, Stack, Title } from "@mantine/core";

const AuthCard = ({ title, footer, children }) => (
  <Container size={420} mt="xl">
    <Card withBorder shadow="sm" padding="xl" radius="md">
      <Stack>
        <Title order={1} ta="center">
          {title}
        </Title>
        {children}
      </Stack>
      {footer && (
        <Card.Section withBorder inheritPadding py="md" mt="xl" ta="center">
          {footer}
        </Card.Section>
      )}
    </Card>
  </Container>
);

export default AuthCard;
