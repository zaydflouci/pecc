'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2 } from 'lucide-react'
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import Image from 'next/image'

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
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your details to get started
            </p>
          </div>

          {step === 'initial' && (
            <form onSubmit={handleInitialSubmit}>
              <div className="grid gap-2">
                <Label htmlFor="identifier">Email or Phone Number</Label>
                <Input
                  id="identifier"
                  placeholder="name@example.com or +216 XX XXX XXX"
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  required
                />
                <Button type="submit">Continue</Button>
              </div>
            </form>
          )}

          {(step === 'emailOtp' || step === 'phoneOtp') && (
            <form onSubmit={handleOtpSubmit}>
              <div className="grid gap-2">
                {step === 'emailOtp' && (
                  <div className="flex flex-col items-center mb-6">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/email-hTkWekeAFatjHyPMB048tYJP5INq4b.png"
                      alt="Email verification"
                      width={120}
                      height={120}
                      className="mb-4"
                    />
                    <p className="text-sm text-muted-foreground text-center">
                      We've sent a verification code to your email
                    </p>
                  </div>
                )}
                <Label htmlFor="otp">Enter OTP</Label>
                <InputOTP
                  maxLength={6}
                  render={({ slots }) => (
                    <InputOTPGroup>
                      {slots.map((slot, index) => (
                        <InputOTPSlot key={index} {...slot} />
                      ))}
                    </InputOTPGroup>
                  )}
                  value={otp}
                  onChange={setOtp}
                  ref={otpInputRef}
                />
                <Button type="submit" disabled={otp.length !== 6}>Verify OTP</Button>
                <div className="flex justify-between items-center mt-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={handleResendOtp}
                    disabled={resendTimer > 0}
                  >
                    {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend OTP'}
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    Attempts: {resendAttempts}
                  </span>
                </div>
              </div>
            </form>
          )}

          {step === 'phoneInput' && (
            <form onSubmit={handlePhoneSubmit}>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  size='lg'
                  id="phone"
                  placeholder="+216 XX XXX XXX"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
                <Button type="submit">Send OTP</Button>
              </div>
            </form>
          )}

          {step === 'setPassword' && (
            <form onSubmit={handlePasswordSubmit}>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  size='lg'
                  id="password"
                  placeholder="Enter password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  size='lg'
                  id="confirmPassword"
                  placeholder="Confirm password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <div className="space-y-1">
                  {passwordRequirements.map((req, index) => (
                    <p
                      key={index}
                      className={`text-sm ${
                        passwordRequirementsMet[index] ? 'text-green-500' : 'text-gray-500'
                      }`}
                    >
                      {req.text}
                    </p>
                  ))}
                </div>
                <Button
                  size="lg"
                  type="submit" 
                  disabled={!passwordRequirementsMet.every(Boolean) || password !== confirmPassword}
                >
                  Create Account
                </Button>
              </div>
            </form>
          )}

          {step === 'success' && (
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/success-P6Em6FqZUqrgj2ZhW8TOotxmQkuj1U.png"
                  alt="Success"
                  width={80}
                  height={80}
                  className="mb-2"
                />
              </div>
              <Alert>
                <CheckCircle2 className="h-4 w-4" />
                <AlertDescription>
                  Account created successfully! Redirecting to dashboard...
                </AlertDescription>
              </Alert>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

