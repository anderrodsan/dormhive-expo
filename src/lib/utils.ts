export function getCategoryCount(data: any, category: string) {
  const count = data.filter((item: any) => item.category === category).length;
  return count;
}
