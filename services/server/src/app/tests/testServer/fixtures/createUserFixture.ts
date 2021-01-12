import { TokenType } from "@libs/headers";
import { JwtService } from "@libs/jwt";
import { Password } from "@libs/password";
import { PrismaClient, User, Prisma } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

export type UserFixture = (params?: Partial<Prisma.UserCreateInput>) => Promise<{ user: User; tokenCookie: string }>;

export interface UserFixtures {
  user: UserFixture;
  admin: UserFixture;
}

export interface CreateUserFixturesParams {
  prisma: PrismaClient;
  jwt: JwtService;
  password: Password;
}

export const createUserFixtures = ({ prisma, jwt, password }: CreateUserFixturesParams): UserFixtures => {
  const userFixture: UserFixture = async (params = {}) => {
    const { userGroup, ...rest } = params;
    const user = await prisma.user.create({
      data: {
        email: `${uuidv4()}@test.test`,
        firstName: uuidv4(),
        lastName: uuidv4(),
        password: await password.hash(uuidv4()),
        userGroup: userGroup ?? JSON.stringify({ user: true }),
        ...rest,
      },
    });
    const token = jwt.sign({ id: user.id.toString() });
    return { user, tokenCookie: `${TokenType.accessToken}=${token}` };
  };

  return {
    user: userFixture,
    admin: (params) => userFixture({ ...params, userGroup: JSON.stringify({ user: true, admin: true }) }),
  };
};
