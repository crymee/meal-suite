export abstract class Model {
  id: string

  protected constructor (state: Record<string, any>) {
    try {
      Object.assign(this, state)
    } catch (e) {
      console.error('Something wrong when initialize ' + this.getModel())
    }
  }

  abstract getModel (): string
}
