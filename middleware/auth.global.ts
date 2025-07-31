// middleware/auth.global.ts
export default defineNuxtRouteMiddleware(to => {
  const { loggedIn, user } = useUserSession();

  const role = user.value?.role ?? "";

  // ============================
  // 0. Auto redirect if logged in
  // ============================
  if (loggedIn.value) {
    // Jika user akses login page
    if (to.path === "/login") {
      if (["admin", "superadmin"].includes(role)) {
        return navigateTo("/dashboard");
      } else {
        return navigateTo("/");
      }
    }
  }

  // ============================
  // 1. Skip auth check for public routes
  // ============================
  const isProtectedRoute =
    to.path.startsWith("/dashboard") ||
    to.path.startsWith("/client/docs") ||
    to.path.startsWith("/dev/docs");

  if (!isProtectedRoute) return;

  // ============================
  // 2. Authentication check
  // ============================
  if (!loggedIn.value) {
    return navigateTo(`/login?redirect=${encodeURIComponent(to.path)}`);
  }

  // ============================
  // 3. Role-based authorization
  // ============================

  // --- Dashboard general ---
  const allowedDashboard = ["admin", "superadmin"];
  if (to.path.startsWith("/dashboard") && !allowedDashboard.includes(role)) {
    throw createError({
      statusCode: 403,
      statusMessage: "Anda Tidak Memiliki Akses Ke Halaman Ini",
      message: "Jika ini tidak seharusnya terjadi, silahkan hubungi admin kami",
      fatal: true
    });
  }

  // --- Dashboard superadmin-only ---
  const superAdminOnly = ["/dashboard/users", "/dashboard/settings"];
  if (
    superAdminOnly.some(path => to.path.startsWith(path)) &&
    role !== "superadmin"
  ) {
    throw createError({
      statusCode: 403,
      statusMessage: "Anda Tidak Memiliki Akses Ke Halaman Ini",
      message: "Jika ini tidak seharusnya terjadi, silahkan hubungi admin kami",
      fatal: true
    });
  }

  // --- Dev docs ---
  if (to.path.startsWith("/dev/docs") && role !== "dev") {
    throw createError({
      statusCode: 403,
      statusMessage: "Anda Tidak Memiliki Akses Ke Halaman Ini",
      message: "Jika ini tidak seharusnya terjadi, silahkan hubungi admin kami",
      fatal: true
    });
  }

  // --- Client docs ---
  if (to.path.startsWith("/client/docs") && !["client", "dev"].includes(role)) {
    throw createError({
      statusCode: 403,
      statusMessage: "Anda Tidak Memiliki Akses Ke Halaman Ini",
      message: "Jika ini tidak seharusnya terjadi, silahkan hubungi admin kami",
      fatal: true
    });
  }

  // ============================
  // 4. Set layout
  // ============================
  if (to.path.startsWith("/dashboard")) {
    setPageLayout("dashboard");
  }
});