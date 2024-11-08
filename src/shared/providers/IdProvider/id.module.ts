import { Global, Module } from '@nestjs/common';
import { Cuid2Provider } from './implementations/Cuid2Provider';

@Global()
@Module({
  imports: [],
  providers: [
    {
      provide: 'IdProvider',
      useClass: Cuid2Provider,
    },
  ],
  exports: ['IdProvider'],
})
export class IdModule { }