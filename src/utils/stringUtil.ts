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

export const generateRandomCode = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const codeLength = 6;
  let randomCode = '';

  for (let i = 0; i < codeLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomCode += characters[randomIndex];
  }

  return randomCode;
}

export const stripHtmlTags = (html: string): string => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || "";
};

export const convertExcelDate = (serial: any) => {
  const excelEpoch = new Date(1899, 11, 30);
  const date = new Date(excelEpoch.getTime() + (serial + 1) * 24 * 60 * 60 * 1000);
  return date;
};
