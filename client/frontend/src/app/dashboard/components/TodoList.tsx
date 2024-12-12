import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'

type Todo = {
  id: number
  text: string
  completed: boolean
}

type TodoListProps = {
  title: string
  todos: Todo[]
  onToggle: (id: number) => void
  onDelete: (id: number) => void
}

export function TodoList({ title, todos, onToggle, onDelete }: TodoListProps) {
  return (
    <div className="bg-card text-card-foreground rounded-lg shadow-md p-4">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <ul className="space-y-2">
        {todos.map(todo => (
          <li key={todo.id} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id={`todo-${todo.id}`}
                checked={todo.completed}
                onCheckedChange={() => onToggle(todo.id)}
              />
              <label 
                htmlFor={`todo-${todo.id}`}
                className={`${todo.completed ? 'line-through text-muted-foreground' : ''}`}
              >
                {todo.text}
              </label>
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => onDelete(todo.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  )
}
