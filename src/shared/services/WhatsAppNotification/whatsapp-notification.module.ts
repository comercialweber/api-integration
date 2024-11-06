import { Global, Module } from "@nestjs/common";
import { WhatsAppNotificationService } from "./whatsapp-notification.service";

@Global()
@Module({
  providers: [WhatsAppNotificationService],
  exports: [WhatsAppNotificationService],
})
export class WhatsAppNotificationModule { }