import { useAddChannel, useChannels } from "../../api/chat.js";
import useUiStore from "../../stores/useUiStore.js";
import ChannelNameForm from "./ChannelNameForm.jsx";

const AddChannelModal = ({ onClose }) => {
  const { data: channels = [] } = useChannels();
  const addChannel = useAddChannel();
  const setCurrentChannel = useUiStore((state) => state.setCurrentChannel);

  const handleSubmit = (name) => {
    addChannel.mutate(name, {
      onSuccess: (channel) => {
        setCurrentChannel(channel.id);
        onClose();
      },
    });
  };

  return (
    <ChannelNameForm
      takenNames={channels.map(({ name }) => name)}
      onSubmit={handleSubmit}
      onCancel={onClose}
      isPending={addChannel.isPending}
      isError={addChannel.isError}
    />
  );
};

export default AddChannelModal;
