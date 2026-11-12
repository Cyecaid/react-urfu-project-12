import { Anchor, Container, Text, Title } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <Container size="sm" ta="center" mt="xl">
      <Title order={1}>{t("notFound.title")}</Title>
      <Text c="dimmed" mt="md">
        {t("notFound.goTo")}{" "}
        <Anchor component={Link} to="/">
          {t("notFound.homeLink")}
        </Anchor>
      </Text>
    </Container>
  );
};

export default NotFoundPage;
