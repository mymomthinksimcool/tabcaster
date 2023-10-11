export const genStr = (length = 6, type = 'numbers') => {
  const types = {
    letters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    numbers: '0123456789'
  }

  types.mixed = `${types.letters}${types.numbers}`

  let result = ''
  const characters = types[type]
  const charactersLength = characters.length
  let counter = 0

  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
    counter += 1
  }

  return result
}

export const genID = (prefix = 'id', length = 6, type = 'numbers') => {
  return `${prefix}--${genStr(length, type)}`
}

export const updateHTMLAttr = (attr, val) => {
  if (val) {
    document.documentElement.setAttribute(attr, val)
  } else {
    document.documentElement.removeAttribute(attr)
  }
}
