import type { IIdProvider } from '../IIdProvider'
import { createId } from '@paralleldrive/cuid2'

export class Cuid2Provider implements IIdProvider {
  generate(): string {
    const id = createId()

    return id
  }
}
