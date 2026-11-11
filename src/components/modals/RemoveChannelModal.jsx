import { Button, Group, Stack, Text } from "@mantine/core";

import { useRemoveChannel } from "../../api/chat.js";
import useUiStore from "../../stores/useUiStore.js";

const RemoveChannelModal = ({ channelId, onClose }) => {
  const removeChannel = useRemoveChannel();
  const leaveChannel = useUiStore((state) => state.leaveChannel);

  const handleSubmit = (event) => {
    event.preventDefault();
    removeChannel.mutate(channelId, {
      onSuccess: () => {
        leaveChannel(channelId);
        onClose();
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack>
        <Text>Уверены?</Text>
        {removeChannel.isError && (
          <Text c="red" size="sm">
            Не удалось выполнить запрос. Проверьте соединение и попробуйте ещё раз
          </Text>
        )}
        <Group justify="flex-end">
          <Button variant="default" onClick={onClose} disabled={removeChannel.isPending}>
            Отменить
          </Button>
          <Button type="submit" color="red" loading={removeChannel.isPending} data-autofocus>
            Удалить
          </Button>
        </Group>
      </Stack>
    </form>
  );
};

export default RemoveChannelModal;
