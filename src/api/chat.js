import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { request } from "./client.js";

export const addMessageToCache = (queryClient, message) => {
  queryClient.setQueryData(["messages"], (messages) => {
    if (!messages || messages.some(({ id }) => id === message.id)) {
      return messages;
    }
    return [...messages, message];
  });
};

export const useChannels = () => useQuery({
  queryKey: ["channels"],
  queryFn: () => request("/channels"),
});

export const useMessages = () => useQuery({
  queryKey: ["messages"],
  queryFn: () => request("/messages"),
});

export const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (message) => request("/messages", { method: "POST", body: message }),
    onSuccess: (message) => addMessageToCache(queryClient, message),
  });
};
