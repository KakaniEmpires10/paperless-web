export default defineEventHandler(async event => {
  const formData = await readMultipartFormData(event);

  if (!formData) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "No file provided",
    });
  }

  const processedData = processMultiPartFormData(formData);
  const query = getQuery(event);

  // Get upload directory from query params or use default
  const uploadDir = query.dir ? (query.dir as string) : undefined;

  if (!processedData.file || !processedData.file.filename) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "No valid file found",
    });
  }

  if (!processedData.oldImagePath) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Old image path is required",
    });
  }

  const replaceResult = await replaceImage(
    processedData.file,
    processedData.oldImagePath, {
      uploadDir
    }
  );

  if (!replaceResult.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Replace Error",
      message: replaceResult.error || "Replace failed",
    });
  }

  return {
    success: true,
    data: replaceResult,
  };
});