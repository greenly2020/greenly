const getUsername = (str: string) => {
  return str
    .split(' ')
    .map((item) => item.toLowerCase())
    .join('');
};

const formatProfileLink = (link: string) => {
  const regex = /^[a-zA-Z0-9\-_]+$/;
  if (regex.test(link)) {
    return `/user/${link}`;
  } else {
    return link;
  }
};

export { getUsername, formatProfileLink };
