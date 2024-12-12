"use client"

import { useState } from 'react'
import { Textarea } from "@/components/ui/textarea"
import { Button } from '@/components/ui/button'
import { SendHorizontal, Briefcase, Home, Palmtree } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type TodoInputProps = {
  onAddTodo: (text: string, category: 'work' | 'home' | 'free-time') => void
}

export function TodoInput({ onAddTodo }: TodoInputProps) {
  const [text, setText] = useState('')
  const [category, setCategory] = useState<'work' | 'home' | 'free-time'>('home')

  const handleSubmit = () => {
    if (text.trim()) {
      onAddTodo(text, category)
      setText('')
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative rounded-lg border shadow-lg bg-white flex items-start min-h-[80px]">
        <Select 
          value={category} 
          onValueChange={(value) => setCategory(value as 'work' | 'home' | 'free-time')}
        >
          <SelectTrigger className="w-[120px] border-0 focus:ring-0 focus:ring-offset-0">
            <SelectValue>
              {category === 'home' && <Home className="h-4 w-4 text-blue-500 mr-2 inline" />}
              {category === 'work' && <Briefcase className="h-4 w-4 text-green-500 mr-2 inline" />}
              {category === 'free-time' && <Palmtree className="h-4 w-4 text-yellow-500 mr-2 inline" />}
              {category}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="home">
              <div className="flex items-center gap-2">
                <Home className="h-4 w-4 text-blue-500" />
                <span>Home</span>
              </div>
            </SelectItem>
            <SelectItem value="work">
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-green-500" />
                <span>Work</span>
              </div>
            </SelectItem>
            <SelectItem value="free-time">
              <div className="flex items-center gap-2">
                <Palmtree className="h-4 w-4 text-yellow-500" />
                <span>Free-time</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
        <textarea
            placeholder="Add a note for yourself..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-grow bg-transparent px-3 py-2 text-base shadow-none placeholder:text-muted-foreground focus:outline-none whitespace-pre-wrap break-words overflow-y-auto pr-16"
            style={{ height: 'auto', resize: 'none' }}
            onKeyDown={(e) => {
                console.log(e.key)
                if (e.key === 'Enter'  && !e.shiftKey) {
                  e.preventDefault(); // Prevent new line
                  handleSubmit(); // Call submit function
                }
              }}
        />

        <Button
          type="submit"
          size="icon"
          variant="ghost"
          className="absolute right-3 top-3"
          onClick={handleSubmit}
        >
          <SendHorizontal className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}

