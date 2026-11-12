import { Modal } from "@mantine/core";
import { useTranslation } from "react-i18next";

import useUiStore from "../../stores/useUiStore.js";
import AddChannelModal from "./AddChannelModal.jsx";
import RemoveChannelModal from "./RemoveChannelModal.jsx";
import RenameChannelModal from "./RenameChannelModal.jsx";

const modals = {
  adding: { titleKey: "modals.addTitle", Component: AddChannelModal },
  renaming: { titleKey: "modals.renameTitle", Component: RenameChannelModal },
  removing: { titleKey: "modals.removeTitle", Component: RemoveChannelModal },
};

const ChannelModal = () => {
  const { t } = useTranslation();
  const modal = useUiStore((state) => state.modal);
  const closeModal = useUiStore((state) => state.closeModal);
  const config = modal && modals[modal.type];

  if (!config) {
    return null;
  }

  const { titleKey, Component } = config;

  return (
    <Modal opened onClose={closeModal} title={t(titleKey)} centered>
      <Component channelId={modal.extra?.channelId} onClose={closeModal} />
    </Modal>
  );
};

export default ChannelModal;
