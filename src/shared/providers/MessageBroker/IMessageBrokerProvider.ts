import { PublishMessageDTO } from "src/shared/dtos/PublishMessageDTO";

export interface IMessageBrokerProvider {
  publishToQueue({ queue, payload }: PublishMessageDTO): Promise<void>;
  consumeFromQueue(queue: string, callback: (message: any) => void): void;
}