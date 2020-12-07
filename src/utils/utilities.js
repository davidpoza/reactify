export function modulus(a, n) {
  return ((a % n ) + n ) % n;
}

export function pad(num, size) {
  num = num.toString();
  while (num.length < size) num = "0" + num;
  return num;
}

/**
 * @param {number} seconds
 * @returns {string} Returns string looking like 05:33
 */
export function secondsToShortString(seconds) {
  const hour = pad(Math.trunc(seconds / 3600), 2);
  const min = pad(Math.trunc((seconds % 3600) / 60), 2);
  const sec = pad(seconds % 60, 2);
  if (hour === 0) {
    return (`${min}:${sec}`);
  }
  return (`${hour}:${min}:${sec}`);
}

/**
 * @param {number} seconds
 * @returns {string} Returns string looking like 3 hr 40 min or 43 min 28 sec
 */
export function secondsToLongString(seconds) {
  const hour = Math.trunc(seconds / 3600);
  const min = Math.trunc((seconds % 3600) / 60);
  const sec = seconds % 60;
  if (hour === 0) {
    return (`${min} min ${sec} seg`);
  }
  return (`${hour} hr ${min} min`);
}
