import { FrameConfigType } from '../types';

/**
 * FRAME SEQUENCE CONFIGURATION
 * Simply update `firstFrameUrl` and `totalFrames` if desired.
 * The system handles raw GitHub transformation, 2-digit index derivation,
 * progressive preloading, canvas caching, and scroll synchronization automatically.
 */
export const FRAME_CONFIG: FrameConfigType = {
  firstFrameUrl: 'https://github.com/jachinbakhtsingh/phone-image/blob/main/frame_00_delay-0.1s.webp',
  totalFrames: 80, // 80 frames (frame_00 to frame_79) confirmed in repository
  filenamePattern: 'frame_{index}_delay-0.1s.webp',
};

/**
 * Transforms standard GitHub web URLs (with /blob/ or /tree/) to direct raw content URLs.
 * Example:
 * https://github.com/owner/repo/blob/branch/path/file.webp
 * -> https://raw.githubusercontent.com/owner/repo/branch/path/file.webp
 */
export function convertToRawUrl(url: string): string {
  if (!url) return '';
  if (url.includes('raw.githubusercontent.com')) return url;

  // Handle github.com/.../blob/...
  const githubBlobRegex = /^https?:\/\/github\.com\/([^/]+)\/([^/]+)\/blob\/([^/]+)\/(.+)$/;
  const match = url.match(githubBlobRegex);
  if (match) {
    const [, user, repo, branch, rest] = match;
    return `https://raw.githubusercontent.com/${user}/${repo}/${branch}/${rest}`;
  }

  // Handle github.com/.../raw/...
  const githubRawRegex = /^https?:\/\/github\.com\/([^/]+)\/([^/]+)\/raw\/([^/]+)\/(.+)$/;
  const rawMatch = url.match(githubRawRegex);
  if (rawMatch) {
    const [, user, repo, branch, rest] = rawMatch;
    return `https://raw.githubusercontent.com/${user}/${repo}/${branch}/${rest}`;
  }

  return url;
}

/**
 * Derives a specific frame URL from the base URL and index.
 * Automatically formats single-digit indices to 2-digit numbers: '00', '01', ... '09', '10'.
 */
export function getFrameUrl(
  index: number,
  config: FrameConfigType = FRAME_CONFIG
): string {
  const rawBaseUrl = convertToRawUrl(config.firstFrameUrl);
  const twoDigitIndex = String(index).padStart(2, '0');

  // Match existing frame_XX pattern in the base URL (handles dots in delay parameter like _delay-0.1s)
  const framePatternMatch = rawBaseUrl.match(/frame_\d+(_delay-[^/\\]+)?\.(webp|png|jpg|jpeg)/i);
  if (framePatternMatch) {
    const originalFilename = framePatternMatch[0];
    const delayPart = framePatternMatch[1] || '';
    const ext = framePatternMatch[2];
    const newFilename = `frame_${twoDigitIndex}${delayPart}.${ext}`;
    return rawBaseUrl.replace(originalFilename, newFilename);
  }

  // Fallback if custom pattern
  const baseUrlDir = rawBaseUrl.substring(0, rawBaseUrl.lastIndexOf('/') + 1);
  const targetFilename = config.filenamePattern.replace('{index}', twoDigitIndex);
  return `${baseUrlDir}${targetFilename}`;
}

/**
 * Pre-computes the array of all frame URLs for rapid preloading and caching.
 */
export function getAllFrameUrls(config: FrameConfigType = FRAME_CONFIG): string[] {
  const urls: string[] = [];
  for (let i = 0; i < config.totalFrames; i++) {
    urls.push(getFrameUrl(i, config));
  }
  return urls;
}
