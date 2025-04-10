'use client'

interface StartViewProps {
  chatPartner: string
  setChatPartner: (chatPartner: string) => void
  handleStartChat: () => void
}

export const StartView = ({
  chatPartner,
  setChatPartner,
  handleStartChat,
}: StartViewProps) => {
  return (
    <div className='flex flex-col items-center justify-center gap-8 h-full'>
      <div className='text-2xl font-bold'>Simple Chat</div>
      <div className='flex flex-col items-center justify-center gap-2'>
        <div className='text-md font-bold'>Describe your chat partner</div>
        <textarea
          rows={4}
          className={`
      w-96 p-4 
      bg-neutral-800 
      border border-neutral-700 
      rounded-lg
      resize-none
      text-foreground
      focus:outline-none
      focus:ring-2
      focus:ring-neutral-600
    `}
          placeholder='Describe your chat partner...'
          value={chatPartner}
          onChange={(e) => setChatPartner(e.target.value)}
        />
      </div>
      <button
        className='bg-neutral-800 px-4 py-2 text-lg rounded-lg border border-neutral-700'
        onClick={handleStartChat}
      >
        Start Chatting
      </button>
    </div>
  )
}
