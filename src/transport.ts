import Zod from 'zod';
import { FETCH_HEADERS, TeslaApiEndpoints } from './constants.js';

interface Return<T> {
  success: boolean;
  error?: Error;
  data?: T;
}
interface SuccessReturn<T> extends Return<T> {
  success: true;
  data: T;
}
interface ErrorReturn<T> extends Return<T> {
  success: false;
  error: Error;
}
type Erroreable<T> = SuccessReturn<T> | ErrorReturn<T>;

async function get<T>(url: string, schema: Zod.Schema<T>, token: string): Promise<Erroreable<T>> {
  try {
    const res = await fetch(TeslaApiEndpoints.OWNER_API_URL + url, {
      headers: {
        ...FETCH_HEADERS,
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      return {
        success: false,
        error: new Error('Failed to get vehicle data'),
      };
    }

    const parsed = schema.safeParse(await res.json());
    if (parsed.success) {
      return {
        success: true,
        data: parsed.data,
      };
    }

    return {
      success: false,
      error: new Error('Failed to validate schema'),
    };
  } catch (error) {
    return {
      success: false,
      error: new Error(`Failed to get: ${url}`),
    };
  }
}

async function post<T>(
  url: string,
  token: string,
  schema?: Zod.Schema<T>,
  body?: Record<string, unknown>,
): Promise<Erroreable<T>> {
  try {
    const res = await fetch(TeslaApiEndpoints.OWNER_API_URL + url, {
      method: 'POST',
      headers: {
        ...FETCH_HEADERS,
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      return {
        success: false,
        error: new Error('Failed to post'),
      };
    }

    const resJson = (await res.json()) as Record<string, unknown>;
    if (!schema) {
      return {
        success: true,
        data: resJson?.result as T,
      };
    }

    const parsed = schema.safeParse(resJson);
    if (parsed.success) {
      return {
        success: true,
        data: parsed.data,
      };
    }

    return {
      success: false,
      error: new Error('Failed to parse post response schema'),
    };
  } catch {
    return {
      success: false,
      error: new Error(`Failed to post: ${url}`),
    };
  }
}

const transport = {
  get,
  post,
};

export default transport;
