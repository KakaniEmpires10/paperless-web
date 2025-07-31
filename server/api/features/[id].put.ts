import { eq } from "drizzle-orm";
import { features } from "~/server/db/schema";

export default defineEventHandler(async event => {
  const session = await requireUserSession(event);

  const id = getRouterParam(event, "id");
  const body = await readBody(event);

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "ID is required",
    });
  }

  if (!body) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Request body is required",
    });
  }

  try {
    await db
      .update(features)
      .set({
        title: body.title,
        category: body.category,
        icon: body.icon,
        shortDescription: body.excerpt,
        longDescription: body.description,
        featuresList: body.featureList,
        isActive: body.isActive,
        isFeatured: body.isFeatured,
      })
      .where(eq(features.id, id));

    return { message: "Berhasil Memperbaharui Fitur" };
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 500,
      statusMessage: "Gagal Memperbaharui Fitur",
      message: (error as Error).message,
      cause: error,
    });
  }
});
