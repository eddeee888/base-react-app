import login from 'graphql/resolvers/Mutation/login';
import logout from 'graphql/resolvers/Mutation/logout';
import signup from 'graphql/resolvers/Mutation/signup';
import { MutationResolvers } from 'graphql/resolvers/types';

export const Mutation: MutationResolvers = {
  signup,
  login,
  logout,
};