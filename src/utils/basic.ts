/**
 * 存储localStorage
 */
export const setLocalStore = (name: string, content: string) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.localStorage.setItem(name, content)
}

/**
 * 获取localStorage
 */
export const getLocalStore = (name: string) => {
  if (!name) return
  let value = window.localStorage.getItem(name)
  if (value !== null) {
    try {
      value = JSON.parse(value)
    } catch (e) {
      value = ''
    }
  }
  return value
}

/**
 * 删除localStorage
 */
export const removeLocalStore = (name: string) => {
  if (!name) return
  window.localStorage.removeItem(name)
}
