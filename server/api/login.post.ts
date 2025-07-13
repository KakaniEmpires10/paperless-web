import { z } from "zod";

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default defineEventHandler(async event => {
  const { email, password } = await readValidatedBody(event, bodySchema.parse);

  if (email === "admin@gmail.com" && password === "admin1234") {
    // set the user session in the cookie
    // this server util is auto-imported by the auth-utils module
    await setUserSession(event, {
      user: {
        name: "John Doe",
        email: "admin@gmail.com",
        role: "admin"
      },
    });
    return {};
  }
  throw createError({
    statusCode: 401,
    message: "Email atau Password anda salah",
  });
});
