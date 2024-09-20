declare module 'jsonwebtoken' {
    export interface SignOptions {
      algorithm?: string;
      expiresIn?: string | number;
      // Add any other options you are using
    }
  
    export interface VerifyOptions {
      algorithms?: string[];
      // Add any other options you are using
    }
  
    export function sign(payload: string | object | Buffer, secret: string | Buffer, options?: SignOptions): string;
    export function verify(token: string, secret: string | Buffer, options?: VerifyOptions): string | object;
    export function decode(token: string, options?: { json: boolean }): string | object | null;
  }
  