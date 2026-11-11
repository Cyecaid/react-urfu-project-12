import { useEffect, useRef } from "react";
import { Box, Divider, ScrollArea, Stack, Text } from "@mantine/core";

import MessageForm from "./MessageForm.jsx";

const pluralRules = new Intl.PluralRules("ru");
const messageForms = { one: "сообщение", few: "сообщения", many: "сообщений", other: "сообщения" };

const MessagesBox = ({ channel, messages }) => {
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
        <Text fw={700} truncate="end"># {channel?.name}</Text>
        <Text size="sm" c="dimmed">
          {messages.length} {messageForms[pluralRules.select(messages.length)]}
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
