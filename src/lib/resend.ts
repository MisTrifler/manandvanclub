import { Resend } from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder');

// Single source of truth for all outgoing email identity.
// Every resend.emails.send() call must use these values.
export const SENDER_ADDRESS = 'Man and Van Club <support@manandvanclub.co.uk>';
export const REPLY_TO_ADDRESS = 'support@manandvanclub.co.uk';

export const SITE_URL = (process.env.NEXT_PUBLIC_URL || "https://www.manandvanclub.co.uk").replace(/\/$/, "");
