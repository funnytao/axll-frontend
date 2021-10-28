
/**
 * Function that turns a string with words separated by empty space
 * to a long camel case string, such as 'this is an example' => 'thisIsAnExample'
 * @param word string
 * @returns {string} string in camel case
 */
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

/**
 * Function that validates the email format
 * @param email string
 * @returns {boolean} the email is valid or not
 */
const validateEmail = (email: string) => {
  const emailRegExp = new RegExp(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/);
  return emailRegExp.test(email);
}

export { camelCase, validateEmail };