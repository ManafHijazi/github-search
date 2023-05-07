import { mount } from '@cypress/react';
import { SearchComponent } from '../../components/search-component/SearchComponent.jsx';

describe('SearchComponent', () => {
  const initSearchResults = {
    total_count: 3940152,
    incomplete_results: true,
    items: [
      {
        id: 10270250,
        node_id: 'MDEwOlJlcG9zaXRvcnkxMDI3MDI1MA==',
        name: 'react',
        full_name: 'facebook/react',
        private: false,
        owner: {
          login: 'facebook',
          id: 69631,
          node_id: 'MDEyOk9yZ2FuaXphdGlvbjY5NjMx',
          avatar_url: 'https://avatars.githubusercontent.com/u/69631?v=4',
          gravatar_id: '',
          url: 'https://api.github.com/users/facebook',
          html_url: 'https://github.com/facebook',
          followers_url: 'https://api.github.com/users/facebook/followers',
          following_url: 'https://api.github.com/users/facebook/following{/other_user}',
          gists_url: 'https://api.github.com/users/facebook/gists{/gist_id}',
          starred_url: 'https://api.github.com/users/facebook/starred{/owner}{/repo}',
          subscriptions_url: 'https://api.github.com/users/facebook/subscriptions',
          organizations_url: 'https://api.github.com/users/facebook/orgs',
          repos_url: 'https://api.github.com/users/facebook/repos',
          events_url: 'https://api.github.com/users/facebook/events{/privacy}',
          received_events_url: 'https://api.github.com/users/facebook/received_events',
          type: 'Organization',
          site_admin: false,
        },
        html_url: 'https://github.com/facebook/react',
        description: 'The library for web and native user interfaces',
        fork: false,
        url: 'https://api.github.com/repos/facebook/react',
        forks_url: 'https://api.github.com/repos/facebook/react/forks',
        keys_url: 'https://api.github.com/repos/facebook/react/keys{/key_id}',
        collaborators_url:
          'https://api.github.com/repos/facebook/react/collaborators{/collaborator}',
        teams_url: 'https://api.github.com/repos/facebook/react/teams',
        hooks_url: 'https://api.github.com/repos/facebook/react/hooks',
        issue_events_url: 'https://api.github.com/repos/facebook/react/issues/events{/number}',
        events_url: 'https://api.github.com/repos/facebook/react/events',
        assignees_url: 'https://api.github.com/repos/facebook/react/assignees{/user}',
        branches_url: 'https://api.github.com/repos/facebook/react/branches{/branch}',
        tags_url: 'https://api.github.com/repos/facebook/react/tags',
        blobs_url: 'https://api.github.com/repos/facebook/react/git/blobs{/sha}',
        git_tags_url: 'https://api.github.com/repos/facebook/react/git/tags{/sha}',
        git_refs_url: 'https://api.github.com/repos/facebook/react/git/refs{/sha}',
        trees_url: 'https://api.github.com/repos/facebook/react/git/trees{/sha}',
        statuses_url: 'https://api.github.com/repos/facebook/react/statuses/{sha}',
        languages_url: 'https://api.github.com/repos/facebook/react/languages',
        stargazers_url: 'https://api.github.com/repos/facebook/react/stargazers',
        contributors_url: 'https://api.github.com/repos/facebook/react/contributors',
        subscribers_url: 'https://api.github.com/repos/facebook/react/subscribers',
        subscription_url: 'https://api.github.com/repos/facebook/react/subscription',
        commits_url: 'https://api.github.com/repos/facebook/react/commits{/sha}',
        git_commits_url: 'https://api.github.com/repos/facebook/react/git/commits{/sha}',
        comments_url: 'https://api.github.com/repos/facebook/react/comments{/number}',
        issue_comment_url: 'https://api.github.com/repos/facebook/react/issues/comments{/number}',
        contents_url: 'https://api.github.com/repos/facebook/react/contents/{+path}',
        compare_url: 'https://api.github.com/repos/facebook/react/compare/{base}...{head}',
        merges_url: 'https://api.github.com/repos/facebook/react/merges',
        archive_url: 'https://api.github.com/repos/facebook/react/{archive_format}{/ref}',
        downloads_url: 'https://api.github.com/repos/facebook/react/downloads',
        issues_url: 'https://api.github.com/repos/facebook/react/issues{/number}',
        pulls_url: 'https://api.github.com/repos/facebook/react/pulls{/number}',
        milestones_url: 'https://api.github.com/repos/facebook/react/milestones{/number}',
        notifications_url:
          'https://api.github.com/repos/facebook/react/notifications{?since,all,participating}',
        labels_url: 'https://api.github.com/repos/facebook/react/labels{/name}',
        releases_url: 'https://api.github.com/repos/facebook/react/releases{/id}',
        deployments_url: 'https://api.github.com/repos/facebook/react/deployments',
        created_at: '2013-05-24T16:15:54Z',
        updated_at: '2023-05-07T14:19:25Z',
        pushed_at: '2023-05-07T05:48:43Z',
        git_url: 'git://github.com/facebook/react.git',
        ssh_url: 'git@github.com:facebook/react.git',
        clone_url: 'https://github.com/facebook/react.git',
        svn_url: 'https://github.com/facebook/react',
        homepage: 'https://react.dev',
        size: 320707,
        stargazers_count: 206978,
        watchers_count: 206978,
        language: 'JavaScript',
        has_issues: true,
        has_projects: true,
        has_downloads: true,
        has_wiki: true,
        has_pages: true,
        has_discussions: false,
        forks_count: 43187,
        mirror_url: null,
        archived: false,
        disabled: false,
        open_issues_count: 1265,
        license: {
          key: 'mit',
          name: 'MIT License',
          spdx_id: 'MIT',
          url: 'https://api.github.com/licenses/mit',
          node_id: 'MDc6TGljZW5zZTEz',
        },
        allow_forking: true,
        is_template: false,
        web_commit_signoff_required: false,
        topics: ['declarative', 'frontend', 'javascript', 'library', 'react', 'ui'],
        visibility: 'public',
        forks: 43187,
        open_issues: 1265,
        watchers: 206978,
        default_branch: 'main',
        score: 1.0,
      },
    ],
  };

  it('should render with default props', () => {
    mount(
      <SearchComponent
        initSearchResults={{
          total_count: initSearchResults.total_count,
          items: JSON.stringify(initSearchResults.items),
        }}
      />
    );
    cy.get('.search-wrapper').should('be.visible');
  });

  it('should search for repositories and display the results', () => {
    cy.intercept(
      {
        method: 'GET',
        url: 'https://api.github.com/search/repositories?q=react&page=1&per_page=10',
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
        },
      },
      {
        fixture: 'repositories.json',
      }
    ).as('getRepositories');

    mount(
      <SearchComponent
        initSearchResults={{
          total_count: initSearchResults.total_count,
          items: JSON.stringify(initSearchResults.items),
        }}
      />
    );
    cy.get('.search-input').type('react');
    cy.get('.table-row').should('have.length', 10);
  });

  it('should search for users and display the results', () => {
    cy.intercept(
      {
        method: 'GET',
        url: 'https://api.github.com/search/users?q=jack&page=1&per_page=10',
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
        },
      },
      {
        fixture: 'users.json',
      }
    ).as('getUsers');

    mount(
      <SearchComponent
        initSearchResults={{
          total_count: initSearchResults.total_count,
          items: JSON.stringify(initSearchResults.items),
        }}
      />
    );
    cy.get('.search-input').type('jack');
    cy.get('.search-type-select').click();
    cy.get('.type-select-option').eq(1).click();
    cy.get('.table-row').should('have.length', 10);
  });
});