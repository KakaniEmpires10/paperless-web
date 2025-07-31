export default (value: number, options: { short?: boolean } = {}) => {
  const { short = false } = options;

  if (!short) {
    // Standard Indonesian Rupiah formatting
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  }

  // Short format logic
  if (value >= 1_000_000_000_000) {
    return `Rp. ${Math.floor(value / 1_000_000_000_000)}T`;
  }
  if (value >= 1_000_000_000) {
    return `Rp. ${Math.floor(value / 1_000_000_000)}M`;
  }
  if (value >= 1_000_000) {
    return `Rp. ${Math.floor(value / 1_000_000)}jt`;
  }
  if (value >= 1_000) {
    return `Rp. ${Math.floor(value / 1_000)}rb`;
  }

  return `Rp. ${value}`;
};
