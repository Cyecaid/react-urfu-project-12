import { useState } from "react";
import { Anchor, Button, PasswordInput, Stack, Text, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router";

import { login } from "../api/auth.js";
import { HttpError } from "../api/client.js";
import AuthCard from "../components/AuthCard.jsx";
import { useRequest, useToasts } from "../context.js";
import useAuthStore from "../stores/useAuthStore.js";

const LoginPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const logIn = useAuthStore((state) => state.logIn);
  const request = useRequest();
  const { showError } = useToasts();
  const [isSubmitting, setSubmitting] = useState(false);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      username: "",
      password: "",
    },
    validate: {
      username: isNotEmpty(t("errors.required")),
      password: isNotEmpty(t("errors.required")),
    },
  });

  const handleSubmit = async (values) => {
    setSubmitting(true);
    try {
      const data = await login(request, values);
      logIn(data);
      navigate("/", { replace: true });
    } catch (error) {
      setSubmitting(false);
      if (error instanceof HttpError && error.status === 401) {
        form.setErrors({ username: true, password: t("login.invalidCredentials") });
        return;
      }
      showError(t(error instanceof HttpError ? "toasts.requestError" : "toasts.networkError"));
    }
  };

  const footer = (
    <Text size="sm">
      {t("login.noAccount")}{" "}
      <Anchor component={Link} to="/signup">
        {t("login.signupLink")}
      </Anchor>
    </Text>
  );

  return (
    <AuthCard title={t("login.title")} footer={footer}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput
            label={t("login.username")}
            autoComplete="username"
            key={form.key("username")}
            {...form.getInputProps("username")}
          />
          <PasswordInput
            label={t("login.password")}
            autoComplete="current-password"
            key={form.key("password")}
            {...form.getInputProps("password")}
          />
          <Button type="submit" fullWidth loading={isSubmitting}>
            {t("login.submit")}
          </Button>
        </Stack>
      </form>
    </AuthCard>
  );
};

export default LoginPage;
