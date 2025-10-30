//import * as React from "react";

import { LiveChatWidget } from "@microsoft/omnichannel-chat-widget";
import { OmnichannelChatSDK } from "@microsoft/omnichannel-chat-sdk";
import ReactDOM from "react-dom";

//Below version numbers will help us to troubleshoot issues with specific package
import { version as chatSdkVersion } from "@microsoft/omnichannel-chat-sdk/package.json";
import { version as chatWidgetVersion } from "@microsoft/omnichannel-chat-widget/package.json";
import { version as chatComponentVersion } from "@microsoft/omnichannel-chat-components/package.json";

const render = async () => {
    const omnichannelConfig = {
        orgId: "00000000-0000-0000-0000-000000000000", // dummy config
        orgUrl: "https://www.org-url.com", // dummy config
        widgetId: "00000000-0000-0000-0000-000000000000" // dummy config
    };
    const chatSDK = new OmnichannelChatSDK(omnichannelConfig);
    await chatSDK.initialize(); // mandatory
    const chatConfig = await chatSDK.getLiveChatConfig();
    const liveChatWidgetProps = {
        styleProps: {
            generalStyles: {
                width: "700px",
                height: "800px"
            }
        },
        headerProps: {
            controlProps: {
                hideMinimizeButton: true
            }
        },
        chatSDK: chatSDK, // mandatory
        chatConfig: chatConfig, // mandatory
        telemetryConfig: {
          telemetryDisabled: true,     // optional: disable in dev
          disableConsoleLog: true,     // optional: keep console clean
          chatWidgetVersion,
          chatComponentVersion,
          OCChatSDKVersion: chatSdkVersion
        }
    };

    ReactDOM.render(
        <LiveChatWidget {...liveChatWidgetProps}/>,
        document.getElementById("my-container")
    );
};

render();