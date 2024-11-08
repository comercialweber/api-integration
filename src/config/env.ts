import z from 'zod'

const envSchema = z.object({
  NODE_ENV: z.string().default('development'),
  PORT: z.string().optional().default('3000'),
  RABBITMQ_URI: z.string().url(),
  RABBITMQ_DEFAULT_EXCHANGE: z.string().optional(),
  INTEGRATION_EXPORT_QUEUE: z.string(),
  NOTIFICATION_WHATSAPP_QUEUE: z.string(),
  NOTIFICATION_EMAIL_QUEUE: z.string(),
  WHATSAPP_PHONE_NUMBER: z.string()
})

export const env = envSchema.parse(process.env)
