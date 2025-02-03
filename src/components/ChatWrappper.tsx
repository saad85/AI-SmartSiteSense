"use client"

import { Message, useChat } from "ai/react";

export const ChatWrapper = ({ sessionId }: { sessionId: string }) => {
    const { messages, handleInputChange, handleSubmit, input, setInput } = useChat({
        api: "/api/chat-stream",
        body: { sessionId }
    })
    return (
        <div className="relative min-h-full bg-zinc-900 flex divide-y divide-zinc-700 flex-col justify-between gap-2">

            <div className="flex-1 text-black bg-zinc-800 justify-between flex flex-col">
                {JSON.stringify(messages[0].content)}
            </div>

            <form onSubmit={handleSubmit}>
                <input value={input} type="text" onChange={handleInputChange}></input>
                <button type="submit" className="text-white">send</button>
            </form>
           

            

            {/* <ChatInput
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        setInput={setInput}
      /> */}
        </div>
    )
}