import { IframeMessage } from '../common/types.ts';

export const popupCloseHandler = () => {
  const message: IframeMessage = {
    action: 'closeBoolcheckPopup',
    parameter: {},
  };
  window.parent.postMessage(JSON.stringify(message), '*');
};

export const openBoolcheckApp = (url: string | undefined) => {
  const message: IframeMessage = {
    action: 'openBoolcheckApp',
    parameter: {
      url: url,
    },
  };
  window.parent.postMessage(JSON.stringify(message), '*');
};
