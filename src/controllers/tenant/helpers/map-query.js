const mapQuery = (search = '') => {
  const regex = new RegExp(search, 'i');

  return [
    { botName: regex },
    { manager: regex },
    { company: regex },
  ]
}

module.exports = { mapQuery };