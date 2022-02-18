import { RequestInitTimed } from '../Models/RequestInit.model';
import { Environment } from '../Configs/Environment';
export function buildHashUrl(path: string) {
  console.log(window.location)
  return `${window.location.host}${window.location.pathname}#${path}`;
}

export function copyTextToClipboard(text: string) {
  var textArea = document.createElement("textarea");
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Fallback: Copying text command was ' + msg);
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
  }

  document.body.removeChild(textArea);
}

export function getCurrentPath() {
  return window.location.href.substring(0, window.location.href.lastIndexOf("/") + 1);
}

export function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export async function fetchWithTimeout(endpoint: string, options: RequestInitTimed, retries = 0): Promise<Response> {
  const { timeout = 3000 } = options;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  let response: Response;
  try {
    response = await fetch(endpoint, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(id);
  } catch (err: any) {
    if (retries < Environment.MAX_FETCH_RETRIES && (err instanceof DOMException) && err.message?.toString().includes("The operation was aborted")) {
      console.log('fetchWithTimeout', `timeout when fetching ${endpoint}, retrying... (${retries+1}/${Environment.MAX_FETCH_RETRIES})`)
      return fetchWithTimeout(endpoint, { ...options, timeout: timeout * 2 }, retries+1);
    }

    throw err;
  }

  return response;
}