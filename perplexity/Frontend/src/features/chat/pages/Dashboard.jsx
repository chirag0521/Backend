import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useChat } from '../hooks/useChat'




const Dashboard = () => {

    const chat = useChat()
    const [chatInput, setChatInput] = useState('')
    const [userMessage, setUserMessage] = useState('')

    const chats = useSelector((state) => state.chat.chats)
    const currentChatId = useSelector((state) => state.chat.currentChatId)

    // const user = useSelector(state => state.auth.user)
    // const { user } = useSelector(state => state.auth) same as above just destructured
    // console.log(user);

    useEffect(() => {
        chat.initializeSocketConnection()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSubmitMessage = (e) => {
        e.preventDefaut()
        const trimmedMessage = chatInput.trim()
        if (!trimmedMessage) {
            return
        }
        setUserMessage(trimmedMessage)
        setChatInput('')


    }
    return (
        <main className='min-h-screen w-full flex bg-[#07090f] p-3 text-white md:p-5'>
            <section className='mx-auto flex h-[calc(100vh-1.5rem)] w-full gap-4 rounded-3xl border-none p-1 md:h-[calc(100vh-2.5rem)] md:gap-6 md:p-1'>
                <aside className=' h-full w-72 shrink rounded-3xl border bg-[#080b12] p-4 md:flex md:flex-col'>
                    <h1 className='mb-5 text-3xl font-semibold'>Alexity</h1>
                    <div className='space-y-2'>
                        {Array.from({ length: 6 }).map((_, index) => (
                            <button
                                key={index}
                                type='button'
                                className='w-full rounded-xl border border-white/60 bg-transparent px-3 py-2 text-left text-base font-medium text-white/90 transition hover:border-white hover:text-white hover:shadow-md shadow-blue-500/50'>
                                Chat title
                            </button>
                        ))}
                    </div>
                </aside>
                <section className='relative max-w-3/5 mx-auto flex h-full  min-w-0 flex-1 flex-col gap-4'>

                    <div className='messages flex-1 space-y-3 overflow-y-auto pr-1 pb-30'>
                        {dummyMessages.map((message) => (
                            <div
                                key={message.id}
                                className={`max-w-[82%] w-fit rounded-2xl px-3 py-2 text-sm md:text-base ${message.role === 'user'
                                    ? 'ml-auto rounded-br-none bg-white/12 text-white'
                                    : 'mr-auto rounded-bl-none bg-[#0f1626] text-white/90'
                                    }`} >
                                <p>{message.content}</p>
                            </div>
                        ))}
                    </div>
                    <footer className='rounded-3xl w-full absolute bottom-2 border-white/60 bg-[#080b12] p-1 md:p-1 '>
                        <form onSubmit={handleSubmitMessage} className='flex flex-col gap-3 md:flex-row'>
                            <input type="text"
                                value={chatInput}
                                onChange={(e) => setChatInput(e.target.value)}
                                placeholder='Type your message'
                                className='w-full rounded-2xl border border-white/50 bg-transparent px-4 py-2 text-lg text-white outline-none transition placeholder:text-white/45 focus:border-white/90  hover:shadow-[0_0_10px_rgba(59,130,246,0.5)]'
                            />
                            <button
                                type='submit'
                                disabled={!chatInput.trim()}
                                className='rounded-2xl border border-white/60 px-6 py-3 text-lg font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50'>
                                Send
                            </button>
                        </form>

                    </footer>
                </section>
            </section>

        </main>
    )
}

export default Dashboard