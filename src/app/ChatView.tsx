'use client'
import React, { useEffect, useRef, useCallback, useMemo } from 'react'
import { ChatMessage } from './page'
import { useTypingEffect } from '@/hooks/useTypingEffect'

interface ChatViewProps {
  messages: ChatMessage[]
  chatInput: string
  handleSendMessage: (message: string) => void
  setChatInput: (chatInput: string) => void
}

const ChatMessageElement: React.FC<
  ChatMessage & { animateTyping: boolean }
> = ({ role, content, animateTyping }) => {
  const displayedText = useTypingEffect(content, role, animateTyping)
  const roleLabel = useMemo(() => (role === 'user' ? 'Me' : 'Partner'), [role])

  return (
    <div
      className={`flex gap-2 items-start ${
        role === 'user' ? 'flex-row-reverse' : ''
      }`}
    >
      <div
        className={`text-xs px-2 py-1 rounded ${
          role === 'user' ? 'bg-green-600' : 'bg-blue-600'
        } flex items-center justify-center h-fit`}
      >
        {roleLabel}
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

export const ChatView: React.FC<ChatViewProps> = ({
  messages,
  handleSendMessage,
  chatInput,
  setChatInput,
}) => {
  const chatEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = useCallback(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  const handleSubmit = useCallback(() => {
    handleSendMessage(chatInput)
  }, [chatInput, handleSendMessage])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        handleSubmit()
      }
    },
    [handleSubmit]
  )

  return (
    <div className='h-full flex flex-col'>
      <div className='flex-1 overflow-y-auto p-4 space-y-4'>
        <div className='flex flex-col space-y-4'>
          {messages.slice(1).map((message, index) => (
            <ChatMessageElement
              key={index}
              role={message.role}
              content={message.content}
              animateTyping={index === messages.length - 2}
            />
          ))}
        </div>
        <div ref={chatEndRef} />
      </div>
      <div className='p-4 border-t border-neutral-800'>
        <div className='flex gap-4'>
          <textarea
            className='flex-1 p-4 bg-neutral-800 border border-neutral-700 rounded-lg resize-none text-foreground focus:outline-none focus:ring-2 focus:ring-neutral-600'
            placeholder='Type your message...'
            rows={3}
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={handleSubmit}
            className='px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-600'
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}
