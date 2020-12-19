import get from 'lodash.get';

// own
import config from '../utils/config';
import { CustomError } from '../utils/utilities';

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
    const result = await res.json();
    if (result.error) {
      throw new CustomError(get(result,'message[0].messages[0].message'));
    }
    return result;
  } catch (err) {
    if (err instanceof CustomError) {
      throw err;
    } else {
      throw Error('login failed due to connection problems.');
    }
  }
};
