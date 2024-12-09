'use client'
import Image from "next/image"
import { montserrat } from "../ui/fonts"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React, { useState } from 'react'
import { EyeIcon, EyeOffIcon } from 'lucide-react'


export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    // Validate the form
    
    function handleRegister() {
        console.log("button clicked")
        setIsLoading(true)
        setError(null)

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
              <Input id="name" placeholder="Enter your name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input 
                  id="password" 
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

