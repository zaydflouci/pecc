"use client"

import { ChequesTable } from "@/components/cheques-table"
import { CheckModal } from "@/components/check-modal"
import { useState } from "react"
import { Button } from '@/components/ui/button'

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <main className="container bg-background mx-auto p-9">
      <div className="flex flex-row justify-between">
      <h1 className="text-3xl font-bold mb-6">Gestion des Chèques</h1>
      <Button size='lg'
        onClick={() => setIsModalOpen(true)}

      >
        Consulter un chèque
      </Button>
      </div>
      <ChequesTable />
      
      <CheckModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </main>
  )
}