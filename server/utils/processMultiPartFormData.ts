export default (formData: any[]): Record<string, any> => {
  const result: Record<string, any> = {};

  for (const item of formData) {
    if (!item.name) continue;

    if (item.filename) {
      // File upload
      result[item.name] = {
        filename: item.filename,
        type: item.type,
        data: item.data,
        size: item.data.length,
      };
    } else {
      // Text field
      const textValue = item.data.toString("utf-8");

      // Handle empty values
      if (
        textValue === "" ||
        textValue === "null" ||
        textValue === "undefined"
      ) {
        result[item.name] = null;
        continue;
      }

      // Try to parse JSON (for arrays/objects)
      try {
        const parsed = JSON.parse(textValue);
        result[item.name] = parsed;
      } catch {
        // Plain text
        result[item.name] = textValue;
      }
    }
  }

  return result;
};