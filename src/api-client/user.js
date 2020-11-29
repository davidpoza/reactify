import config from '../config';

export async function login(email, password) {
  try {
    const res = await fetch(`${config.API_HOST}/auth/local`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identifier: email,
        password,
      }),
    });
    return await res.json();
  } catch {
    return -1
  }
};

export function login2() {

};