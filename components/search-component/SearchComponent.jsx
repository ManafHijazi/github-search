'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Error from '@/app/error';
import { useEventListener } from '@/hooks';
import { Inputs } from '../Inputs-component/Inputs.Component';
import { TablesComponent } from '../table-component/Tables.Component';
import { SelectComponent } from '../select-component/Select.Component';
import { Avatar, ButtonBase, CircularProgress, Tooltip } from '@mui/material';
import { GithubSearchService, GithubForkedUsersService } from '@/services/Github.Services';
import './SearchComponent.scss';

/**
 * SearchComponent is a Next.js component that provides a search functionality for repositories or users on Github, and displays the results in a table format.
 * It also displays the users who have forked a repository in a tooltip when hovering over the repository name.
 * @param {Object} initSearchResults - The initial search results to display when the component is loaded. It should contain an array of Github repositories or users.
 * @returns {JSX.Element} - The JSX element that represents the SearchComponent.
 */
export const SearchComponent = ({ initSearchResults }) => {
  const bodyRef = useRef(null);
  const [timer, setTimer] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [forkedUsers, setForkedUsers] = useState([]);
  const [localSearchValue, setLocalSearchValue] = useState('');
  const [searchType, setSearchType] = useState('repositories');
  const [searchResults, setSearchResults] = useState({
    items: [],
    total_count: 1,
    isLoaded: false,
  });
  const [filter, setFilter] = useState({
    page: 1,
    perPage: 10,
  });

  /**
   * A callback function that fetches the users who have forked a repository from Github's API.
   * @param {string} owner - The username of the repository owner.
   * @param {string} repoName - The name of the repository.
   * @param {number} repoId - The ID of the repository.
   * @returns {Promise<void>} - A promise that resolves when the function finishes executing.
   */
  const getForkedUsers = useCallback(async (owner, repoName, repoId) => {
    const response = await GithubForkedUsersService({ owner, repoName });

    if (response && response.data && response.status === 200) {
      const { data } = response;

      const localForkedUsers = data.map((item) => ({
        id: repoId,
        userId: item.id,
        name: item.owner.login,
        forksUrl: item.html_url,
        avatar: item.owner.avatar_url,
      }));

      setForkedUsers((items) => {
        const grouppedArr = [...items, ...localForkedUsers];

        const uniqueArr = grouppedArr.filter(
          (value, index, self) => index === self.findIndex((t) => t.userId === value.userId)
        );

        items = uniqueArr;

        return [...items].flat();
      });
    }

    setIsLoading(false);
  }, []);

  /**
   * A callback function that fetches the search results from Github's API.
   * @returns {Promise<void>} - A promise that resolves when the function finishes executing.
   */
  const githubSearchService = useCallback(async () => {
    setIsLoading(true);

    const response = await GithubSearchService({
      searchType,
      searchTerm,
      page: filter.page,
      prePage: filter.perPage,
    });

    if (response && response.data && response.status === 200) {
      const { data } = response;

      if (localSearchValue)
        setSearchResults((results) => {
          const grouppedArr = [...searchResults.items, ...data.items];

          const uniqueArr = grouppedArr.filter(
            (value, index, self) => index === self.findIndex((t) => t.id === value.id)
          );

          return {
            ...results,
            isLoaded: true,
            total_count: data.total_count,
            items: uniqueArr,
          };
        });
      else
        setSearchResults((results) => {
          const grouppedArr = [
            ...searchResults.items,
            ...JSON.parse(initSearchResults.items),
            ...data.items,
          ];

          const uniqueArr = grouppedArr.filter(
            (value, index, self) => index === self.findIndex((t) => t.id === value.id)
          );

          return {
            ...results,
            isLoaded: true,
            total_count: data.total_count,
            items: uniqueArr,
          };
        });

      if (searchType === 'repositories') {
        const grouppedArr = [
          ...searchResults.items,
          ...JSON.parse(initSearchResults.items),
          ...data.items,
        ];

        const uniqueArr = grouppedArr.filter(
          (value, index, self) => index === self.findIndex((t) => t.id === value.id)
        );

        uniqueArr.map((item) => getForkedUsers(item.owner.login, item.name, item.id));
      }
    } else {
      throw new Error(
        (response && response.data && response.data.message) || 'An error has occured!'
      );
    }

    if (searchType === 'users') setIsLoading(false);
  }, [searchType, searchTerm, filter, initSearchResults, localSearchValue]);

  /**
   * A callback function that handles the 'scroll' event and loads more search results if the user has scrolled to the bottom of the page.
   * @param {Event} event - The 'scroll' event.
   * @returns {void}
   */
  const onScrollHandler = useCallback(
    (event) => {
      const element = event.target;

      if (
        element.scrollHeight - element.scrollTop === element.clientHeight &&
        searchResults.items.length < searchResults.total_count &&
        !isLoading
      ) {
        setIsLoading(true);

        if (searchTerm === '') setSearchTerm('test');
        setFilter((items) => ({ ...items, page: items.page + 1 }));
      }
    },
    [searchResults.items.length, searchResults.total_count, isLoading]
  );

  // Register the 'scroll' event listener.
  useEventListener('scroll', onScrollHandler, bodyRef.current);

  /**
   * A side effect that fetches the search results from Github's API when the search term changes.
   * @returns {void}
   */
  useEffect(() => {
    if (searchTerm) githubSearchService();
  }, [searchTerm, githubSearchService]);

  /**
   * A side effect that fetches the users who have forked a repository from Github's API when the component is loaded.
   * @returns {void}
   */
  useEffect(() => {
    if (
      initSearchResults &&
      initSearchResults.items &&
      searchResults.items.length === 0 &&
      searchType === 'repositories'
    ) {
      JSON.parse(initSearchResults.items).map((item) => {
        getForkedUsers(item.owner.login, item.name, item.id);
      });
    }
  }, [initSearchResults, searchType, searchResults]);

  return (
    <div className='search-wrapper'>
      <div className='filter-wrapper'>
        <div className='input-search-wrapper'>
          <Inputs
            idRef='searchInputId'
            themeClass='theme-solid'
            value={localSearchValue}
            inputPlaceholder='Search'
            onInputChanged={(event) => {
              const { value } = event.target;

              setLocalSearchValue(value);
              clearTimeout(timer);

              const newTimer = setTimeout(() => {
                setSearchResults((results) => ({
                  ...results,
                  isLoaded: true,
                  total_count: 1,
                  items: [],
                }));

                setForkedUsers([]);

                setSearchTerm(value);
              }, 500);

              setTimer(newTimer);
            }}
          />
          <SelectComponent
            idRef='typeSelectId'
            themeClass='theme-solid'
            data={
              [
                { key: 'repositories', value: 'repositories' },
                { key: 'users', value: 'users' },
              ] || []
            }
            valueInput='key'
            textInput='value'
            defaultValue={-1}
            value={searchType || -1}
            emptyItem={{ value: -1, text: 'Select Search Type', isHiddenOnOpen: true }}
            onSelectChanged={(newValue) => {
              setForkedUsers([]);
              setSearchResults({ items: [], total_count: 1, isLoaded: true });
              setSearchType(newValue);
            }}
          />
        </div>
        <div className='loading-wrapper'>
          {isLoading && <CircularProgress color='inherit' size={35} />}
        </div>
      </div>

      {searchType === 'repositories' ? (
        <TablesComponent
          tableExRef={bodyRef}
          headerData={[
            {
              id: 1,
              label: 'Name',
              input: 'name',
            },
            {
              id: 2,
              label: 'File Type',
              input: 'language',
              component: (row) => (
                <div>
                  {row.language ? <div className='language-badge'>{row.language}</div> : 'N/A'}
                </div>
              ),
            },
            {
              id: 3,
              label: 'Forks',
              component: (row) => (
                <div className='users-wrapper'>
                  {forkedUsers &&
                    forkedUsers.length > 0 &&
                    forkedUsers
                      .filter((item) => item.id === row.id)
                      .map((item, index) => (
                        <div className='user' key={`${item.id}-${index + 1}-user`}>
                          <ButtonBase>
                            <a target='_blank' href={item.forksUrl}>
                              <Avatar sizes='small' alt={item.name} src={item.avatar} />
                            </a>
                          </ButtonBase>

                          <Tooltip title={item.name}>
                            <div className='name'>{item.name}</div>
                          </Tooltip>
                        </div>
                      ))}
                </div>
              ),
            },
          ]}
          pageIndex={filter.page - 1}
          pageSize={filter.page || 0}
          data={
            (searchResults && searchResults.items && searchResults.items.length > 0
              ? searchResults.items
              : initSearchResults &&
                initSearchResults.items &&
                JSON.parse(initSearchResults.items)) || []
          }
          totalItems={
            (searchResults && searchResults.items && searchResults.items.length > 0
              ? searchResults.total_count
              : initSearchResults && initSearchResults.total_count) || 0
          }
        />
      ) : (
        <TablesComponent
          tableExRef={bodyRef}
          headerData={[
            {
              id: 1,
              label: 'Name',
              input: 'login',
              component: (row) => (
                <div className='user'>
                  <Avatar sizes='small' alt={row.name} src={row.avatar_url} />
                  <Tooltip title={row.login}>
                    <div className='name'>{row.login}</div>
                  </Tooltip>
                </div>
              ),
            },
            {
              id: 2,
              label: 'Type',
              input: 'type',
            },
          ]}
          pageIndex={filter.page - 1}
          pageSize={filter.page || 0}
          data={
            (searchResults &&
              searchResults.items &&
              searchResults.items.length > 0 &&
              searchResults.items) ||
            []
          }
          totalItems={
            (searchResults &&
              searchResults.items &&
              searchResults.items.length > 0 &&
              searchResults.total_count) ||
            0
          }
          isWithTableActions
          tableActionsOptions={{
            component: (row) => {
              return (
                <Tooltip title='View'>
                  <ButtonBase
                    id='userAccountBtnId'
                    className='btns-icon theme-primary mr-3 c-gray-darker'>
                    <a target='_blank' href={row.html_url}>
                      <span className='mdi mdi-eye' />
                    </a>
                  </ButtonBase>
                </Tooltip>
              );
            },
          }}
        />
      )}

      {initSearchResults &&
        initSearchResults.items &&
        JSON.parse(initSearchResults.items).length === 0 && (
          <div className='no-data-wrapper'>No results found, please try again</div>
        )}

      {initSearchResults &&
        initSearchResults.items &&
        JSON.parse(initSearchResults.items).length > 0 &&
        searchResults.isLoaded &&
        searchResults.items.length === 0 && (
          <div className='no-data-wrapper'>No results found, please try again</div>
        )}
    </div>
  );
};
