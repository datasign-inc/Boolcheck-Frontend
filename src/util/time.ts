export const getStartDateTime = (n: number): string => {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() - n);
  return date.toISOString().slice(0, -5) + "Z";
};

export const format8601TimestampToCustomFormat = (
  timestamp: string
): string | undefined => {
  try {
    const date = new Date(timestamp);

    // 日付が無効かをチェック
    if (isNaN(date.getTime())) {
      return undefined;
    }

    // ローカルタイムの年、月、日、時、分を取得
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 月は0始まりなので+1
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    // カスタム形式にフォーマット
    return `${year}.${month}.${day} ${hours}:${minutes}`;
  } catch {
    return undefined; // エラー発生時も undefined を返却
  }
};

export const formatUnixTimestampToCustomFormat = (
  unixTimestampInSeconds: number
): string | undefined => {
  try {
    // 秒単位のタイムスタンプをミリ秒単位に変換
    const date = new Date(unixTimestampInSeconds * 1000);

    // 日付が無効かをチェック
    if (isNaN(date.getTime())) {
      return undefined;
    }

    // ローカルタイムの年、月、日、時、分を取得
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 月は0始まりなので+1
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    // カスタム形式にフォーマット
    return `${year}.${month}.${day} ${hours}:${minutes}`;
  } catch {
    return undefined; // エラー発生時も undefined を返却
  }
};
