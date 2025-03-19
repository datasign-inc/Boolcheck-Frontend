import browser from 'webextension-polyfill';

export const getCurrentUrl = async () => {
  try {
    const queryOptions = { active: true, currentWindow: true };
    const tabs = await browser.tabs.query(queryOptions);
    if (tabs.length > 0) {
      const tab = tabs[0];
      return tab.url;
    }
  } catch {
    console.log(`An error occurred while querying current url`);
  }
  return undefined;
};
