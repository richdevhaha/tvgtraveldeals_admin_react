export const userNameRegex = /^(?=.{6,20}$)(?:[a-zA-Z\d]+(?:(?:\.|-|_)[a-zA-Z\d])*)+$/;

export const getDuration = (number: number) => {
  const date = new Date(0);
  date.setSeconds(number);
  return date.toISOString().substr(number > 3600 ? 11 : 14, number > 3600 ? 8 : 5);
};

export const nArray = (length: number) => Array.from({ length }, (v, k) => k + 1);

export const formatCount = (n: number) => {
  if (n < 1e3) {
    return n;
  }
  if (n >= 1e3 && n < 1e6) {
    return `${+(n / 1e3).toFixed(1)}K`;
  }
  if (n >= 1e6 && n < 1e9) {
    return `${+(n / 1e6).toFixed(1)}M`;
  }
  if (n >= 1e9 && n < 1e12) {
    return `${+(n / 1e9).toFixed(1)}B`;
  }
  if (n >= 1e12) {
    return `${+(n / 1e12).toFixed(1)}T`;
  }
  return 0;
};

export const urlify = (text: string) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const mentionRegex = /\B@\w+/g;
  const tagRegex = /\B#\w+/g;
  const mentionReplaced = text.replace(mentionRegex, (mention: string) => `<span class="mention">${mention}</span>`);
  const tagReplaced = mentionReplaced.replace(tagRegex, (mention: string) => `<span class="mention">${mention}</span>`);
  const final = tagReplaced.replace(
    urlRegex,
    (url: string) =>
      `<a href="${url}" target="_blank" class="external-link" rel="noopener noreferrer nofollow">${url}</a>`
  );
  return final;
};

export const parseUrls = (text: string) => {
  const urls: string[] = text.match(/\bhttps?::\/\/\S+/gi) || text.match(/\bhttps?:\/\/\S+/gi) || [];
  return urls;
};

export const enumFromStringValue = <T>(enm: { [s: string]: T }, value: string): T | undefined =>
  (Object.values(enm) as unknown as string[]).includes(value) ? (value as unknown as T) : undefined;

export const formatNumber = (value?: number) => (value || 0).toLocaleString("en-US");
