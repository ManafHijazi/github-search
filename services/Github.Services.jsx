import Error from '@/app/error';
import { HttpServices } from '../helpers/HttpMethod.Helper';

export const GithubSearchService = async ({ searchType, searchTerm, prePage = 10, page = 1 }) => {
  try {
    const result = await HttpServices.get(
      `https://api.github.com/search/${searchType}?q=${searchTerm}&per_page=${prePage}&page=${page}`,
    )
      .then((data) => data)
      .catch((error) => error.response);

    return result;
  } catch (error) {
    throw new Error(`Could not load search: ${error.message}`);
  }
};

export const GithubForkedUsersService = async ({ owner, repoName }) => {
  try {
    const result = await HttpServices.get(
      `https://api.github.com/repos/${owner}/${repoName}/forks?per_page=3`,
    )
      .then((data) => data)
      .catch((error) => error.response);

    return result;
  } catch (error) {
    throw new Error(`Could not load forked users: ${error.message}`);
  }
};
