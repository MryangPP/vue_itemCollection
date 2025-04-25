export function getImgUrl(url) {
  const path = new URL(`../assets/images/${url}`, import.meta.url)
  return path.href
}
