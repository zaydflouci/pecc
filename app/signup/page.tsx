'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2 } from 'lucide-react'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp"
import Image from 'next/image'
import Link from 'next/link'

type Step = 'initial' | 'emailOtp' | 'phoneInput' | 'phoneOtp' | 'setPassword' | 'success'

type PasswordRequirement = {
  regex: RegExp;
  text: string;
}

const passwordRequirements: PasswordRequirement[] = [
  { regex: /.{8,}/, text: "At least 8 characters long" },
  { regex: /[A-Z]/, text: "Contains an uppercase letter" },
  { regex: /[a-z]/, text: "Contains a lowercase letter" },
  { regex: /[0-9]/, text: "Contains a number" },
  { regex: /[!#$*]/, text: "Contains a special character (!,#,$, *)" },
]

export default function SignupPage() {
  const [step, setStep] = useState<Step>('initial')
  const [identifier, setIdentifier] = useState('')
  const [isEmail, setIsEmail] = useState(false)
  const [otp, setOtp] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordRequirementsMet, setPasswordRequirementsMet] = useState<boolean[]>(
    new Array(passwordRequirements.length).fill(false)
  )
  const [resendAttempts, setResendAttempts] = useState(0)
  const [resendTimer, setResendTimer] = useState(0)
  const router = useRouter()
  const otpInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setPasswordRequirementsMet(
      passwordRequirements.map(req => req.regex.test(password))
    )
  }, [password])

  useEffect(() => {
    if ((step === 'emailOtp' || step === 'phoneOtp') && otpInputRef.current) {
      otpInputRef.current.focus()
    }
  }, [step])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [resendTimer])

  const handleInitialSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const isEmailInput = identifier.includes('@')
    setIsEmail(isEmailInput)
    setStep(isEmailInput ? 'emailOtp' : 'phoneOtp')
    setResendTimer(30) // Start 30 second timer for resend
  }

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isEmail && step === 'emailOtp') {
      setStep('phoneInput')
    } else if (step === 'phoneOtp') {
      setStep('setPassword')
    }
  }

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setOtp('') // Reset OTP when moving to phone OTP step
    setStep('phoneOtp')
    setResendTimer(30) // Start 30 second timer for resend
  }

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === confirmPassword && passwordRequirementsMet.every(Boolean)) {
      setStep('success')
      setTimeout(() => router.push('/dashboard'), 3000)
    }
  }

  const handleResendOtp = () => {
    setResendAttempts((prev) => prev + 1)
    setResendTimer(30) // Reset timer to 30 seconds
    setOtp('') // Clear the OTP input
    // Here you would typically call your API to resend the OTP
    console.log('Resending OTP...')
  }

  return (
    <div className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-9 text-white lg:flex dark:border-r">
        <div />
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
          <Link href="/login">
            <Button variant="outline">
              Se connecter
            </Button>
          </Link>
        </div>
        <div className="flex-1 content-center">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              {step === 'initial' && (
                <>
                  <h1 className="text-3xl font-semibold tracking-tight">
                    Créez un compte
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Gérez vos chèques de manière transparente et sécurisée. Restez informé, à tout moment.
                  </p>
                </>
              )}
              {step === 'emailOtp' && (
                <>
                  <h1 className="text-3xl font-semibold tracking-tight">
                    Vérification de l'email
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Un code de vérification a été envoyé à votre adresse email. Veuillez le saisir ci-dessous.
                  </p>
                </>
              )}
              {step === 'phoneInput' && (
                <>
                  <h1 className="text-3xl font-semibold tracking-tight">
                    Entrez votre numéro de téléphone
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Veuillez entrer votre numéro de téléphone pour recevoir un code de vérification.
                  </p>
                </>
              )}
              {step === 'phoneOtp' && (
                <>
                  <h1 className="text-3xl font-semibold tracking-tight">
                    Vérification du téléphone
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Un code de vérification a été envoyé à votre numéro de téléphone. Veuillez le saisir ci-dessous.
                  </p>
                </>
              )}
              {step === 'setPassword' && (
                <>
                  <h1 className="text-3xl font-semibold tracking-tight">
                    Créez votre mot de passe
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Veuillez choisir un mot de passe fort pour sécuriser votre compte.
                  </p>
                </>
              )}
              {step === 'success' && (
                <>
                  <h1 className="text-3xl font-semibold tracking-tight">
                    Inscription réussie
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Votre compte a été créé avec succès ! Vous serez redirigé vers le tableau de bord.
                  </p>
                </>
              )}
            </div>

            {step === 'initial' && (
              <form onSubmit={handleInitialSubmit}>
                <div className="grid gap-1">
                  <Label htmlFor="identifier">Email ou téléphone</Label>
                  <Input
                    size='lg'
                    id="identifier"
                    placeholder="name@example.com ou 55123456"
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    required
                  />
                  <Button className='mt-4' size='lg' type="submit">Continuer</Button>
                </div>
              </form>
            )}

            {(step === 'emailOtp' || step === 'phoneOtp') && (
              <form onSubmit={handleOtpSubmit}>
                <div className="grid gap-1">
                  {step === 'emailOtp' && (
                    <div className="flex flex-col items-center mb-6">
                      <Image
                        src="/email.png"
                        alt="Email verification"
                        width={120}
                        height={120}
                        className="mb-4"
                      />
                    </div>
                  )}
                  {step === 'phoneOtp' && (
                    <div className="flex flex-col items-center mb-6">
                      <Image
                        src="/sms.png"
                        alt="SMS verification"
                        width={120}
                        height={120}
                        className="mb-4 -mr-8"
                      />
                    </div>
                  )}
                  <InputOTP maxLength={6} render={({ slots }) => (
                    <>
                      <InputOTPGroup>
                        {slots.slice(0, 3).map((slot, index) => (
                          <InputOTPSlot key={index} {...slot} />
                        ))}
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        {slots.slice(3).map((slot, index) => (
                          <InputOTPSlot key={index + 3} {...slot} />
                        ))}
                      </InputOTPGroup>
                    </>
                  )} 
                  value={otp}
                  onChange={setOtp}
                  ref={otpInputRef}
                  />
                  <Button className='mt-4' size="lg" type="submit" disabled={otp.length !== 6}>Vérifier OTP</Button>
                  <div className="flex justify-between items-center mt-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={handleResendOtp}
                      disabled={resendTimer > 0}
                    >
                      {resendTimer > 0 ? `Renvoyer dans ${resendTimer}s` : 'Renvoyer OTP'}
                    </Button>
                    <span className="text-sm text-muted-foreground">
                      Tentatives: {resendAttempts}
                    </span>
                  </div>
                </div>
              </form>
            )}

            {step === 'phoneInput' && (
              <form onSubmit={handlePhoneSubmit}>
                <div className="grid gap-1">
                  <Label htmlFor="phone">Numéro de téléphone</Label>
                  <Input
                    size='lg'
                    id="phone"
                    placeholder="55123456"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                  <Button className='mt-4' size="lg" type="submit">Envoyer OTP</Button>
                </div>
              </form>
            )}

            {step === 'setPassword' && (
              <form onSubmit={handlePasswordSubmit}>
                <div className="grid gap-1">
                  <Label htmlFor="password">Mot de passe</Label>
                  <Input
                    size='lg'
                    id="password"
                    placeholder="Entrez le mot de passe"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                  <Input
                    size='lg'
                    id="confirmPassword"
                    placeholder="Confirmer le mot de passe"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <div className="mt-4 space-y-1">
                    {passwordRequirements.map((req, index) => (
                      <p
                        key={index}
                        className={`text-sm ${
                          passwordRequirementsMet[index] ? 'text-green-600 font-medium' : 'text-gray-500'
                        }`}
                      >
                        {req.text}
                      </p>
                    ))}
                  </div>
                  <Button className='mt-4'
                    size="lg"
                    type="submit" 
                    disabled={!passwordRequirementsMet.every(Boolean) || password !== confirmPassword}
                  >
                    Créer un compte
                  </Button>
                </div>
              </form>
            )}

            {step === 'success' && (
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <Image
                    src="/success.png"
                    alt="Success"
                    width={80}
                    height={80}
                    className="mb-2"
                  />
                </div>
                <Alert>
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertDescription>
                    Compte créé avec succès ! Redirection vers le tableau de bord...
                  </AlertDescription>
                </Alert>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}