
import React, { useState, KeyboardEvent, useRef, useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AutoResizeTextarea } from "@/components/ui/auto-resize-textarea"
import { useAuth0 } from "@auth0/auth0-react"
import { ChevronDown, Send, Settings, Plus, Home, LogOut } from 'lucide-react'
import { Separator } from "@/components/ui/separator"

export default function ChatPage() {
  const { user, logout } = useAuth0()
  const [input, setInput] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const handleSubmit = () => {
    if (input.trim()) {
      console.log("Submitted:", input)
      setInput('')
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'
      }
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (textareaRef.current && !textareaRef.current.contains(event.target as Node)) {
        textareaRef.current.style.height = 'auto'
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 border-r border-border p-4 flex flex-col bg-secondary">
        <Button
          variant="secondary"
          className="w-full justify-start gap-2 mb-3 bg-primary/10 hover:bg-primary/20 text-primary"
          asChild
        >
          <a href="/">
            <Home className="h-4 w-4" />
            Home
          </a>
        </Button>

        <Button
          variant="default"
          className="w-full justify-start gap-2 mb-4 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          New Chat
        </Button>

        <div className="flex-1">
          {/* Chat history would go here */}
        </div>

        <Separator className="my-4" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-start gap-2 hover:bg-primary/10">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.picture} alt={user?.name || 'User avatar'} />
                <AvatarFallback>{user?.given_name?.[0]}</AvatarFallback>
              </Avatar>
              <span className="text-sm">{user?.name}</span>
              <ChevronDown className="h-4 w-4 ml-auto" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem onClick={() => logout({ returnTo: window.location.origin })}>
              <LogOut className="h-4 w-4 mr-2" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-border px-4 py-2 bg-secondary">
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 bg-background hover:bg-primary/10">
                  AubergineGPT
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>GPT-3.5</DropdownMenuItem>
                <DropdownMenuItem>GPT-4</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Button variant="ghost" size="icon" className="hover:bg-primary/10">
            <Settings className="h-5 w-5" />
          </Button>
        </header>

        {/* Chat Area */}
        <main className="flex-1 overflow-auto p-4 bg-background">
          {/* Chat messages would go here */}
        </main>

        {/* Input Area */}
        <div className="border-t border-border p-4 bg-secondary">
          <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="max-w-3xl mx-auto">
            <div className="relative">
              <AutoResizeTextarea
                ref={textareaRef}
                value={input}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="Type your message here. Press Shift+Enter for a new line."
                className="w-full pr-12 min-h-[60px] max-h-[200px] resize-none bg-background focus:ring-primary"
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-2 bottom-2 bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={!input.trim()}
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
            <div className="mt-2 text-xs text-muted-foreground text-center">
              AubergineGPT can make mistakes. Consider checking important information.
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
