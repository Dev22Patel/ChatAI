
import { useRef, useEffect, forwardRef } from 'react'
import { Textarea, TextareaProps } from "@/components/ui/textarea"

export const AutoResizeTextarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (props, forwardedRef) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    useEffect(() => {
      const textarea = textareaRef.current
      if (textarea) {
        const adjustHeight = () => {
          textarea.style.height = 'auto'
          textarea.style.height = `${textarea.scrollHeight}px`
        }
        textarea.addEventListener('input', adjustHeight)
        return () => textarea.removeEventListener('input', adjustHeight)
      }
    }, [])

    return <Textarea ref={(node) => {
      if (typeof forwardedRef === 'function') {
        forwardedRef(node)
      } else if (forwardedRef) {
        forwardedRef.current = node
      }
      textareaRef.current = node
    }} {...props} />
  }
)

AutoResizeTextarea.displayName = 'AutoResizeTextarea'
