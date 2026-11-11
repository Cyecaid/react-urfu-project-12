import { useQuery } from "@tanstack/react-query";

import { request } from "./client.js";

export const useChannels = () => useQuery({
  queryKey: ["channels"],
  queryFn: () => request("/channels"),
});

export const useMessages = () => useQuery({
  queryKey: ["messages"],
  queryFn: () => request("/messages"),
});
