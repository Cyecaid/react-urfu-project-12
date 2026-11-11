import { useChannels, useRenameChannel } from "../../api/chat.js";
import ChannelNameForm from "./ChannelNameForm.jsx";

const RenameChannelModal = ({ channelId, onClose }) => {
  const { data: channels = [] } = useChannels();
  const renameChannel = useRenameChannel();
  const channel = channels.find(({ id }) => id === channelId);

  const handleSubmit = (name) => {
    renameChannel.mutate({ id: channelId, name }, { onSuccess: onClose });
  };

  return (
    <ChannelNameForm
      initialName={channel?.name}
      takenNames={channels.filter(({ id }) => id !== channelId).map(({ name }) => name)}
      onSubmit={handleSubmit}
      onCancel={onClose}
      isPending={renameChannel.isPending}
      isError={renameChannel.isError}
    />
  );
};

export default RenameChannelModal;
