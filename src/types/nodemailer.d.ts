declare module 'nodemailer' {
    import { Transporter, TransportOptions } from 'nodemailer'; // Import TransportOptions
  
    // Use TransportOptions instead of any
    export function createTransport(options: TransportOptions): Transporter;
  
    export { Transporter };
  }
  