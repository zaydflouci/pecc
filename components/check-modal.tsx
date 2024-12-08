'use client'

import React from 'react'
import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ArrowLeft, ShieldCheck, CircleCheckBig, Info } from 'lucide-react'
import { CheckDisplay } from './check-display'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'

interface CheckModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface CheckData {
  checkNumber: string
  amount?: string
  accountHolder: string
  validityDate: string
  ribNumber: string
}

const LOTTIE_ANIMATION_URL = 'https://lottie.host/39390b4f-67eb-42dd-a1c4-26e9f78a10fc/PtnMaNdw2N.lottie'

export function CheckModal({ open, onOpenChange }: CheckModalProps) {
  const [step, setStep] = useState<'id' | 'amount' | 'result' | 'closed' | 'reservation'>('id')
  const [checkId, setCheckId] = useState('')
  const [amount, setAmount] = useState('')
  const [checkData, setCheckData] = useState<CheckData | null>(null)
  const [amountError, setAmountError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleStepChange = (newStep: 'id' | 'amount' | 'result' | 'closed' | 'reservation') => {
    if (newStep === 'closed') {
      setStep('id');
      setCheckId('');
      setAmount('');
      setCheckData(null);
      setAmountError('');
      onOpenChange(false);
    } else {
      setStep(newStep);
    }
  };

  const handleCheckIdSubmit = () => {
    setCheckData({
      checkNumber: checkId,
      accountHolder: 'Entreprise XYZ',
      validityDate: '2024-12-31',
      ribNumber: '10203066102985478860',
    })
    handleStepChange('amount')
  }

  const formatAmount = (value: string) => {
    const numbers = value.replace(/[^\d]/g, '')
    const formatted = (Number(numbers) / 100).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
    return formatted
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatAmount(e.target.value)
    const numericAmount = parseFloat(formatted.replace(/,/g, ''))
    
    if (numericAmount > 30000) {
      setAmount('')
      setAmountError('Veuillez entrer un montant inférieur ou égal à 30.000 TND.')
    } else {
      setAmount(formatted)
      setAmountError('')
      if (checkData) {
        setCheckData({
          ...checkData,
          amount: formatted,
        })
      }
    }
  }

  const handleConsulter = async () => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 5000))
    setIsLoading(false)
    handleStepChange('result')
  }

  const handleReservation = async () => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 5000))
    setIsLoading(false)
    handleStepChange('reservation')
  }

  const handleDialogClose = (isOpen: boolean) => {
    if (!isOpen) {
      handleStepChange('closed');
    }
    onOpenChange(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Consultation de chèque</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="relative">
            <div className={`${isLoading ? 'opacity-50' : ''}`}>
              <CheckDisplay 
                {...checkData} 
                showSuccessAnimation={step === 'reservation'}
              />
            </div>
            {isLoading && (
              <div className="absolute overflow-hidden inset-0 flex items-center justify-center">
                <DotLottieReact
                  src={LOTTIE_ANIMATION_URL}
                  loop
                  autoplay
                  style={{ width: '120%', height: '120%' }}
                />
              </div>
            )}
          </div>

          {step === 'id' && (
            <div className="space-y-4">
              <div>
                <label htmlFor="checkId" className="text-sm font-medium">
                  Identifiant de chèque
                </label>
                <Input
                  size='lg'
                  id="checkId"
                  value={checkId}
                  onChange={(e) => setCheckId(e.target.value)}
                  className="mt-1"
                />
              </div>
              <Button
                size='lg'
                className="w-full"
                onClick={handleCheckIdSubmit}
                disabled={!checkId}
              >
                Continuer
              </Button>
            </div>
          )}

          {step === 'amount' && (
            <div className={`space-y-4 ${isLoading ? 'opacity-50' : ''}`}>
              <div>
                <label htmlFor="amount" className="text-sm font-medium">
                  Montant (TND)
                </label>
                <Input
                  size='lg'
                  id="amount"
                  value={amount}
                  onChange={handleAmountChange}
                  className={`mt-1 ${amountError ? 'border-red-500' : ''}`}
                  placeholder="0.00"
                  disabled={isLoading}
                />
                {amountError && (
                  <p className="mt-1 text-sm text-red-500">{amountError}</p>
                )}
              </div>
              <Button
                size='lg'
                className="w-full"
                onClick={handleConsulter}
                disabled={!amount || !!amountError || isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-white"></span>
                    Consultation en cours...
                  </>
                ) : (
                  'Consulter'
                )}
              </Button>
            </div>
          )}

          {step === 'result' && (
            <div className="space-y-4">
              <Alert variant="info">
                <CircleCheckBig className="h-4 w-4" />
                <AlertTitle>Provision suffisante détectée</AlertTitle>
                <AlertDescription>
                  Ce chèque est éligible à la réservation. Vous pouvez procéder en toute confiance.
                </AlertDescription>
              </Alert>
              <div className="flex justify-between">
                <Button size='iconlg' variant="outline" onClick={() => handleStepChange('amount')} >
                  <ArrowLeft className=" h-4 w-4" />
                </Button>
                <Button size='lg' onClick={handleReservation} disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <span className="mr-1 h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-white"></span>
                      Réservation en cours...
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="mr-1 h-4 w-4" /> Reserver la provision
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}

          {step === 'reservation' && (
            <div className="space-y-4">
              <Alert variant="success">
                <CircleCheckBig className="h-4 w-4" />
                <AlertTitle>Réservation réussie</AlertTitle>
                <AlertDescription>
                Votre réservation a été effectuée avec succès. Les fonds sont réservés.
                </AlertDescription>
              </Alert>
              <Button
                size='lg'
                className="w-full"
                onClick={() => {
                  onOpenChange(false);
                  setStep('id');
                  setCheckId('');
                  setAmount('');
                  setCheckData(null);
                  setAmountError('');
                }}
              >
                Terminer
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

