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
import { ThemeToggle } from "@/components/theme-toogle"

const USER_CACHE_KEY = 'auth0_user_cache'
const CACHE_DURATION = 1000 * 60 * 60

type UserButtonProps = {
  user: any
  cachedUser: any
  isLoading: boolean
}

const UserButton = ({ user, cachedUser, isLoading }: UserButtonProps) => {
  const displayUser = cachedUser || user
  return (
    <Button variant="ghost" className="w-full justify-start gap-2 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors">
      {isLoading && !cachedUser ? (
        <>
          <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
          <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
          <ChevronDown className="h-4 w-4 ml-auto" />
        </>
      ) : (
        <>
          <Avatar className="h-8 w-8">
            <AvatarImage src={displayUser?.picture} alt={displayUser?.name || 'User avatar'} />
            <AvatarFallback>{displayUser?.given_name?.[0]}</AvatarFallback>
          </Avatar>
          <span
            className="text-sm truncate max-w-[100px] lg:max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap"
            title={displayUser?.name} // Show full name on hover
          >
            {displayUser?.name}
          </span>
          <ChevronDown className="h-4 w-4 ml-auto" />
        </>
      )}
    </Button>
  )
}

export default function ChatPage() {
  const { user, logout, isLoading } = useAuth0()
  const [input, setInput] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const [cachedUser, setCachedUser] = useState(() => {
    const cached = localStorage.getItem(USER_CACHE_KEY)
    if (cached) {
      const { data, timestamp } = JSON.parse(cached)
      if (Date.now() - timestamp < CACHE_DURATION) {
        return data
      }
      localStorage.removeItem(USER_CACHE_KEY)
    }
    return null
  })

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

  const handleLogout = () => {
    localStorage.removeItem(USER_CACHE_KEY)
    setCachedUser(null)
    logout({ returnTo: window.location.origin })
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

  useEffect(() => {
    if (user && !isLoading) {
      localStorage.setItem(USER_CACHE_KEY, JSON.stringify({
        data: user,
        timestamp: Date.now()
      }))
      setCachedUser(user)
    }
  }, [user, isLoading])

  return (
    <div className="flex min-h-screen bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-100">
      <div className="w-64 border-r border-gray-200 dark:border-zinc-800 p-4 flex flex-col bg-gray-50 dark:bg-zinc-800/50 backdrop-blur-sm">
        <Button
          variant="secondary"
          className="w-full justify-start gap-2 mb-3 bg-white/50 hover:bg-gray-100 text-gray-900 dark:bg-slate-700/50 dark:hover:bg-slate-600 dark:text-gray-100 transition-colors"
          asChild
        >
          <a href="/">
            <Home className="h-4 w-4" />
            Home
          </a>
        </Button>

        <Button
          variant="default"
          className="w-full justify-start gap-2 mb-4 bg-indigo-600 hover:bg-indigo-700 text-white dark:bg-indigo-600 dark:hover:bg-indigo-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          New Chat
        </Button>

        <div className="flex-1" />

        <Separator className="my-4 dark:bg-zinc-700" />

        <DropdownMenu>
        <DropdownMenuTrigger asChild>
        <div>
            <UserButton user={user} cachedUser={cachedUser} isLoading={isLoading} />
        </div>
        </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56 dark:bg-zinc-800 dark:border-zinc-700">
            <DropdownMenuItem
              onClick={handleLogout}
              className="dark:hover:bg-slate-700 dark:focus:bg-slate-700"
              disabled={isLoading}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between border-b border-gray-200 dark:border-zinc-800 px-4 py-2 bg-gray-50 dark:bg-zinc-800/50 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 bg-white hover:bg-gray-100 dark:bg-zinc-800 dark:hover:bg-slate-700 dark:border-zinc-700 transition-colors">
                  AubergineGPT
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="dark:bg-zinc-800 dark:border-zinc-700">
                <DropdownMenuItem className="dark:hover:bg-slate-700 dark:focus:bg-slate-700">GPT-3.5</DropdownMenuItem>
                <DropdownMenuItem className="dark:hover:bg-slate-700 dark:focus:bg-slate-700">GPT-4</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" size="icon" className="hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 bg-white dark:bg-zinc-900" />

        <div className="border-t border-gray-200 dark:border-zinc-800 p-4 bg-gray-50 dark:bg-zinc-800/50 backdrop-blur-sm">
          <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="max-w-3xl mx-auto">
            <div className="relative">
              <AutoResizeTextarea
                ref={textareaRef}
                value={input}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="Type your message here. Press Shift+Enter for a new line."
                className="w-full pr-12 min-h-[60px] max-h-[200px] resize-none bg-white dark:bg-zinc-900 dark:border-zinc-700 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-colors"
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-2 bottom-2 bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-700 transition-colors"
                disabled={!input.trim()}
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
            <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-center">
              AubergineGPT can make mistakes. Consider checking important information.
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
