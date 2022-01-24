export default function getPagesNumbers(count: number): number[] {
  const allPages = Math.ceil(count / 10);
  const pagesNumbers = Array.from({ length: allPages }, (v, k) => k + 1);
  return pagesNumbers;
}
