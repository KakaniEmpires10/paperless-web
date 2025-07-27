import { eq } from "drizzle-orm";
import { z } from "zod";
import { users } from "~/server/db/schema";

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default defineEventHandler(async event => {
  const { email, password } = await readValidatedBody(event, bodySchema.parse);

  const verifiedEmail = await db.select().from(users).where(eq(users.email, email))
  
  if(!verifiedEmail[0].isActive){
    throw createError({
      statusCode: 403,
      statusMessage:
        "Akun anda tidak aktif, jika ini tidak seharusnya terjadi, hubungi admin melalui kontak form agar segera kami perbaiki",
    });
  }

  const verifiedPass = await verifyPassword(verifiedEmail[0].password, password)
  
  if (!!verifiedEmail && verifiedPass) {
    // set the user session in the cookie
    // this server util is auto-imported by the auth-utils module
    await setUserSession(event, {
      user: {
        name: verifiedEmail[0].name,
        email: verifiedEmail[0].email,
        role: verifiedEmail[0].role,
      },
    });
    return {};
  }
  throw createError({
    statusCode: 401,
    statusMessage: "Email atau Password anda salah",
  });
});
