import { Button, ScrollArea, Stack, Text } from "@mantine/core";

const ChannelsList = ({ channels, currentChannelId, onSelect }) => (
  <Stack gap={0} h="100%" w={220} bg="gray.0" style={{ flexShrink: 0 }}>
    <Text fw={700} p="md">
      Каналы
    </Text>
    <ScrollArea flex={1} px="xs" pb="xs">
      <Stack gap={4} component="ul" m={0} p={0} style={{ listStyle: "none" }}>
        {channels.map((channel) => (
          <li key={channel.id}>
            <Button
              fullWidth
              justify="flex-start"
              variant={channel.id === currentChannelId ? "filled" : "subtle"}
              color={channel.id === currentChannelId ? "gray.7" : "dark"}
              onClick={() => onSelect(channel.id)}
            >
              # {channel.name}
            </Button>
          </li>
        ))}
      </Stack>
    </ScrollArea>
  </Stack>
);

export default ChannelsList;
