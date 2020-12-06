export function modulus(a, n) {
  return ((a % n ) + n ) % n;
}

export function pad(num, size) {
  num = num.toString();
  while (num.length < size) num = "0" + num;
  return num;
}

export function secondsToString(seconds) {
  const min = pad(Math.trunc(seconds / 60), 2);
  const sec = pad(seconds % 60, 2);
  return (`${min}:${sec}`);
}

