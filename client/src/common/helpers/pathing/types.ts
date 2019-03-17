export enum Paths {
  home = '/',
  login = '/login',
  signup = '/signup',
  logout = '/logout',
  dashboard = '/dashboard',
  createClass = '/create-a-class'
}

export enum QueryStringKeys {
  redirect = 'redirect'
}

export type QueryStringOptions = { [key in QueryStringKeys]?: string };

export interface LinkgenOptions {
  query?: QueryStringOptions;
}

export type GetQueryStringOptionsFn = (
  queryString: string
) => QueryStringOptions;
