interface CheckDisplayProps {
  checkNumber?: string
  amount?: string
  payee?: string
  accountHolder?: string
  validityDate?: string
  ribNumber?: string
}

export function CheckDisplay({
  checkNumber = '---',
  amount = '---',
  payee = 'Kaoun LTD',
  accountHolder = '---',
  validityDate = '---',
  ribNumber = '---'
}: CheckDisplayProps) {
  return (
    <div className="bg-white rounded-none p-4 shadow-md border">
      <div className="flex flex-col gap-3">
        <div className="flex gap-1">
          <span className="text-xs text-muted-foreground">Chèque N°</span>
          <span className="text-xs">{checkNumber}</span>
        </div>
        
        <hr className="border-gray-200" />
        
        <div className="flex flex-col gap-0.5">
        <div className="flex justify-between">
          <span className="text-lg text-muted-foreground">TND</span>
          <span className="text-lg font-medium">{amount}</span>
        </div>

        <div className="flex justify-between align-center">
          <span className="text-lg text-muted-foreground">A l'ordre de</span>
          <span className="text-lg font-medium">{payee}</span>
        </div>
        </div>
        
        <hr className="border-gray-200" />
        
        <div className="flex flex-col gap-1">
        <div className="flex justify-between">
          <span className="text-xs text-muted-foreground">Titulaire du compte</span>
          <span className="text-xs">{accountHolder}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-xs text-muted-foreground">Date de validité</span>
          <span className="text-xs">{validityDate}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-xs text-muted-foreground">RIB/RIP</span>
          <span className="text-xs">{ribNumber}</span>
        </div>
       </div> 
      </div>
    </div>
  )
}

