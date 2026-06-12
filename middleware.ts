import { withAuth } from "next-auth/middleware";

// Protect all /admin routes except the login page. Unauthenticated users are
// redirected to /admin/login by NextAuth.
export default withAuth({
  pages: {
    signIn: "/admin/login",
  },
});

export const config = {
  matcher: [
    // The /admin dashboard root and all /admin paths except /admin/login.
    "/admin",
    "/admin/((?!login).*)",
  ],
};
