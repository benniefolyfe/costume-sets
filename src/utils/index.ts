export function findKey(obj: any, key: string): any {
    for (const prop in obj) {
      if (prop === key) {
        return obj[prop]
      } else if (typeof obj[prop] === 'object') {
        const result = findKey(obj[prop], key)
        if (result !== undefined) {
          return result
        }
      }
    }
  }