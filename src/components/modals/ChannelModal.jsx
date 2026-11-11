import { Modal } from "@mantine/core";

import useUiStore from "../../stores/useUiStore.js";
import AddChannelModal from "./AddChannelModal.jsx";
import RemoveChannelModal from "./RemoveChannelModal.jsx";
import RenameChannelModal from "./RenameChannelModal.jsx";

const modals = {
  adding: { title: "Добавить канал", Component: AddChannelModal },
  renaming: { title: "Переименовать канал", Component: RenameChannelModal },
  removing: { title: "Удалить канал", Component: RemoveChannelModal },
};

const ChannelModal = () => {
  const modal = useUiStore((state) => state.modal);
  const closeModal = useUiStore((state) => state.closeModal);
  const config = modal && modals[modal.type];

  if (!config) {
    return null;
  }

  const { title, Component } = config;

  return (
    <Modal opened onClose={closeModal} title={title} centered>
      <Component channelId={modal.extra?.channelId} onClose={closeModal} />
    </Modal>
  );
};

export default ChannelModal;
