import { ContextParameters } from 'graphql-yoga/dist/types';
import { GetTokenFromRequest, SetTokenToResponse } from 'libs/headers';
import { Sign, Verify } from 'libs/jwt';
import { ComparePassword, HashPassword } from 'libs/password';
import { Prisma, User } from 'prisma/generated/client';

export type JWT = string;
export interface ResolverContext extends ContextParameters {
  prisma: Prisma;
  viewer: User | null;
  utils: {
    headers: {
      getTokenFromRequest: GetTokenFromRequest;
      setTokenToResponse: SetTokenToResponse;
    };
    jwt: {
      sign: Sign;
      verify: Verify;
    };
    password: {
      compare: ComparePassword;
      hash: HashPassword;
    };
  };
}