export default (err: unknown, fallback = "Terjadi kesalahan 🙏") => {
  if (
    typeof err === "object" &&
    err !== null &&
    "response" in err &&
    typeof (err as any).response === "object"
  ) {
    const response = (err as any).response;
    const statusMessage = response?._data?.statusMessage;

    if (typeof statusMessage === "string") {
      return statusMessage;
    }
  }

  if (err instanceof Error) {
    return err.message;
  }

  return fallback;
};
