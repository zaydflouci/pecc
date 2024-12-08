"use client";

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AccountSwitcher } from "./account-switcher"
import { NotificationCenter } from "./notification-center"
import Lottie from 'lottie-react'
import { useEffect, useState } from 'react';

export function TopBar() {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    const fetchAnimationData = async () => {
      const response = await fetch('/lottieLogo.json');
      const data = await response.json();
      setAnimationData(data);
    };

    fetchAnimationData();
  }, []);

  return (
    <div className=" bg-background flex justify-center border-b">
      <div className="container flex  bg-background items-center pt-2 pb-2">
        <Link href="/dashboard" className="-ml-2 flex items-center font-semibold">
          {animationData && (
            <Lottie 
              animationData={animationData} 
              loop={false}
              autoplay={true} 
              style={{ width: 'auto', height: '72px' }}
            />
          )}
        </Link>
        <div className="ml-auto flex items-center space-x-4">
          <NotificationCenter />
          <AccountSwitcher />
        </div>
      </div>
    </div>
  )
}

