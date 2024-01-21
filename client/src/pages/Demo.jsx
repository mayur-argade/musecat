import React, { useState, useEffect } from 'react';
import { Chat, Channel, ChannelHeader, Thread, Window, MessageInput, MessageList } from 'stream-chat-react';
import { StreamChat } from 'stream-chat';
import { streamToken } from '../http/index'
import 'stream-chat-react/dist/css/index.css'

const apiKey = 'wk34druzbujm';
const userId = 'user'; // For users
const adminId = 'admin'; // For admin
// const userToken = 'YOUR_USER_TOKEN'; // Generate user token from Stream Dashboard



const Demo = () => {
    const [client, setClient] = useState(null)
    const [streamChat, setStreamChat] = useState(null)
    const [userToken, setUserToken] = useState(null)
    const [showChat, setShowChat] = useState(false)
    const [streamChannel, setStreamChannel] = useState(null)
    const chatClient = new StreamChat(apiKey);


    useEffect(() => {
        const init = async () => {

            const token = await streamToken()
            setUserToken(token.data.data.token)
            setClient(token.data.data.user.users[0])

            // if (chatClient.tokenManager.token === token.data.data.token && chatClient.userID === token.data.data.user.users[0].id) return

            const connectPromise = chatClient.connectUser({
                id: token.data.data.user.users[0].id,
                name: token.data.data.user.users[0].name
            }, token.data.data.token)
                .then(() => {
                    setStreamChat(chatClient)
                    setShowChat(true)
                })

            const channel = chatClient.channel('messaging', token.data.data.user.users[0].id, {
                name: `Support Chat`
            });

            await channel.watch
            setStreamChannel(channel)

        }

        // getToken();
        init()
    }, [])


    if (showChat) {
        return (
            <Chat client={streamChat}>
                <Channel channel={streamChannel}>
                    <Window>
                        <ChannelHeader title={"Support Chat"}/>
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

export default Demo