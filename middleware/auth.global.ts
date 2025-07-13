// middleware/auth.global.ts
export default defineNuxtRouteMiddleware(to => {
  // 1. Skip auth check for non-protected routes
  const isProtectedRoute =
    to.path.startsWith("/dashboard") ||
    to.path.startsWith("/client/docs") ||
    to.path.startsWith("/dev/docs");

  if (!isProtectedRoute) {
    // Public route - no auth needed
    return;
  }

  // 2. Authentication check
  const { loggedIn, user } = useUserSession();
  if (!loggedIn.value) {
    return navigateTo(`/login?redirect=${encodeURIComponent(to.path)}`);
  }

  // 3. Role-based authorization
  if (to.path.startsWith("/dashboard") && user.value?.role !== "admin") {
    return navigateTo("/unauthorized");
  }

  if (to.path.startsWith("/dev/docs") && user.value?.role !== "dev") {
    return navigateTo("/unauthorized");
  }

  // Client docs allow both roles
  if (
    to.path.startsWith("/client/docs") &&
    !["client", "dev"].includes(user.value?.role!)
  ) {
    return navigateTo("/unauthorized");
  }

  // 4. Set layout (optional - can also be done in route files)
  if (to.path.startsWith("/dashboard")) {
    setPageLayout("dashboard");
  } 
  // else if (to.path.match(/^\/(client|dev)\/docs/)) {
  //   setPageLayout("docs");
  // }
});