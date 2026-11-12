import { Button, Group, Stack, TextInput } from "@mantine/core";
import { hasLength, isNotEmpty, useForm } from "@mantine/form";
import { useTranslation } from "react-i18next";

import { cleanText } from "../../profanity.js";

const ChannelNameForm = ({ initialName = "", takenNames, onSubmit, onCancel, isPending }) => {
  const { t } = useTranslation();
  const form = useForm({
    mode: "uncontrolled",
    initialValues: { name: initialName },
    transformValues: ({ name }) => ({ name: cleanText(name.trim()) }),
    validate: {
      name: (value) => {
        const name = cleanText(value.trim());
        return isNotEmpty(t("errors.required"))(name)
          ?? hasLength({ min: 3, max: 20 }, t("modals.nameLength"))(name)
          ?? (takenNames.includes(name) ? t("modals.nameUnique") : null);
      },
    },
  });

  return (
    <form onSubmit={form.onSubmit(({ name }) => onSubmit(name))}>
      <Stack>
        <TextInput
          {...form.getInputProps("name")}
          key={form.key("name")}
          label={t("modals.channelName")}
          autoComplete="off"
          data-autofocus
          readOnly={isPending}
          onFocus={(event) => event.currentTarget.select()}
        />
        <Group justify="flex-end">
          <Button variant="default" onClick={onCancel} disabled={isPending}>
            {t("modals.cancel")}
          </Button>
          <Button type="submit" loading={isPending}>
            {t("modals.submit")}
          </Button>
        </Group>
      </Stack>
    </form>
  );
};

export default ChannelNameForm;
