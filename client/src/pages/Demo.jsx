import React from 'react';
import { Chat, Channel, ChannelHeader, Thread, Window, MessageInput, MessageList } from 'stream-chat-react';
import { StreamChat } from 'stream-chat';

const apiKey = 'YOUR_STREAM_API_KEY';
const userId = 'user'; // For users
const adminId = 'admin'; // For admin
const userToken = 'YOUR_USER_TOKEN'; // Generate user token from Stream Dashboard

const chatClient = new StreamChat(apiKey);

const Demo = () => {
    chatClient.connectUser({ id: userId }, userToken);

    const channel = chatClient.channel('messaging', 'support', {
        members: [userId, adminId],
    });
    return (
        <Chat client={chatClient} theme="messaging light">
            <Channel channel={channel}>
                <Window>
                    <ChannelHeader />
                    <MessageList />
                    <MessageInput />
                    <Thread />
                </Window>
            </Channel>
        </Chat>
    )
}

export default Demo