import { camelCase, validateEmail } from "../HelperFunctions";

describe('(Function) camelCase', () => {
  it('should convert string `this is a word` to `thisIsAWord`', () => {
    expect(camelCase('this is a word')).toEqual('thisIsAWord');
  });
});

describe('(Function) validateEmail', () => {
  it('should return true if the email format is correct', () => {
    expect(validateEmail('itshouldwork@abc.cn')).toBeTruthy();
  });

  it('should return false if the email format is incorrent', () => {
    expect(validateEmail('iamnotanemail@')).toBeFalsy();
  });
});