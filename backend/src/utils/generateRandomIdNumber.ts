const generateRandomIdNumber = (digits: number): number => {
  return Math.floor(
    Math.pow(10, digits) + Math.random() * (Math.pow(10, digits) * 9 - 1)
  );
};

export default generateRandomIdNumber;
