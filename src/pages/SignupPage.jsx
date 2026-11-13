import { useState } from "react";
import { Anchor, Button, PasswordInput, Stack, Text, TextInput } from "@mantine/core";
import { hasLength, isNotEmpty, matchesField, useForm } from "@mantine/form";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router";

import { signup } from "../api/auth.js";
import { HttpError } from "../api/client.js";
import AuthCard from "../components/AuthCard.jsx";
import { useRequest, useToasts } from "../context.js";
import useAuthStore from "../stores/useAuthStore.js";

const SignupPage = () => {
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
      confirmPassword: "",
    },
    transformValues: ({ username, password }) => ({ username: username.trim(), password }),
    validate: {
      username: (value) => isNotEmpty(t("errors.required"))(value.trim())
        ?? hasLength({ min: 3, max: 20 }, t("signup.usernameLength"))(value.trim()),
      password: (value) => isNotEmpty(t("errors.required"))(value)
        ?? hasLength({ min: 6 }, t("signup.passwordLength"))(value),
      confirmPassword: (value, values) => isNotEmpty(t("errors.required"))(value)
        ?? matchesField("password", t("signup.passwordsMustMatch"))(value, values),
    },
  });

  const handleSubmit = async (values) => {
    setSubmitting(true);
    try {
      const data = await signup(request, values);
      logIn(data);
      navigate("/", { replace: true });
    } catch (error) {
      setSubmitting(false);
      if (error instanceof HttpError && error.status === 409) {
        form.setErrors({ username: t("signup.alreadyExists") });
        return;
      }
      showError(t(error instanceof HttpError ? "toasts.requestError" : "toasts.networkError"));
    }
  };

  const footer = (
    <Text size="sm">
      {t("signup.haveAccount")}{" "}
      <Anchor component={Link} to="/login">
        {t("signup.loginLink")}
      </Anchor>
    </Text>
  );

  return (
    <AuthCard title={t("signup.title")} footer={footer}>
      <form onSubmit={form.onSubmit(handleSubmit)} noValidate>
        <Stack>
          <TextInput
            label={t("signup.username")}
            autoComplete="username"
            required
            key={form.key("username")}
            {...form.getInputProps("username")}
          />
          <PasswordInput
            label={t("signup.password")}
            autoComplete="new-password"
            required
            key={form.key("password")}
            {...form.getInputProps("password")}
          />
          <PasswordInput
            label={t("signup.confirmPassword")}
            autoComplete="new-password"
            required
            key={form.key("confirmPassword")}
            {...form.getInputProps("confirmPassword")}
          />
          <Button type="submit" fullWidth loading={isSubmitting}>
            {t("signup.submit")}
          </Button>
        </Stack>
      </form>
    </AuthCard>
  );
};

export default SignupPage;
