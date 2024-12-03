import { ReactNode } from 'react'
import { TopBar } from "@/components/top-bar"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <main className="flex-1">
        <div className="container mx-auto py-6">
          {children}
        </div>
      </main>
    </div>
  )
}

