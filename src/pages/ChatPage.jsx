import { Alert, Card, Center, Container, Divider, Flex, Loader } from "@mantine/core";

import { useChannels, useMessages } from "../api/chat.js";
import ChannelsList from "../components/chat/ChannelsList.jsx";
import MessagesBox from "../components/chat/MessagesBox.jsx";
import useConnectionStore from "../stores/useConnectionStore.js";
import useUiStore from "../stores/useUiStore.js";

const ChatPage = () => {
  const channelsQuery = useChannels();
  const messagesQuery = useMessages();
  const currentChannelId = useUiStore((state) => state.currentChannelId);
  const setCurrentChannel = useUiStore((state) => state.setCurrentChannel);
  const isConnected = useConnectionStore((state) => state.isConnected);

  if (channelsQuery.isPending || messagesQuery.isPending) {
    return (
      <Center h="50vh">
        <Loader />
      </Center>
    );
  }

  if (channelsQuery.isError || messagesQuery.isError) {
    return (
      <Container size="sm">
        <Alert color="red" title="Ошибка">
          Не удалось загрузить данные чата
        </Alert>
      </Container>
    );
  }

  const channels = channelsQuery.data;
  const currentChannel = channels.find(({ id }) => id === currentChannelId) ?? channels[0];
  const channelMessages = messagesQuery.data.filter(({ channelId }) => channelId === currentChannel?.id);

  return (
    <Container
      size="lg"
      h="calc(100dvh - var(--app-shell-header-height) - 2 * var(--mantine-spacing-md))"
      display="flex"
      style={{ flexDirection: "column" }}
    >
      {!isConnected && (
        <Alert color="yellow" mb="sm" py="xs">
          Нет соединения с сервером. Пытаемся переподключиться…
        </Alert>
      )}
      <Card withBorder shadow="sm" radius="md" p={0} flex={1} mih={0}>
        <Flex h="100%">
          <ChannelsList
            channels={channels}
            currentChannelId={currentChannel?.id}
            onSelect={setCurrentChannel}
          />
          <Divider orientation="vertical" />
          <MessagesBox channel={currentChannel} messages={channelMessages} />
        </Flex>
      </Card>
    </Container>
  );
};

export default ChatPage;
