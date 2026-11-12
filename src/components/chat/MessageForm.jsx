import { useEffect, useRef } from "react";
import { ActionIcon, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useTranslation } from "react-i18next";

import { useSendMessage } from "../../api/chat.js";
import useAuthStore from "../../stores/useAuthStore.js";

const MessageForm = ({ channelId }) => {
  const { t } = useTranslation();
  const username = useAuthStore((state) => state.username);
  const sendMessage = useSendMessage();
  const inputRef = useRef(null);

  const form = useForm({
    initialValues: { body: "" },
  });

  useEffect(() => {
    inputRef.current?.focus();
  }, [channelId]);

  useEffect(() => {
    if (sendMessage.isSuccess) {
      inputRef.current?.focus();
    }
  }, [sendMessage.isSuccess]);

  const handleSubmit = ({ body }) => {
    sendMessage.mutate(
      { body: body.trim(), channelId, username },
      {
        onSuccess: () => form.reset(),
      },
    );
  };

  const isEmpty = !form.values.body.trim();

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Group gap="xs" wrap="nowrap" align="flex-start">
        <TextInput
          {...form.getInputProps("body")}
          ref={inputRef}
          flex={1}
          aria-label={t("chat.newMessage")}
          placeholder={t("chat.messagePlaceholder")}
          autoComplete="off"
          readOnly={sendMessage.isPending}
          error={sendMessage.isError && t("chat.sendError")}
          onChange={(event) => {
            sendMessage.reset();
            form.setFieldValue("body", event.currentTarget.value);
          }}
        />
        <ActionIcon
          type="submit"
          size="lg"
          aria-label={t("chat.send")}
          disabled={isEmpty}
          loading={sendMessage.isPending}
        >
          →
        </ActionIcon>
      </Group>
    </form>
  );
};

export default MessageForm;
