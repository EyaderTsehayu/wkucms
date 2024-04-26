import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    console.log(req.nextauth);
    req.nextauth.token?.privilege;
    if (
      req.nextUrl.pathname.includes("/admin") &&
      req.nextauth.token?.role !== "ADMIN"
    ) {
      return new NextResponse("You are not authorized!");
    }
    if (

      (req.nextUrl.pathname.includes("/studentApproval") ||
        req.nextUrl.pathname.includes("/staffApproval")) &&
      req.nextauth.token?.role !== "STAFF"
    ) {

      return new NextResponse("You are not authorized!");
    }
    if (
      req.nextUrl.pathname.includes("/user") &&
      req.nextauth.token?.role !== "STUDENT"
    )
      if (
        req.nextUrl.pathname.includes("/user") &&
        req.nextauth.token?.role !== "STAFF"
      ) {
        return new NextResponse("You are not authorized!");
      }
  },
  {
    callbacks: {
      authorized: (params) => {
        let { token } = params;
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    "/admin",
    "/user",
    "/user/myclearance",
    "/user/help",
    "/user/settings",
    "/user/staffApproval",
    "/user/studentApproval",
    "/user/message",
    
    "/admin/student",
    "/admin/manageAdmins",
    "/admin/manageOffices",
    "/admin/offices",
    "/admin/student",
    "/admin/staff",
    "/admin/report",
    "/admin/announcement",
    "/user/ApprovedUsers"

  ],
};
