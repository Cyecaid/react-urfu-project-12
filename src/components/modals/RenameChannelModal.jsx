import { useTranslation } from "react-i18next";

import { useChannels, useRenameChannel } from "../../api/chat.js";
import { useToasts } from "../../context.js";
import ChannelNameForm from "./ChannelNameForm.jsx";

const RenameChannelModal = ({ channelId, onClose }) => {
  const { t } = useTranslation();
  const { showSuccess } = useToasts();
  const { data: channels = [] } = useChannels();
  const renameChannel = useRenameChannel();
  const channel = channels.find(({ id }) => id === channelId);

  const handleSubmit = (name) => {
    renameChannel.mutate({ id: channelId, name }, {
      onSuccess: () => {
        showSuccess(t("toasts.channelRenamed"));
        onClose();
      },
    });
  };

  return (
    <ChannelNameForm
      initialName={channel?.name}
      takenNames={channels.filter(({ id }) => id !== channelId).map(({ name }) => name)}
      onSubmit={handleSubmit}
      onCancel={onClose}
      isPending={renameChannel.isPending}
    />
  );
};

export default RenameChannelModal;
