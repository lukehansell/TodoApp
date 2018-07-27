export default function() {
  const objects = Array.from(arguments)
  const firstKeys = Object.keys(objects[0])
  const filteredObjects = objects.map(object => {
    return Object.keys(object)
      .filter(key => firstKeys.includes(key))
      .reduce((obj, key) => {
        obj[key] = object[key]
        return obj
      }, {})
  })
  return Object.assign({}, ...filteredObjects)
}
