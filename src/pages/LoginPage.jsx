import { Button, Card, Container, PasswordInput, Stack, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";

const LoginPage = () => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      username: "",
      password: "",
    },
  });

  return (
    <Container size={420} mt="xl">
      <Card withBorder shadow="sm" padding="xl" radius="md">
        <form onSubmit={form.onSubmit(() => {})}>
          <Stack>
            <Title order={1} ta="center">
              Войти
            </Title>
            <TextInput
              label="Ваш ник"
              autoComplete="username"
              required
              key={form.key("username")}
              {...form.getInputProps("username")}
            />
            <PasswordInput
              label="Пароль"
              autoComplete="current-password"
              required
              key={form.key("password")}
              {...form.getInputProps("password")}
            />
            <Button type="submit" fullWidth>
              Войти
            </Button>
          </Stack>
        </form>
      </Card>
    </Container>
  );
};

export default LoginPage;
