export default defineEventHandler(async event => {
  const body = await readBody(event);

  if (!body.imagePath) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Image path is required",
    });
  }

  const deleteResult = await deleteImage(body.imagePath);

  if (!deleteResult.success) {
    throw createError({
      statusCode: 500,
      statusMessage: "Delete Error",
      message: deleteResult.error || "Delete failed",
    });
  }

  return {
    success: true,
    message: "Image deleted successfully",
  };
});