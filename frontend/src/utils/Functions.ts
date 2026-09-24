import { BASE_NAME } from "../constants/api";

export const ImageUrl = (image: string) => {
  const base = BASE_NAME.endsWith("/") ? BASE_NAME : `${BASE_NAME}/`;
  return `${base}images/${image}`.replace(/([^:]\/)\/+/g, "$1");
};