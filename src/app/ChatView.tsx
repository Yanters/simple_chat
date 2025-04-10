'use client'
import { useEffect, useState } from 'react'

interface ChatViewProps {
  messages: { role: string; content: string }[]
  handleSendMessage: (message: string) => void
  chatInput: string
  setChatInput: (chatInput: string) => void
}

export const ChatView = ({
  messages,
  handleSendMessage,
  chatInput,
  setChatInput,
}: ChatViewProps) => {
  return (
    <div className='h-full flex flex-col'>
      <div className='flex-1 overflow-y-auto p-4 space-y-4'>
        <div className='flex flex-col space-y-4'>
          {messages.slice(1).map((message, index) => (
            <ChatMessage
              key={index}
              role={message.role}
              content={message.content}
              animateTyping={index === messages.length - 2}
            />
          ))}
        </div>
      </div>
      <div className='p-4 border-t border-neutral-800'>
        <div className='flex gap-4'>
          <textarea
            className='flex-1 p-4 bg-neutral-800 border border-neutral-700 rounded-lg resize-none text-foreground focus:outline-none focus:ring-2 focus:ring-neutral-600'
            placeholder='Type your message...'
            rows={3}
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSendMessage(chatInput)
              }
            }}
          />
          <button
            onClick={() => handleSendMessage(chatInput)}
            className='px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-600'
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}

const ChatMessage = ({
  role,
  content,
  animateTyping,
}: {
  role: string
  content: string
  animateTyping: boolean
}) => {
  const [displayedText, setDisplayedText] = useState('')

  useEffect(() => {
    let timeout: NodeJS.Timeout
    if (animateTyping && role === 'assistant') {
      let i = 0
      const typeNextChar = () => {
        if (i < content.length) {
          setDisplayedText(content.slice(0, i + 1))
          const currentChar = content[i]
          i++
          const delay =
            currentChar === '.' || currentChar === '!' || currentChar === '?'
              ? 300 + Math.random() * 100
              : currentChar === ',' || currentChar === ';'
              ? 150 + Math.random() * 100
              : 30 + Math.random() * 40

          timeout = setTimeout(typeNextChar, delay)
        }
      }

      timeout = setTimeout(typeNextChar, 400 + Math.random() * 200)
      return () => clearTimeout(timeout)
    } else {
      setDisplayedText(content)
    }
  }, [content, animateTyping, role])

  return (
    <div
      className={`flex gap-2 items-center ${
        role === 'user' ? 'flex-row-reverse' : ''
      }`}
    >
      <div
        className={`${
          role === 'user' ? 'bg-green-600' : 'bg-blue-600'
        } text-xs px-2 py-1 rounded`}
      >
        {role === 'user' ? 'YOU' : 'BOT'}
      </div>
      <div className='bg-neutral-800 p-4 rounded-lg max-w-[80%] break-words whitespace-pre-wrap'>
        {displayedText}
        {animateTyping && displayedText.length < content.length && (
          <span className='animate-pulse'>|</span>
        )}
      </div>
    </div>
  )
}

export default ChatMessage
