import * as ReactDOM from 'react-dom/client';
import { BoolcheckPopup } from './popup.tsx';
import { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import { Result, UrlContent } from '../../../src/api/types.ts';
import { fetchUrlByUrl } from '../../../src/api/client.ts';
import { popupCloseHandler } from './iframeMessage.ts';
import { UrlContext } from './urlContext.ts';
import { getCurrentUrl } from '../common/util.ts';

const Loading = () => {
  return (
    <div
      style={{
        margin: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '90%',
      }}
    >
      <ReactLoading type="spin" width="15%" height="15%" color="#dcdcdc" />
    </div>
  );
};

const App = () => {
  const [targetUrl, setTargetUrl] = useState<string | undefined>(undefined);
  const [data, setData] = useState<Result<UrlContent, string> | undefined>(undefined);

  useEffect(() => {
    (async () => {
      const currentUrl = await getCurrentUrl();
      setTargetUrl(currentUrl);
      if (currentUrl !== undefined) {
        const countInfo = await fetchUrlByUrl(currentUrl);
        setData(countInfo);
      }
    })();
  }, []);

  if (data === undefined) {
    return <Loading />;
  }

  return (
    <UrlContext.Provider value={targetUrl}>
      {data.isSuccess && (
        <BoolcheckPopup
          closeHandler={popupCloseHandler}
          count={{
            trueCount: data.value.verifiedTrueCount,
            falseCount: data.value.verifiedFalseCount,
            elseCount: data.value.verifiedElseCount,
          }}
        />
      )}
      {!data.isSuccess && <BoolcheckPopup closeHandler={popupCloseHandler} count={undefined} />}
    </UrlContext.Provider>
  );
};

const rootElement = document.getElementById('root');
// https://blog.logrocket.com/how-to-use-typescript-with-react-18-alpha/
if (!rootElement) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
