/*********************************************************************************************************************
 * File: page.jsx
 * Developed By Manaf Hijazi
 * Email: manafhijazii@gmail.com
 * Date: 2023-05-07
 * Desc: Top page Summary and Actions Github Search
 * Copyright (c) - Manaf Hijazi
 *********************************************************************************************************************/

import { Suspense } from 'react';
import styles from './page.module.scss';
import { GithubSearchService } from '@/services/Github.Services';
import { SearchComponent } from '@/components/search-component/SearchComponent';

/**
 * A Server Side Rendering and fetching the data on the server
 * A service function that interacts with the GitHub API to search for repositories based on a specific search term.
 * @returns An object containing the search results as a stringified array of items and the total count of search results.
 */
async function githubSearchService() {
  // Send an HTTP request to the GitHub API using the GithubSearchService utility function
  const response = await GithubSearchService({ searchType: 'repositories', searchTerm: 'test' });

  // Extract the items array from the response and stringify it
  const { data } = response;
  const items = JSON.stringify(data.items);

  // Extract the total count from the response
  const totalCount = data.total_count;

  // Return an object containing the search results and total count
  return { items, totalCount };
}

/**
 * A functional component that renders the main content of the home page of a web application built with Next.js.
 * Calls the githubSearchService to obtain search results and passes them as a prop to the SearchComponent.
 * @returns A JSX element that contains a main tag with a Suspense tag that shows a loading message as fallback.
 */
const Home = async () => {
  // Call the githubSearchService function to obtain the search results
  const initSearchResults = await githubSearchService();

  // Render the main content of the home page
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <div className={styles.main}>
          <SearchComponent initSearchResults={initSearchResults} />
        </div>
      </Suspense>
    </main>
  );
};

export default Home;
