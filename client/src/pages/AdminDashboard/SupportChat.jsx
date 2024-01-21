import React, { useState, useEffect } from 'react';
import { ChannelList, Chat, Channel, ChannelHeader, Thread, ChannelPreviewMessenger, Window, MessageInput, MessageList } from 'stream-chat-react';
import { StreamChat } from 'stream-chat';
import { vendorStreamToken } from '../../http/index'
import 'stream-chat-react/dist/css/index.css'

const apiKey = 'wk34druzbujm';


const SupportChat = () => {
    const [client, setClient] = useState(null)
    const [streamChat, setStreamChat] = useState(null)
    const [userToken, setUserToken] = useState(null)
    const [showChat, setShowChat] = useState(false)
    const [streamChannel, setStreamChannel] = useState(null)
    const chatClient = new StreamChat(apiKey);


    useEffect(() => {
        const init = async () => {
            const token = await vendorStreamToken();
            setUserToken(token.data.data.token);
            setClient(token.data.data.user.users[0]);

            const connectPromise = chatClient
                .connectUser(
                    {
                        id: token.data.data.user.users[Object.keys(token.data.data.user.users)[0]].id,
                        name: token.data.data.user.users[Object.keys(token.data.data.user.users)[0]].name,
                    },
                    token.data.data.token
                )
                .then(() => {
                    setStreamChat(chatClient);
                    setShowChat(true);
                });

            const channel = chatClient.channel('messaging', 'livechat');
            await channel.watch();
            // setStreamChannel(channel);
        };

        init();
    }, []);


    if (showChat) {
        return (
            <Chat client={streamChat}>
                <ChannelList
                    sort={{ last_message_at: -1 }}
                    Preview={ChannelPreviewMessenger}
                    onSelect={(channel) => { setStreamChannel(channel); }}
                    filters={{ members: { $in: ['internet'] } }}
                />
                <Channel channel={streamChannel}>
                    <Window>
                        <ChannelHeader />
                        <MessageList />
                        <MessageInput />
                    </Window>
                </Channel>
            </Chat>
        )
    } else {
        return <>loading</>
    }
}

export default SupportChat