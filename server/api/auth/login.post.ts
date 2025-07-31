import { eq } from "drizzle-orm";
import { z } from "zod";
import { users } from "~/server/db/schema";
import { H3Error } from "h3"

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default defineEventHandler(async event => {
  try {
    const { email, password } = await readValidatedBody(
      event,
      bodySchema.parse
    );

    // Cek email di database
    const verifiedEmail = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (!verifiedEmail.length) {
      throw createError({
        statusCode: 401,
        statusMessage: "Email atau Password anda salah",
      });
    }

    // Verifikasi password
    const verifiedPass = await verifyPassword(
      verifiedEmail[0].password,
      password
    );

    if (!verifiedPass) {
      throw createError({
        statusCode: 401,
        statusMessage: "Email atau Password anda salah",
      });
    }

    // Cek apakah akun aktif
    if (!verifiedEmail[0].isActive) {
      throw createError({
        statusCode: 403,
        statusMessage:
          "Akun anda tidak aktif, jika ini tidak seharusnya terjadi, hubungi admin melalui kontak form agar segera kami perbaiki",
      });
    }

    // Set session user
    await setUserSession(event, {
      user: {
        name: verifiedEmail[0].name,
        email: verifiedEmail[0].email,
        role: verifiedEmail[0].role,
      },
    });

    return { message: "Login berhasil" };
  } catch (error) {
    console.error("Login error:", error);

    // Jika error sudah berupa createError, lempar ulang
    if (error instanceof H3Error) {
      throw error;
    }

    // Default error 500
    throw createError({
      statusCode: 500,
      statusMessage: "Terjadi kesalahan pada server",
      message: (error as Error).message,
      cause: error,
    });
  }
});