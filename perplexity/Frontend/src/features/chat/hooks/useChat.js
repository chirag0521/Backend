import { initializeSocketConnection } from "../service/chat.socket.js";
import { sendMessage, getChats, getMessages, deleteChat } from "../service/chat.api.js";
import { useDispatch } from "react-redux";
import { setChats, setLoading, setCurrentChatId, setError } from "../chat.slice.js";

export const useChat = () => {

    const dispatch = useDispatch()

    async function handleSendMessage({ message, chatId }) {
        dispatch(setLoading(true))
        const data = await sendMessage({ message, chatId })
        const { chat, aiMessage } = data
        dispatch(setChats((prev) => {
            return {
                ...prev,
                [chat._id]: {
                    ...chat,
                    messages: [{ content: message, role: "user" }, aiMessage]
                },
            }
        }))
        dispatch(setCurrentChatId(chat._id))
    }

    return {
        initializeSocketConnection,
        handleSendMessage,
    }
}