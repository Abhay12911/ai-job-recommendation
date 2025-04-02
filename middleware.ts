import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login", // Redirect users to login page if not authenticated
  },
});

export const config = {
  matcher: ["/dashboard/:path*"], // Protects only dashboard pages
};