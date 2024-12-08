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
      <div className="relative hidden h-full flex-col bg-muted p-9 text-white lg:flex dark:border-r">
        <div  />
        <img 
          src="/mobilemock.png" 
          alt="Mobile Mockup" 
          className="absolute z-40 inset-0 m-auto h-[600px] w-auto"
        />
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ 
            backgroundImage: 'url("/background2.png")',
            backgroundBlendMode: 'overlay'
          }} 
        />
        <div className="relative z-20 flex items-center justify-center space-x-4">
          <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
            <img 
              src="/appstore.png" 
              alt="Download on the Apple Store" 
              className="h-10 w-auto"
            />
          </a>
          <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer">
            <img 
              src="/googleplay.png" 
              alt="Get it on Google Play" 
              className="h-10 w-auto"
            />
          </a>
        </div>
      </div>
      <div className="flex flex-col p-4 lg:p-9 h-full">
        <div className="flex justify-between items-center bg-white">
          <img src="/logo.png" alt="Company Logo" className="-mt-5 h-12 w-auto" />
          <Link href="/signup">
            <Button variant="outline">
              Inscrivez-vous
            </Button>
          </Link>
        </div>
        <div className="flex-1 content-center">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-3xl font-semibold tracking-tight">
                Bienvenue
              </h1>
              <p className="text-sm text-muted-foreground">
              Gérez vos chèques de manière transparente et sécurisée. Restez informé, à tout moment.
              </p>
            </div>
            <form onSubmit={onSubmit}>
              <div className="grid gap-1">
                <div className="grid gap-2">
                <Label htmlFor="identifier">Email ou téléphone</Label>
                  <Input
                    size='lg'
                    id="identifier"
                    placeholder="name@example.com or 55123123"
                    type="text"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={isLoading}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Mot de passe</Label>
                  <Input
                    size='lg'
                    id="password"
                    placeholder="•••••••"
                    type="password"
                    autoCapitalize="none"
                    autoComplete="current-password"
                    autoCorrect="off"
                    disabled={isLoading}
                  />
                                    <Link href="/signup">
                    <Button variant="link">
                      Mot de passe oublié ?
                    </Button>
                  </Link>
                </div>
                <Button size="lg" disabled={isLoading} className='mt-4'>
                  {isLoading ? "Connexion..." : "Connexion"}
                </Button>
              </div>
            </form>
            <p className="px-8 text-center text-sm text-muted-foreground">
            En cliquant sur continuer, vous acceptez nos{" "}
              <a
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Conditions de service
              </a>{" "}
              et{" "}
              <a
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Politique de confidentialité
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

