import { resendAdapter } from '@payloadcms/email-resend'
import type { EmailAdapter } from 'payload'

export interface EmailConfig {
  apiKey?: string
  defaultFromAddress: string
  defaultFromName: string
}

/**
 * Creates a configured Resend email adapter for Payload CMS.
 * It expects the RESEND_API_KEY environment variable to be set in the app using it.
 */
export const createEmailAdapter = (config: EmailConfig): EmailAdapter => {
  const apiKey = config.apiKey || process.env.RESEND_API_KEY

  if (!apiKey) {
    console.warn('RESEND_API_KEY is not defined. Email sending will be disabled.')
    // Returning a dummy adapter or similar might be needed if Payload requires one,
    // but usually, we want to know it's missing.
  }

  return resendAdapter({
    apiKey: apiKey || '',
    defaultFromAddress: config.defaultFromAddress,
    defaultFromName: config.defaultFromName,
  })
}
