'use client'

import { useState } from 'react'
import { StartView } from './StartView'
import { ChatView } from './ChatView'

enum View {
  START = 'START',
  CHAT = 'CHAT',
}

export type ChatRole = 'system' | 'user' | 'assistant'
export type Rolee = 'user' | 'assistant'

export type ChatMessage = {
  role: ChatRole
  content: string
}

const SYSTEM_MESSAGE_PREFIX = 'You are now roleplaying as:'

export default function Home() {
  const [view, setView] = useState<View>(View.START)
  const [chatPartner, setChatPartner] = useState<string>('')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [chatInput, setChatInput] = useState<string>('')

  const startChat = async () => {
    if (!chatPartner) return

    const systemMessage: ChatMessage = {
      role: 'system',
      content: `${SYSTEM_MESSAGE_PREFIX} ${chatPartner}. Stay in character at all time.`,
    }

    setMessages([systemMessage])
    setView(View.CHAT)
  }

  const sendMessage = async (userMessage: string) => {
    const trimmedMessage = userMessage.trim()
    if (!trimmedMessage) return

    const userChatMessage: ChatMessage = {
      role: 'user',
      content: trimmedMessage,
    }
    const updatedMessages = [...messages, userChatMessage]

    setMessages(updatedMessages)
    setChatInput('')

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      const assistantMessage = data.choices?.[0]?.message as
        | ChatMessage
        | undefined

      if (assistantMessage) {
        setMessages((prev) => [...prev, assistantMessage])
      }
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  return (
    <div className='w-full h-full'>
      {view === View.START && (
        <StartView
          chatPartner={chatPartner}
          setChatPartner={setChatPartner}
          onStartChat={startChat}
        />
      )}
      {view === View.CHAT && (
        <ChatView
          messages={messages}
          chatInput={chatInput}
          setChatInput={setChatInput}
          handleSendMessage={sendMessage}
        />
      )}
    </div>
  )
}
