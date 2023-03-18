/** Very basic (and incomplete) fetch type declaration */

interface RequestInit {
  /** A BodyInit object or null to set request's body. */
  body?: string;
  /** A Headers object, an object literal, or an array of two-item arrays to set request's headers. */
  headers?: Record<string, string>;
  /** A string to set request's method. */
  method?: string;
}
interface ResponseInit {
  headers?: Record<string, string>;
  status?: number;
  statusText?: string;
}

interface Body {
  readonly bodyUsed: boolean;
  arrayBuffer(): Promise<ArrayBuffer>;
  blob(): Promise<Blob>;
  json(): Promise<unknown>;
  text(): Promise<string>;
}

interface Response extends Body {
  readonly headers: Record<string, string>;
  readonly ok: boolean;
  readonly redirected: boolean;
  readonly status: number;
  readonly statusText: string;
  readonly url: string;
  clone(): Response;
}

declare function fetch(input: string, init?: RequestInit): Promise<Response>;
