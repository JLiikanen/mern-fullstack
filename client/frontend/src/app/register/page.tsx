'use client'
import Image from "next/image"
import { montserrat } from "../ui/fonts"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React, { useState } from 'react'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { useRouter } from "next/navigation"

export default function RegisterPage() {
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    // Validate the form
    
    function handleRegister(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        
        const name = data.get("name")
        const email = data.get("email")
        const password = data.get("password")
        const role = 'user'
        console.log({name, email, password})

        setIsLoading(true)
        setError(null)

        // New API call to register the user
        fetch('http://localhost:3000/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password, role }),
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => {
                    console.log(err.message)
                    
                    throw Error(err.message)
                });
            }
            return response.json();
        })
        .then(data => {
            console.log('User created:', data); // delete this because its unsafe
            // Handle successful registration, e.g., store the token
            localStorage.setItem('token', data.token); // Store the token safely
            router.push('/dashboard'); // Redirect to the dashboard
            // here we can move to the dashboard with the access token in memory!

        })
        .catch(error => {
          if (error.message === 'Ahoy! A user with this email already exists!'){
              setError(error.message)
              console.error('Error during registration:', error);
          } else {
            setError('Registration failed, some error occured. Please try again.');
          }
            
        })
        .finally(() => {
            setIsLoading(false);
        });
    }


  return (
    <div className={`min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-200 lg:grid lg:grid-cols-2 ${montserrat.variable} font-sans`}>
      <div className="flex flex-col justify-center px-8 py-12 lg:px-12">
        <div className="mx-auto w-full max-w-sm">
          <h1 className="mb-8 text-3xl font-semibold tracking-tight">
            Welcome To Your Rivendell
          </h1>
          <form className="space-y-4" onSubmit={handleRegister}>
            <div className="space-y-2">
              <Label htmlFor="name" >Full Name</Label>
              <Input id="name" name="name" placeholder="Enter your name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="Enter your email" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input 
                  id="password" 
                  name="password"
                  type={showPassword ? "text" : "password"} 
                  placeholder="Create a password" 
                  required 
                />
                                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-4 w-4 text-gray-500" />
                  ) : (
                    <EyeIcon className="h-4 w-4 text-gray-500" />
                  )}
                  <span className="sr-only">
                    {showPassword ? "Hide password" : "Show password"}
                  </span>
                </Button>

                </div>
            </div>
                {/* Error Message */}
                {error && 
                <div className="w-full p-2 text-red-700 bg-red-100 border border-red-300 rounded-md">
                    <p className='text-center'>{error}</p>
                </div>
                }
            <Button 
              className="w-full bg-zinc-900 text-white hover:bg-zinc-800" 
              size="lg"
              type="submit"
            >
              Register
            </Button>
          </form>
        </div>
      </div>
      <div className="relative hidden lg:block">
        <div className="absolute inset-x-0 top-8 bottom-8 overflow-hidden rounded-lg shadow-[0_0_25px_rgba(0,0,0,0.1)]">
          <Image
            src="/mountains.jpg"
            alt="Mountain landscape with a lake"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </div>
  )
}

