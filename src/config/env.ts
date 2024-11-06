import z from 'zod'

const envSchema = z.object({
  NODE_ENV: z.string().default('development'),
  PORT: z.string().optional().default('3000'),
  RABBITMQ_URI: z.string().url(),
  RABBITMQ_DEFAULT_EXCHANGE: z.string().optional(),
  RABBITMQ_DEFAULT_EXCHANGE_TYPE: z.string().optional(),
  INTEGRATION_EXPORT_RUN_QUEUE: z.string(),
  INTEGRATION_EXPORT_NOTIFICATION_START_QUEUE: z.string(),
  INTEGRATION_EXPORT_NOTIFICATION_FINISH_QUEUE: z.string(),
})

export const env = envSchema.parse(process.env)
