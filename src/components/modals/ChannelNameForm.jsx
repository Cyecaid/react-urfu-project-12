import { Button, Group, Stack, Text, TextInput } from "@mantine/core";
import { hasLength, isNotEmpty, useForm } from "@mantine/form";

const ChannelNameForm = ({ initialName = "", takenNames, onSubmit, onCancel, isPending, isError }) => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: { name: initialName },
    transformValues: ({ name }) => ({ name: name.trim() }),
    validate: {
      name: (value) => {
        const name = value.trim();
        return isNotEmpty("Обязательное поле")(name)
          ?? hasLength({ min: 3, max: 20 }, "От 3 до 20 символов")(name)
          ?? (takenNames.includes(name) ? "Должно быть уникальным" : null);
      },
    },
  });

  return (
    <form onSubmit={form.onSubmit(({ name }) => onSubmit(name))}>
      <Stack>
        <TextInput
          {...form.getInputProps("name")}
          key={form.key("name")}
          label="Имя канала"
          autoComplete="off"
          data-autofocus
          readOnly={isPending}
          onFocus={(event) => event.currentTarget.select()}
        />
        {isError && (
          <Text c="red" size="sm">
            Не удалось выполнить запрос. Проверьте соединение и попробуйте ещё раз
          </Text>
        )}
        <Group justify="flex-end">
          <Button variant="default" onClick={onCancel} disabled={isPending}>
            Отменить
          </Button>
          <Button type="submit" loading={isPending}>
            Отправить
          </Button>
        </Group>
      </Stack>
    </form>
  );
};

export default ChannelNameForm;
