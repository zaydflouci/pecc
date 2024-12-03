import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AccountSwitcher } from "./account-switcher"
import { NotificationCenter } from "./notification-center"

export function TopBar() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <Link href="/dashboard" className="flex items-center font-semibold">
          <span className="font-bold text-xl mr-2">KC</span>
          <span>Kaoun Check System</span>
        </Link>
        <div className="ml-auto flex items-center space-x-4">
          <Input
            type="search"
            placeholder="Search..."
            className="md:w-[200px] lg:w-[300px]"
          />
          <NotificationCenter />
          <AccountSwitcher />
        </div>
      </div>
    </div>
  )
}

