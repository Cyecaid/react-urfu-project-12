import { useEffect, useRef } from "react";
import { Box, Divider, Group, ScrollArea, Stack, Text } from "@mantine/core";
import { useTranslation } from "react-i18next";

import MessageForm from "./MessageForm.jsx";

const MessagesBox = ({ channel, messages }) => {
  const { t } = useTranslation();
  const viewportRef = useRef(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (viewport) {
      viewport.scrollTo({ top: viewport.scrollHeight });
    }
  }, [channel?.id, messages.length]);

  return (
    <Stack gap={0} h="100%" flex={1} miw={0}>
      <Box p="md" bg="gray.0">
        <Group gap={4} wrap="nowrap">
          <Text fw={700}>#</Text>
          <Text fw={700} truncate="end">
            {channel?.name}
          </Text>
        </Group>
        <Text size="sm" c="dimmed">
          {t("chat.messagesCount", { count: messages.length })}
        </Text>
      </Box>
      <Divider />
      <ScrollArea flex={1} px="md" viewportRef={viewportRef}>
        <Stack gap="xs" py="md">
          {messages.map((message) => (
            <Text key={message.id} style={{ overflowWrap: "anywhere" }}>
              <Text span fw={700}>
                {message.username}
              </Text>
              : {message.body}
            </Text>
          ))}
        </Stack>
      </ScrollArea>
      <Box p="md">
        <MessageForm channelId={channel?.id} />
      </Box>
    </Stack>
  );
};

export default MessagesBox;
