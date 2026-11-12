import filter from "leo-profanity";

filter.add(filter.getDictionary("ru"));

export const cleanText = (text) => filter.clean(text);
