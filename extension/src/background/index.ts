import browser from 'webextension-polyfill';
import { BrowserMessage } from '../common/types.ts';
import { getCurrentUrl } from '../common/util.ts';
import { fetchUrlByUrl } from '../../../src/api/client.ts';

browser.action.onClicked.addListener(async (tab) => {
  if (tab.id) {
    try {
      const message: BrowserMessage = { action: 'toggleBoolcheckPopup', parameter: {} };
      await browser.tabs.sendMessage(tab.id, message);
    } catch (error) {
      console.log(`exception while sendMessage : ${error}`);
    }
  }
});

browser.runtime.onMessage.addListener(async (message, _sender, _sendResponse) => {
  try {
    const mes = message as BrowserMessage;
    switch (mes.action) {
      case 'openBoolcheckApp':
        {
          const appUrl = import.meta.env.VITE_APP_URL || 'https://app.develop.boolcheck.com';
          const url = mes.parameter.url as string | undefined;
          if (url === undefined) {
            browser.tabs.create({ url: appUrl });
          } else {
            const urlToOpen = `${appUrl}/search_result/${encodeURIComponent(url)}`;
            browser.tabs.create({ url: urlToOpen });
          }
        }
        break;
      case 'whetherItShouldPopup': {
        const currentUrl = await getCurrentUrl();
        const showPopupMessage = {
          action: 'whetherItShouldPopup',
          parameter: {
            result: true,
            checkTarget: currentUrl,
          },
        } as BrowserMessage;
        const hideMessage = {
          action: 'whetherItShouldPopup',
          parameter: {
            result: false,
            checkTarget: currentUrl,
          },
        } as BrowserMessage;
        if (!currentUrl) {
          console.log(`boolcheck extension backend: Unable to get current URL`);
          return hideMessage;
        }
        const countResult = await fetchUrlByUrl(currentUrl);
        if (!countResult.isSuccess) {
          console.log(`boolcheck extension backend: Unable to get count info for ${currentUrl}`);
          return hideMessage;
        }
        const countInfo = countResult.value;
        if (countInfo.verifiedFalseCount > 0 || countInfo.verifiedTrueCount > 0) {
          return showPopupMessage;
        }
        return hideMessage;
      }
      default:
        break;
    }
  } catch {
    console.log(`An error occurred while processing the message : ${message}`);
  }
  return undefined;
});
