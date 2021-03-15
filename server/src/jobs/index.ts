export interface Job<T = any> {
  key: string
  handler(data: T): Promise<void>
}
