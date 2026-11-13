import { useTranslation } from "react-i18next";

import { useAddChannel, useChannels } from "../../api/chat.js";
import { useToasts } from "../../context.js";
import useUiStore from "../../stores/useUiStore.js";
import ChannelNameForm from "./ChannelNameForm.jsx";

const AddChannelModal = ({ onClose }) => {
  const { t } = useTranslation();
  const { showSuccess } = useToasts();
  const { data: channels = [] } = useChannels();
  const addChannel = useAddChannel();
  const setCurrentChannel = useUiStore((state) => state.setCurrentChannel);

  const handleSubmit = (name) => {
    addChannel.mutate(name, {
      onSuccess: (channel) => {
        setCurrentChannel(channel.id);
        showSuccess(t("toasts.channelCreated"));
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
    />
  );
};

export default AddChannelModal;
