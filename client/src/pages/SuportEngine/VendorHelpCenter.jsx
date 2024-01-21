import React, { useState, useEffect } from 'react';
import { Chat, Channel, ChannelHeader, Thread, Window, MessageInput, MessageList } from 'stream-chat-react';
import { StreamChat } from 'stream-chat';
import { vendorStreamToken } from '../../http/index.js'
import 'stream-chat-react/dist/css/index.css'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/shared/Navbar/Navbar.jsx';
import Footer from '../../components/shared/Footer/Footer.jsx';
import '../../App.css'


const apiKey = process.env.REACT_APP_STREAM_API_KEY;

const VendorHelpCenter = () => {
    const navigate = useNavigate()
    const [client, setClient] = useState(null)
    const [streamChat, setStreamChat] = useState(null)
    const [userToken, setUserToken] = useState(null)
    const [showChat, setShowChat] = useState(false)
    const [streamChannel, setStreamChannel] = useState(null)
    const chatClient = new StreamChat(apiKey);


    useEffect(() => {
        const init = async () => {
            try {

                const token = await vendorStreamToken()

                // console.log(token.status, token.data)

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
            } catch (error) {
                console.log(error)
            }

        }

        // getToken();
        init()
    }, [])


    return (
        <>
            <Navbar />
            {
                showChat
                    ?
                    <div className='h-96 '>
                        <div></div>
                        <section className='md:mr-48 md:ml-48 ml-6 mr-6'>
                            <Chat client={streamChat}  >
                                <Channel channel={streamChannel}>
                                    <Window>
                                        <ChannelHeader title={"Help Center"} />
                                        <MessageList />
                                        <MessageInput />
                                    </Window>
                                </Channel>
                            </Chat>
                        </section >
                        <div className='dark:bg-[#2c2c2c] dark:text-white'>
                            < Footer />
                        </div>
                    </div >
                    :
                    <div className='dark:bg-[#2c2c2c] dark:text-white h-screen w-full flex justify-center align-middle items-center'>
                        <div class="relative flex justify-center items-center">
                            <div class="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-[#C0A04C]"></div>
                            <img src="/images/logo/logo-main.png" class="h-16" />
                        </div>
                    </div>
            }



        </>
    )
}

export default VendorHelpCenter