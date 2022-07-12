
export const generateId = () => {
  return Math.floor(Math.random() * 100000 + Math.random() * 20000 + Math.random() * 5000)
}

export const deepClone = (origin:any) => {
  if (origin === undefined) {
    return undefined
  }
  return JSON.parse(JSON.stringify(origin))
}
