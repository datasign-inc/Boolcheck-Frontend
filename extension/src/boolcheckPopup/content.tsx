import { CSSProperties } from 'react';
import { openBoolcheckApp } from './iframeMessage.ts';
import { useUrl } from './urlContext.ts';

const ReportMessageTrueStyle: CSSProperties = {
  border: '1px solid #259D63',
  borderRadius: '10px',
  marginTop: '3%',
  marginLeft: '3%',
  marginRight: '3%',
  textAlign: 'center',
  color: '#259D63',
  backgroundColor: '#f8fff0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '45%',
  cursor: 'pointer',
};

export const ReportMessageTrue = (props: { count: number }) => {
  const url = useUrl();
  return (
    <div
      onClick={() => {
        openBoolcheckApp(url);
      }}
    >
      <div style={ReportMessageTrueStyle}>
        <div>
          <div>真の報告が</div>
          <div>
            <span style={{ fontWeight: 'bold' }}>{props.count}件</span>あります
          </div>
        </div>
      </div>
    </div>
  );
};

export const ReportMessageFalse = (props: { count: number }) => {
  const url = useUrl();
  return (
    <div
      onClick={() => {
        openBoolcheckApp(url);
      }}
    >
      <div
        style={{
          ...ReportMessageTrueStyle,
          border: '1px solid #EB1F1C',
          color: '#EB1F1C',
          backgroundColor: '#FFF0F0',
        }}
      >
        <div>
          <div>偽の報告が</div>
          <div>
            <span style={{ fontWeight: 'bold' }}>{props.count}件</span>あります
          </div>
        </div>
      </div>
    </div>
  );
};

export const ReportToBoolcheck = () => {
  const url = useUrl();
  return (
    <div style={{ margin: '3%', marginTop: '6%' }}>
      <a
        onClick={() => {
          openBoolcheckApp(url);
        }}
        style={{
          borderRadius: '10px',
          padding: '10px 0',
          display: 'block',
          margin: 'auto',
          background: 'black',
          color: 'white',
          textDecoration: 'none',
          textAlign: 'center',
          cursor: 'pointer',
        }}
      >
        真偽の報告をする
      </a>
    </div>
  );
};
