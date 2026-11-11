import { ActionIcon, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

const MessageForm = () => {
  const form = useForm({
    initialValues: { body: "" },
  });

  return (
    <form onSubmit={form.onSubmit(() => {})}>
      <Group gap="xs" wrap="nowrap">
        <TextInput
          flex={1}
          aria-label="Новое сообщение"
          placeholder="Введите сообщение..."
          autoComplete="off"
          {...form.getInputProps("body")}
        />
        <ActionIcon type="submit" size="lg" aria-label="Отправить" disabled={!form.values.body.trim()}>
          →
        </ActionIcon>
      </Group>
    </form>
  );
};

export default MessageForm;
