/**
 * Safe URL helper utilities for store links
 */
export function getDomainFromUrl(urlStr: string, fallback = 'Official Store'): string {
  if (!urlStr || typeof urlStr !== 'string') return fallback;
  try {
    const parsed = new URL(urlStr.startsWith('http') ? urlStr : `https://${urlStr}`);
    return parsed.hostname.replace(/^www\./, '');
  } catch {
    return fallback;
  }
}
