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
	return window.location.href.substring( 0, window.location.href.lastIndexOf( "/" ) + 1);
}

export function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min;
}