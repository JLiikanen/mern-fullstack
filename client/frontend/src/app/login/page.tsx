'use client'

import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()

  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState(null)

  function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget)
    const email = data.get("email")
    const password = data.get("password")

    console.log({email, password})
    console.log("logger")

    fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password}),
    }).then(async response => {
        console.log(response.status)
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }
        else {

        }
        
        return response.json();
    }).then(data => {
            console.log('User created:', data); // delete this because its unsafe
            // Handle successful registration, e.g., store the token
            localStorage.setItem('token', data.token); // Store the token safely
            router.push('/dashboard'); // Redirect to the dashboard
            // here we can move to the dashboard with the access token in memory!
        })
    .catch(error => {
        // console.log(error.message)
        setError(error.message)
        console.log(error)
    });

  }

  return (
    <div className={cn(
      "min-h-screen w-full flex items-center justify-center relative overflow-hidden",
      "bg-white [background-image:linear-gradient(to_right,rgba(229,231,235,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(229,231,235,0.1)_1px,transparent_1px)] [background-size:24px_24px]"
    )}>
      {/* Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <svg className="absolute top-0 left-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <circle cx="5%" cy="5%" r="50" fill="rgba(59, 130, 246, 0.1)" />
          <circle cx="95%" cy="10%" r="70" fill="rgba(236, 72, 153, 0.1)" />
          <circle cx="90%" cy="90%" r="100" fill="rgba(16, 185, 129, 0.1)" />
          <circle cx="10%" cy="90%" r="80" fill="rgba(249, 115, 22, 0.1)" />
        </svg>
      </div>

      <Card className="w-full max-w-md p-8 shadow-2xl relative z-10">
        <div className="flex flex-col items-center space-y-6">
          {/* Logo */}
          <div className="w-12 h-12 bg-black rounded flex items-center justify-center">
            <span className="text-white font-bold text-xl">R</span>
          </div>
          
          {/* Header */}
          <div className="text-center space-y-1">
            <h1 className="text-xl font-semibold">Welcome to Rivendell</h1>
            <p className="text-sm text-muted-foreground">Log in to your papers.</p>
          </div>

          {/* Login Form */}
          <form className="w-full space-y-4" onSubmit={handleLogin}>
            <div className="space-y-2">
              <Input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full"
              />
            </div>
            <div className="space-y-2 relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full pr-10"
                name="password"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
                    {/* Error Message */}
                {error && 
                    <div className="w-full p-2 text-red-700 bg-red-100 border border-red-300 rounded-md">
                        <p className='text-center'>{error}</p>
                    </div>
                }
            <Button className="w-full" type="submit">
              Log in
            </Button>
          </form>

          {/* Forgot Password Link */}
          <a href="#" className="text-sm text-blue-600 hover:underline">
            Forgot password?
          </a>
        </div>
      </Card>
    </div>
  )
}

