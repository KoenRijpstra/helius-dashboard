/** Returns an `URL` object */
export default function parseUrl(url?: string | URL): URL {
  const defaultUrl = new URL("http://localhost:3000");

  if (url && !url.toString().startsWith("http")) {
    url = `https://${url}`;
  }

  return new URL(url ?? defaultUrl);
}
