export interface GitHubRepository {
  id: number;
  name: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  html_url: string;
}

export interface GitHubSearchResponse {
  total_count: number;
  incomplete_results: boolean;
  items: GitHubRepository[];
}

export interface GitHubSearchParams {
  q: string;
  page: number;
}
