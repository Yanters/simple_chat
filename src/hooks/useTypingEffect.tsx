import { ChatRole } from '@/app/page'
import { useEffect, useRef, useState } from 'react'

export const useTypingEffect = (
  content: string,
  role: ChatRole,
  animateTyping: boolean
) => {
  const [displayedText, setDisplayedText] = useState('')
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (!content) {
      setDisplayedText('')
      return
    }

    if (!animateTyping || role === 'user') {
      setDisplayedText(content)
      return
    }

    let i = 0
    const typeNextChar = () => {
      if (i < content.length) {
        const currentChar = content[i]
        console.log('Current char:', currentChar)
        setDisplayedText((prev) => prev + currentChar)
        i++
        const delay =
          currentChar === '.' || currentChar === '!' || currentChar === '?'
            ? 300 + Math.random() * 100
            : currentChar === ',' || currentChar === ';'
            ? 150 + Math.random() * 100
            : 30 + Math.random() * 40

        timeoutRef.current = setTimeout(typeNextChar, delay)
      }
    }

    setDisplayedText('')
    timeoutRef.current = setTimeout(typeNextChar, 200 + Math.random() * 100)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [content, animateTyping, role])

  return displayedText
}
