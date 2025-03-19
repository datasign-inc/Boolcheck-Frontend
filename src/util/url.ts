export const isValidHttpString = (urlString: string): boolean => {
  try {
    const url = new URL(urlString);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};

export const isUrlEqual = (url1: string, url2: string): boolean => {
  const getBaseUrl = (url: string): string => {
    try {
      // URLオブジェクトを作成してパスまでの部分を取得
      const parsedUrl = new URL(url);
      const normalizedPathname = parsedUrl.pathname.replace(/\/$/, "");
      return `${parsedUrl.protocol}//${parsedUrl.host}${normalizedPathname}`;
    } catch (error) {
      throw new Error(`Invalid URL: ${url}`);
    }
  };
  try {
    return getBaseUrl(url1) === getBaseUrl(url2);
  } catch {
    return false;
  }
};

export const getDomain = (url: string): string | undefined => {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.host;
  } catch {
    return undefined;
  }
};
