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
  const hour = Math.trunc(seconds / 3600);
  const min = Math.trunc((seconds % 3600) / 60);
  const sec = seconds % 60;
  if (hour === 0) {
    return (`${pad(min, 2)}:${pad(sec, 2)}`);
  }
  return (`${pad(hour, 2)}:${pad(min, 2)}:${pad(sec, 2)}`);
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
