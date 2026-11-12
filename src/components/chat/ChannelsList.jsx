import { useEffect, useRef } from "react";
import { ActionIcon, Button, Group, Menu, ScrollArea, Stack, Text, VisuallyHidden } from "@mantine/core";
import { useTranslation } from "react-i18next";

import useUiStore from "../../stores/useUiStore.js";

const ChannelItem = ({ channel, isActive, onSelect }) => {
  const { t } = useTranslation();
  const openModal = useUiStore((state) => state.openModal);
  const variant = isActive ? "filled" : "subtle";
  const color = isActive ? "gray.7" : "dark";

  const button = (
    <Button
      fullWidth
      miw={0}
      justify="flex-start"
      variant={variant}
      color={color}
      onClick={() => onSelect(channel.id)}
      data-active={isActive || undefined}
      styles={{ label: { minWidth: 0 } }}
    >
      <Text span inherit truncate="end">
        # {channel.name}
      </Text>
    </Button>
  );

  if (!channel.removable) {
    return button;
  }

  return (
    <Group gap={0} wrap="nowrap">
      {button}
      <Menu position="bottom-end" withinPortal>
        <Menu.Target>
          <ActionIcon variant={variant} color={color} size={36} style={{ flexShrink: 0 }}>
            <Text span size="xs" aria-hidden>▾</Text>
            <VisuallyHidden>{t("channels.manage")}</VisuallyHidden>
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item onClick={() => openModal("removing", { channelId: channel.id })}>
            {t("channels.remove")}
          </Menu.Item>
          <Menu.Item onClick={() => openModal("renaming", { channelId: channel.id })}>
            {t("channels.rename")}
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
};

const ChannelsList = ({ channels, currentChannelId, onSelect }) => {
  const { t } = useTranslation();
  const openModal = useUiStore((state) => state.openModal);
  const viewportRef = useRef(null);

  useEffect(() => {
    viewportRef.current?.querySelector("[data-active]")?.scrollIntoView?.({ block: "nearest" });
  }, [currentChannelId, channels.length]);

  return (
    <Stack gap={0} h="100%" w={220} bg="gray.0" style={{ flexShrink: 0 }}>
      <Group justify="space-between" p="md" wrap="nowrap">
        <Text fw={700}>{t("channels.title")}</Text>
        <ActionIcon variant="subtle" color="dark" title={t("channels.add")} onClick={() => openModal("adding")}>
          +
        </ActionIcon>
      </Group>
      <ScrollArea flex={1} px="xs" pb="xs" offsetScrollbars viewportRef={viewportRef}>
        <Stack gap={4} component="ul" m={0} p={0} style={{ listStyle: "none" }}>
          {channels.map((channel) => (
            <li key={channel.id}>
              <ChannelItem
                channel={channel}
                isActive={channel.id === currentChannelId}
                onSelect={onSelect}
              />
            </li>
          ))}
        </Stack>
      </ScrollArea>
    </Stack>
  );
};

export default ChannelsList;
