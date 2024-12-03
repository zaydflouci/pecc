'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from 'next/link'

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      router.push('/dashboard')
    }, 3000)
  }

  return (
    <div className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900/80" />
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ 
            backgroundImage: 'url("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/brand-1vgW0d705P8docoqgC6xD4RDRuGHut.png")',
            backgroundBlendMode: 'overlay'
          }} 
        />
        <div className="relative z-20 flex items-center text-lg font-medium">
          Kaoun Check System
        </div>
        <div className="relative z-20 mt-auto">
          <div className="relative z-20 mt-auto flex justify-between items-center">
            <img 
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Group%2010-FWAL1oulTSufG1yz7NfUXuOzRO7WT.png" 
              alt="e-CHEQUE" 
              className="h-12 w-auto"
            />
            <img 
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sibtel_footer-removebg-preview%201-TW5fjRyjQ2XcJTTOTf4SQs9Hf8FpYJ.png" 
              alt="SIBTEL" 
              className="h-12 w-auto"
            />
          </div>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Login to your accountt
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email or phone to sign in to your account
            </p>
          </div>
          <form onSubmit={onSubmit}>
            <div className="grid gap-2">
              <div className="grid gap-1">
                <Label className="sr-only" htmlFor="identifier">
                  Email or Phone
                </Label>
                <Input
                  size='lg'
                  id="identifier"
                  placeholder="name@example.com or +216 XX XXX XXX"
                  type="text"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  disabled={isLoading}
                />
              </div>
              <div className="grid gap-1">
                <Label className="sr-only" htmlFor="password">
                  Password
                </Label>
                <Input
                  size='lg'
                  id="password"
                  placeholder="Password"
                  type="password"
                  autoCapitalize="none"
                  autoComplete="current-password"
                  autoCorrect="off"
                  disabled={isLoading}
                />
              </div>
              <Button size="lg" disabled={isLoading}>
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
              <div className="mt-4 text-center">
                <Link href="/signup" className="text-sm text-primary hover:underline">
                  Don't have an account? Sign up
                </Link>
              </div>
            </div>
          </form>
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <a
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}

