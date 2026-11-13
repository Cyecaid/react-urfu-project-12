import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useRequest } from "../context.js";

export const addMessageToCache = (queryClient, message) => {
  queryClient.setQueryData(["messages"], (messages) => {
    if (!messages || messages.some(({ id }) => id === message.id)) {
      return messages;
    }
    return [...messages, message];
  });
};

export const addChannelToCache = (queryClient, channel) => {
  queryClient.setQueryData(["channels"], (channels) => {
    if (!channels || channels.some(({ id }) => id === channel.id)) {
      return channels;
    }
    return [...channels, channel];
  });
};

export const renameChannelInCache = (queryClient, channel) => {
  queryClient.setQueryData(["channels"], (channels) => channels?.map(
    (item) => (item.id === channel.id ? { ...item, ...channel } : item),
  ));
};

export const removeChannelFromCache = (queryClient, { id }) => {
  queryClient.setQueryData(["channels"], (channels) => channels?.filter((channel) => channel.id !== id));
  queryClient.setQueryData(["messages"], (messages) => messages?.filter(({ channelId }) => channelId !== id));
};

export const useChannels = () => {
  const request = useRequest();

  return useQuery({
    queryKey: ["channels"],
    queryFn: () => request("/channels"),
  });
};

export const useMessages = () => {
  const request = useRequest();

  return useQuery({
    queryKey: ["messages"],
    queryFn: () => request("/messages"),
  });
};

export const useSendMessage = () => {
  const queryClient = useQueryClient();
  const request = useRequest();

  return useMutation({
    mutationFn: (message) => request("/messages", { method: "POST", body: message }),
    onSuccess: (message) => addMessageToCache(queryClient, message),
  });
};

export const useAddChannel = () => {
  const queryClient = useQueryClient();
  const request = useRequest();

  return useMutation({
    mutationFn: (name) => request("/channels", { method: "POST", body: { name } }),
    onSuccess: (channel) => addChannelToCache(queryClient, channel),
  });
};

export const useRenameChannel = () => {
  const queryClient = useQueryClient();
  const request = useRequest();

  return useMutation({
    mutationFn: ({ id, name }) => request(`/channels/${id}`, { method: "PATCH", body: { name } }),
    onSuccess: (channel) => renameChannelInCache(queryClient, channel),
  });
};

export const useRemoveChannel = () => {
  const queryClient = useQueryClient();
  const request = useRequest();

  return useMutation({
    mutationFn: (id) => request(`/channels/${id}`, { method: "DELETE" }),
    onSuccess: (channel) => removeChannelFromCache(queryClient, channel),
  });
};
