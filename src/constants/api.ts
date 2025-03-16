export const BASE_URL = __DEV__
  ? "https://api.github.com"
  : "https://api.github.com";

export const ENDPOINTS = {
  searchRepositories: "/search/repositories",
};

export default {
  BASE_URL,
  ENDPOINTS,
};
