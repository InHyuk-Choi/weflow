import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "./db";

const MAX_ATTEMPTS = 5;
const LOCK_MINUTES = 30;
const SESSION_IDLE_SECONDS = 30 * 60; // 30 minutes

class AuthError extends Error {}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: SESSION_IDLE_SECONDS,
  },
  pages: {
    signIn: "/admin/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const username = credentials?.username?.trim();
        const password = credentials?.password ?? "";
        if (!username || !password) {
          throw new AuthError("아이디와 비밀번호를 모두 입력해 주세요.");
        }

        const user = await prisma.user.findUnique({ where: { username } });
        // Generic error — do not reveal which field was wrong.
        if (!user) throw new AuthError("아이디 또는 비밀번호가 올바르지 않습니다.");

        // Account lockout check.
        if (user.lockedUntil && user.lockedUntil > new Date()) {
          throw new AuthError(
            "로그인 시도가 많아 계정이 잠겼습니다. 30분 후 다시 시도해 주세요."
          );
        }

        const ok = await bcrypt.compare(password, user.passwordHash);
        if (!ok) {
          const attempts = user.loginAttempts + 1;
          const shouldLock = attempts >= MAX_ATTEMPTS;
          await prisma.user.update({
            where: { id: user.id },
            data: {
              loginAttempts: shouldLock ? 0 : attempts,
              lockedUntil: shouldLock
                ? new Date(Date.now() + LOCK_MINUTES * 60 * 1000)
                : null,
            },
          });
          if (shouldLock) {
            throw new AuthError(
              "로그인 시도가 많아 계정이 잠겼습니다. 30분 후 다시 시도해 주세요."
            );
          }
          throw new AuthError("아이디 또는 비밀번호가 올바르지 않습니다.");
        }

        // Success — reset attempt counter.
        if (user.loginAttempts !== 0 || user.lockedUntil) {
          await prisma.user.update({
            where: { id: user.id },
            data: { loginAttempts: 0, lockedUntil: null },
          });
        }

        return { id: user.id, name: user.username };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.uid = user.id;
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { id?: string }).id = token.uid as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
