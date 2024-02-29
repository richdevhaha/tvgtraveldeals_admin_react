export const capitalizeFLetter = (txt: string) => txt[0].toUpperCase() + txt.slice(1);

export const replaceSpaceToSymbol = (txt: string, symbol: string = "-", length: number = 0) => {
  if (length === 0) txt.replaceAll(" ", symbol);
  txt.replaceAll(" ", symbol).substring(0, length).trim();
};

export const hasStringWhitespace = (txt: string) => {
  const isNonWhiteSpace = /^\S*$/;
  return !isNonWhiteSpace.test(txt);
};

export const isValidPassword = (text = "") => {
  const regularExpression = /^(?=.*\d)(?=.*[@$!%*?&#%^()_+=<>,./:;])[[A-Za-z\d@@$!%*?&#%^()_+=<>,./:;]{7,}$/;
  return regularExpression.test(text);
};
