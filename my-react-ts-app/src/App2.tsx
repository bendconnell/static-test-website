import { useEffect, useState } from 'react';
//import { ILiveChatWidgetProps } from "@microsoft/omnichannel-chat-widget/lib/types/components/livechatwidget/interfaces/ILiveChatWidgetProps";
import { OmnichannelChatSDK } from '@microsoft/omnichannel-chat-sdk';
import { LiveChatWidget } from '@microsoft/omnichannel-chat-widget';
import { version as chatWidgetVersion } from '@microsoft/omnichannel-chat-widget/package.json';
import { version as chatComponentVersion } from '@microsoft/omnichannel-chat-components/package.json';
import { version as chatSdkVersion } from '@microsoft/omnichannel-chat-sdk/package.json';

import './App.css';

type ILiveChatWidgetProps = React.ComponentProps<typeof LiveChatWidget>;

function App() {
  const [liveChatWidgetProps, setLiveChatWidgetProps] = useState<ILiveChatWidgetProps>();

  useEffect(() => {
    const omnichannelChatConfig = {
      orgId: 'e3e5aa8e-fe71-f011-8589-000d3a5b5d09',
      orgUrl: 'https://m-e3e5aa8e-fe71-f011-8589-000d3a5b5d09.us.omnichannelengagementhub.com',
      widgetId: '027ffbcd-826f-4a6a-963a-4158fbe6b82c'
    };

    const init = async () => {
      const chatSDK = new OmnichannelChatSDK(omnichannelChatConfig);
      
      // init first
      await chatSDK.initialize();

      // get config
      const chatConfig = await chatSDK.getLiveChatConfig();

      const liveChatWidgetProps = {
        styleProps: {
          generalStyles: {
            bottom: "20px",
            right: "20px",
            width: "360px",
            height: "560px"
          }
        },
        headerProps: {
          styleProps: {
            generalStyleProps: {
              height: "70px"
            }
          }
        },
        chatSDK,
        chatConfig,
        telemetryConfig: {
          telemetryDisabled: true,     // optional: disable in dev
          disableConsoleLog: true,     // optional: keep console clean
          chatWidgetVersion,
          chatComponentVersion,
          OCChatSDKVersion: chatSdkVersion
        }
  
      };
      setLiveChatWidgetProps(liveChatWidgetProps);
    };

    init();
  }, []);

  return (
    <>
      <h1>Vite + Omnichannel Chat Widget</h1>
      <div>
        {liveChatWidgetProps && <LiveChatWidget {...liveChatWidgetProps} />}
      </div>
    </>
  )
}

export default App;
