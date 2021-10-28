const camelCase = (word: string) =>
  word.split(' ')
    .map((s, idx) => {
      let newWord = s.toLowerCase();
      if (idx === 0) {
        return newWord;
      }
      return newWord[0].toUpperCase() + newWord.substring(1);
    })
    .join('');

const validateEmail = (email: string) => {
  const emailRegExp = new RegExp(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/);
  return emailRegExp.test(email);
}

export { camelCase, validateEmail };