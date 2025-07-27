export default (obj: Record<string, any>): FormData => {
  const fd = new FormData();

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      // Good practice to check hasOwnProperty
      const value = obj[key];

      if (value instanceof File) {
        fd.append(key, value);
      } else if (value === null || typeof value === "undefined") {
        // Handle null or undefined explicitly if your backend expects an empty string or nothing
        fd.append(key, "");
      } else if (
        Array.isArray(value) ||
        (typeof value === "object" && value !== null)
      ) {
        // If it's an array or a non-null object, stringify it to JSON
        fd.append(key, JSON.stringify(value));
      } else {
        // For primitives (string, number, boolean), convert to string
        fd.append(key, String(value));
      }
    }
  }
  return fd;
};
