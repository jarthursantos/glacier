import { parseISO, formatISO } from 'date-fns'
import { DateTime } from 'neo4j-driver'

export interface DateParser {
  from(date: string): Date
  fromDateTime(date: DateTime): Date
  stringify(date: Date): string
}

export function instantiateDateParser(): DateParser {
  return {
    from(date) {
      return parseISO(date)
    },

    fromDateTime({ year, month, day, hour, minute, second }) {
      return new Date(
        year.toInt(),
        month.toInt(),
        day.toInt(),
        hour.toInt(),
        minute.toInt(),
        second.toInt()
      )
    },

    stringify(date) {
      return formatISO(date)
    }
  }
}
