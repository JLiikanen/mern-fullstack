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


export function TodoInput({ onAddTodo }: { onAddTodo: (text: string) => void }) {
  const [text, setText] = useState('')
  const [category, setCategory] = useState<'Work' | 'Home' | 'Free-time'>('Home')

  const handleSubmit = (text) => {
    if (text.trim()) {
      onAddTodo(text);
      setText("");
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative rounded-2xl border border-gray-300 bg-white min-h-[120px] flex flex-col shadow-lg">
        <textarea
          placeholder="Add a note for yourself..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-grow bg-transparent px-4 py-3 text-base shadow-none placeholder:text-muted-foreground focus:outline-none whitespace-pre-wrap break-words overflow-y-auto pr-16 rounded-2xl"
          style={{ height: 'auto', resize: 'none' }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(text);
            }
          }}
        />

        <div className="absolute bottom-2 left-2">
          <Select 
            value={category} 
            onValueChange={(value) => setCategory(value as 'Work' | 'Home' | 'Free-time')}
          >
            <SelectTrigger className="bg-muted border-0 rounded-md h-8">
              <SelectValue>
                {category === 'Home' && <Home className="h-4 w-4 text-blue-500 mr-2 inline" />}
                {category === 'Work' && <Briefcase className="h-4 w-4 text-green-500 mr-2 inline" />}
                {category === 'Free-time' && <Palmtree className="h-4 w-4 text-yellow-500 mr-2 inline" />}
                {category}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Home">
                <div className="flex items-center gap-2">
                  <Home className="h-4 w-4 text-blue-500" />
                  <span>Home</span>
                </div>
              </SelectItem>
              <SelectItem value="Work">
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-green-500" />
                  <span>Work</span>
                </div>
              </SelectItem>
              <SelectItem value="Free-time">
                <div className="flex items-center gap-2">
                  <Palmtree className="h-4 w-4 text-yellow-500" />
                  <span>Free-time</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          type="submit"
          size="icon"
          variant="ghost"
          className="absolute right-3 top-3 w-8 h-8 rounded-full bg-gray-900 hover:bg-gray-800 transition-colors"
          onClick={handleSubmit}
        >
          <SendHorizontal className="h-4 w-4 text-white" />
        </Button>
      </div>
    </div>
  )
}