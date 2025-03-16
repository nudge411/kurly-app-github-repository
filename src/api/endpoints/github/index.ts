import api from "../../client";

import { GitHubSearchParams, GitHubSearchResponse } from "./type";
import { ENDPOINTS } from "@/constants/api";

const githubApi = {
  searchRepositories: (params: GitHubSearchParams) =>
    api.get<GitHubSearchResponse>(ENDPOINTS.searchRepositories, { params }),
};

export default githubApi;
