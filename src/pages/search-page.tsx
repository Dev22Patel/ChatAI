
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input"
import { WavyBackground } from "@/components/ui/wavy-background"
import { useAuth0 } from "@auth0/auth0-react"
import { ChevronDown, Paperclip, Calendar, Mic, ImageIcon, HelpCircle, FileText, Sparkles, MoreHorizontal } from 'lucide-react'

export default function ChatPage() {
    const {user} = useAuth0();

  const placeholders = [
    "What's the first rule maruti society",
    "Who is hadi om ?",
    "Where is keta didi?",
    "thankyou message for dev patel",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-gray-800 px-4 py-2 bg-black/50 backdrop-blur-sm z-50">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-gray-100 hover:text-gray-300" asChild>
            <a href="/">
              <ChevronDown className="h-4 w-4 rotate-90" />
            </a>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2 text-white">
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

        <Avatar className="h-8 w-8">
          <AvatarImage src="/placeholder.svg" />
          <AvatarFallback className="bg-slate-300">VP</AvatarFallback>
        </Avatar>
      </header>

      {/* Wavy Background with Main Content */}
      <WavyBackground
        className="max-w-4xl mx-auto pb-40"
      >
        <main className="flex-1 flex flex-col items-center justify-center p-4">
          <div className="max-w-2xl w-full space-y-8">
            <h1 className="text-4xl font-semibold text-center text-white">
              What can I help with {user?.given_name}?
            </h1>

            {/* Input Card */}
            <div className="border border-white/10 bg-black/40 backdrop-blur-md p-4 rounded-xl">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-300">
                  <Paperclip className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-300">
                  <Calendar className="h-5 w-5" />
                </Button>
                <PlaceholdersAndVanishInput
                  placeholders={placeholders}
                  onChange={handleChange}
                  onSubmit={onSubmit}
                />
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-300">
                  <Mic className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Suggestion Buttons */}
            <div className="flex flex-wrap justify-center gap-2">
              <Button variant="outline" className="gap-2 border-white/10 bg-black/40 backdrop-blur-md hover:bg-white/10 text-gray-300">
                <ImageIcon className="h-4 w-4 text-green-600" />
                Create image
              </Button>
              <Button variant="outline" className="gap-2 border-white/10 bg-black/40 backdrop-blur-md hover:bg-white/10 text-gray-300">
                <HelpCircle className="h-4 w-4 text-blue-500" />
                Get advice
              </Button>
              <Button variant="outline" className="gap-2 border-white/10 bg-black/40 backdrop-blur-md hover:bg-white/10 text-gray-300">
                <FileText className="h-4 w-4 text-orange-500" />
                Summarize text
              </Button>
              <Button variant="outline" className="gap-2 border-white/10 bg-black/40 backdrop-blur-md hover:bg-white/10 text-gray-300">
                <Sparkles className="h-4 w-4 text-purple-500" />
                Surprise me
              </Button>
              <Button variant="outline" className="gap-2 border-white/10 bg-black/40 backdrop-blur-md hover:bg-white/10 text-gray-300">
                <MoreHorizontal className="h-4 w-4" />
                More
              </Button>
            </div>
          </div>
        </main>
      </WavyBackground>
    </div>
  )
}
