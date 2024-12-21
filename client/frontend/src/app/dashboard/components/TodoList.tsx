import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { montserrat } from '@/app/fonts/fonts'


// todo type derived from
type Todo = {
  _id: string,
  name: string,
  isCompleted: boolean,
  postingDate : Date
}

type TodoListProps = {
  title: string
  todos: Todo[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}



export function TodoList({ title, todos, onToggle, onDelete }: TodoListProps) {
  return (
    <div className="bg-card text-card-foreground rounded-lg shadow-md p-4 w-full mx-auto">
      <h2 className={`text-xl font-bold mb-4 ${montserrat.className}`}>{title}</h2>
      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo._id}
            className="flex items-center justify-between bg-muted/20 p-2 rounded-md pr-8"
          >
            {/* Left Section: Checkbox + Label */}
            <div className="flex items-start space-x-2 w-full pr-4">
              <Checkbox
                id={`todo-${todo._id}`}
                checked={todo.isCompleted}
                onCheckedChange={() => onToggle(todo._id)}
              />
              <label
                htmlFor={`todo-${todo._id}`}
                className={`break-words w-full ${
                  todo.isCompleted ? 'line-through text-muted-foreground' : ''
                }`}
              >
                {todo.name}
              </label>
            </div>
            {/* Trashcan Button */}
            <div className="flex-shrink-0">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(todo._id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}


