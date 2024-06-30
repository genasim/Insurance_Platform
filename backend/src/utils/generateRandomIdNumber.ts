const generateRandomIdNumber = (digits: number): string => {
  return Math.floor(
    Math.pow(10, digits) + Math.random() * (Math.pow(10, digits) * 9 - 1)
  ).toString().substring(0, digits);
};

export default generateRandomIdNumber;
