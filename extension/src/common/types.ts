export type BrowserActions = 'openBoolcheckApp' | 'toggleBoolcheckPopup' | 'whetherItShouldPopup';
export type IframeActions = 'closeBoolcheckPopup' | 'openBoolcheckApp';

export interface BrowserMessage {
  action: BrowserActions;
  parameter: { [x: string]: unknown };
}

export interface IframeMessage {
  action: IframeActions;
  parameter: { [x: string]: unknown };
}
