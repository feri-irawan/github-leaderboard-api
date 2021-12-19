// Membuat slug
const makeSlug = (string, target, to) => {
  return string.split(target).join(to).toLowerCase()
}

// Membuat string jadi capitalize
const toCapitalize = (string) => {
  return string
    .split(' ')
    .map((str) => str.slice(0, 1).toUpperCase() + str.slice(1))
    .join(' ')
}

// Mengganti key dari string sesuai dengan key dan value dari paramter objects
const replaceKeyFromString = (stringWithKeys = '', objects) => {
  if (stringWithKeys === '') return stringWithKeys

  let newContent = ''
  for (const key in objects) {
    if (objects.hasOwnProperty(key)) {
      const value = objects[key]
      const targetKey = `{{${key}}}`

      if (newContent === '')
        newContent = stringWithKeys.replace(targetKey, value)
      else newContent = newContent.replace(targetKey, value)
    }
  }

  return newContent
}

module.exports = {
  makeSlug,
  toCapitalize,
  replaceKeyFromString,
}
