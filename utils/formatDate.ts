export default (isoDate: string) => {
  const date = new Date(isoDate);

  const formatted = date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  return formatted
}
