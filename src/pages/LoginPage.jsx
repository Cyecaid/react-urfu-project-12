import { useState } from "react";
import { Button, Card, Container, PasswordInput, Stack, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router";

import { login } from "../api/auth.js";
import { HttpError } from "../api/client.js";
import useAuthStore from "../stores/useAuthStore.js";

const LoginPage = () => {
  const navigate = useNavigate();
  const logIn = useAuthStore((state) => state.logIn);
  const [isSubmitting, setSubmitting] = useState(false);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      username: "",
      password: "",
    },
  });

  const handleSubmit = async (values) => {
    setSubmitting(true);
    try {
      const data = await login(values);
      logIn(data);
      navigate("/", { replace: true });
    } catch (error) {
      setSubmitting(false);
      if (error instanceof HttpError && error.status === 401) {
        form.setErrors({ username: true, password: "Неверные имя пользователя или пароль" });
        return;
      }
      form.setErrors({ password: "Ошибка соединения, попробуйте ещё раз" });
    }
  };

  return (
    <Container size={420} mt="xl">
      <Card withBorder shadow="sm" padding="xl" radius="md">
        <form onSubmit={form.onSubmit(handleSubmit)}>
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
            <Button type="submit" fullWidth loading={isSubmitting}>
              Войти
            </Button>
          </Stack>
        </form>
      </Card>
    </Container>
  );
};

export default LoginPage;
