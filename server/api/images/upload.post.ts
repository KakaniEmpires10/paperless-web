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

  const uploadResult = await uploadImage(processedData.file, {
    uploadDir,
    maxSize: query.maxSize ? Number(query.maxSize) : undefined,
  });

  if (!uploadResult.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Upload Error",
      message: uploadResult.error || "Upload failed",
    });
  }

  return {
    success: true,
    data: uploadResult,
  };
});
