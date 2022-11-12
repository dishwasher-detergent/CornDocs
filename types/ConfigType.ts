export interface Config {
  darkMode?: boolean;
  googleAnalyticsId?: string;
  search?: {
    algolia_admin_key: string;
    algolia_app_id: string;
    algolia_index: string;
    algolia_search_api_key: string;
  };
  project: {
    name: string;
    url: string;
    homePage?: string;
    github: {
      repo: string;
      usesMain?: boolean;
    };
    logo?: {
      src: string;
      alt: string;
      size?: number[];
    };
  };
}
