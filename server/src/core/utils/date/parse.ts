import { parseISO, formatISO } from 'date-fns'

export interface DateParser {
  from(date: string): Date
  stringify(date: Date): string
}

export function instantiateDateParser(): DateParser {
  return {
    from(date) {
      return parseISO(date)
    },

    stringify(date) {
      return formatISO(date)
    }
  }
}
