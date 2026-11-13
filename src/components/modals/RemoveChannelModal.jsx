import { Button, Group, Stack, Text } from "@mantine/core";
import { useTranslation } from "react-i18next";

import { useRemoveChannel } from "../../api/chat.js";
import { useToasts } from "../../context.js";
import useUiStore from "../../stores/useUiStore.js";

const RemoveChannelModal = ({ channelId, onClose }) => {
  const { t } = useTranslation();
  const { showSuccess } = useToasts();
  const removeChannel = useRemoveChannel();
  const leaveChannel = useUiStore((state) => state.leaveChannel);

  const handleSubmit = (event) => {
    event.preventDefault();
    removeChannel.mutate(channelId, {
      onSuccess: () => {
        leaveChannel(channelId);
        showSuccess(t("toasts.channelRemoved"));
        onClose();
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack>
        <Text>{t("modals.confirmRemove")}</Text>
        <Group justify="flex-end">
          <Button variant="default" onClick={onClose} disabled={removeChannel.isPending}>
            {t("modals.cancel")}
          </Button>
          <Button type="submit" color="red" loading={removeChannel.isPending} data-autofocus>
            {t("modals.remove")}
          </Button>
        </Group>
      </Stack>
    </form>
  );
};

export default RemoveChannelModal;
