import browser from 'webextension-polyfill';
import { BrowserMessage, IframeMessage } from '../common/types.ts';

const boolcheckIframeId = 'boolcheck-popup-iframe';
const boolcheckShadowRootContainer = `${boolcheckIframeId}-container`;

browser.runtime.onMessage.addListener((request, _sender, _sendResponse) => {
  const tmp = request as BrowserMessage;
  try {
    if (tmp) {
      const { action } = tmp;
      switch (action) {
        case 'toggleBoolcheckPopup':
          toggleIframe();
          break;
        default:
          console.log(`unknown action : ${action}`);
          break;
      }
    }
  } catch {
    console.log(`An error occurred while interpreting the message from backend`);
  }
  return true;
});

window.addEventListener('message', (response) => {
  try {
    const data = JSON.parse(response.data) as IframeMessage;
    switch (data.action) {
      case 'closeBoolcheckPopup': // iframe内で閉じるボタンが押下された場合
        try {
          removePopup();
        } catch (error) {
          console.log(`An error ${error} occurred while removing iframe`);
        }
        break;
      case 'openBoolcheckApp': {
        try {
          const { url } = data.parameter;
          browser.runtime.sendMessage({ action: 'openBoolcheckApp', parameter: { url: url } });
        } catch (error) {
          console.log(`An error ${error} occurred while opening boolcheck app site`);
        }
        break;
      }
      default:
        break;
    }
  } catch (error) {
    /* eslint no-empty: ["error", { allowEmptyCatch: true }] */
  }
});

const getOrCreateShadow = () => {
  let shadowHost = document.getElementById(boolcheckShadowRootContainer);
  if (!shadowHost) {
    shadowHost = document.createElement('div');
    shadowHost.id = boolcheckShadowRootContainer;
    document.body.appendChild(shadowHost);
    shadowHost.attachShadow({ mode: 'open' });
  }
  return shadowHost.shadowRoot;
};

const injectPopup = (src: string) => {
  const extensionOrigin = `chrome-extension://${browser.runtime.id}`;
  if (!location.ancestorOrigins.contains(extensionOrigin)) {
    const ratio = window.screen.width / 1920;
    const popupWidth = Math.floor(203 * ratio);
    const popupHeight = Math.floor(132 * ratio);
    const iframe = document.createElement('iframe');
    iframe.src = browser.runtime.getURL(src);
    iframe.id = boolcheckIframeId;
    iframe.style.cssText = [
      'position:fixed;',
      'top:10px;right:10px;',
      'display:block;',
      `width:${popupWidth}px !important;`,
      `height:${popupHeight}px !important;`,
      'border:0;',
      'border-radius: 10px;',
      'box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.08), 0 4px 6px 0 rgba(50, 50, 93, 0.11);',
      'z-index:999999;',
      'background-color: white',
    ].join('');
    const shadowRoot = getOrCreateShadow();
    if (shadowRoot) {
      shadowRoot.appendChild(iframe);
    } else {
      console.log('Unable to create shadow root for extension');
    }
  }
};

const removePopup = () => {
  const extensionOrigin = `chrome-extension://${browser.runtime.id}`;
  if (!location.ancestorOrigins.contains(extensionOrigin)) {
    const container = document.getElementById(boolcheckShadowRootContainer);
    if (container) {
      container.remove();
    }
  }
};

const toggleIframe = () => {
  const isExist = document.getElementById(boolcheckShadowRootContainer);
  if (isExist) {
    removePopup();
  } else {
    injectPopup('boolcheckPopup.html');
  }
};

const sending = browser.runtime.sendMessage({
  action: 'whetherItShouldPopup',
  parameter: {},
} as BrowserMessage);
sending.then((response) => {
  console.log(`boolcheck content script: received data from backend ${JSON.stringify(response)}`);
  const validatedResponse = response as BrowserMessage; // todo: add validation process for response
  switch (validatedResponse.action) {
    case 'whetherItShouldPopup': {
      const param = validatedResponse.parameter;
      if (param.result) {
        toggleIframe();
      }
      break;
    }
    default: {
      break;
    }
  }
});
