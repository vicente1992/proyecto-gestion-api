
const URL_AVATAR = 'https://ui-avatars.com/api/?name=';

const avatarUrl = (names = '') => {
  const name = names.replace(/\s/g, '')
  return `${URL_AVATAR}${name}&background=random`;
}

module.exports = {
  avatarUrl
}
