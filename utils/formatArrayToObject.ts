export default (arr: string[] | undefined): { value: string }[] => {
  if (!arr || arr.length === 0) return [{ value: "" }];
  return arr.map(item => ({ value: item }));
};