'use client'

interface StartViewProps {
  chatPartner: string
  setChatPartner: (chatPartner: string) => void
  onStartChat: () => void
}

export const StartView: React.FC<StartViewProps> = ({
  chatPartner,
  setChatPartner,
  onStartChat,
}) => {
  const handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setChatPartner(event.target.value)
  }

  return (
    <div className='flex flex-col items-center justify-center h-full gap-8'>
      <h1 className='text-2xl font-semibold text-center'>Simple Chat</h1>
      <div className='flex flex-col items-center justify-center gap-2 w-full max-w-md'>
        <label htmlFor='chatPartner' className='text-lg font-bold'>
          Describe your chat partner
        </label>
        <textarea
          id='chatPartner'
          rows={4}
          className='w-full p-4 bg-neutral-800 border border-neutral-700 rounded-lg resize-none text-foreground focus:outline-none focus:ring-2 focus:ring-neutral-600'
          placeholder='Describe your chat partner...'
          value={chatPartner}
          onChange={handleTextAreaChange}
        />
      </div>
      <button
        className='bg-neutral-800 hover:bg-neutral-700 text-white px-6 py-3 rounded-lg border border-neutral-700 transition-colors duration-200'
        onClick={onStartChat}
      >
        Start Chatting
      </button>
    </div>
  )
}
