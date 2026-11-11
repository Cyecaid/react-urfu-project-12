import { useEffect, useRef } from "react";
import { ActionIcon, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

import { useSendMessage } from "../../api/chat.js";
import useAuthStore from "../../stores/useAuthStore.js";

const MessageForm = ({ channelId }) => {
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
          aria-label="Новое сообщение"
          placeholder="Введите сообщение..."
          autoComplete="off"
          readOnly={sendMessage.isPending}
          error={sendMessage.isError && "Не удалось отправить сообщение. Проверьте соединение и попробуйте ещё раз"}
          onChange={(event) => {
            sendMessage.reset();
            form.setFieldValue("body", event.currentTarget.value);
          }}
        />
        <ActionIcon
          type="submit"
          size="lg"
          aria-label="Отправить"
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
