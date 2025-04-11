"use client"

import { useState } from 'react'
import Link from 'next/link'
import { ShoppingCart, Heart, User, Menu, X, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { AuthDialog } from '@/components/auth-dialog'
import { useAuth } from '@/lib/auth'
import { useCart } from '@/app/providers/cart-provider'

export function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { user, signOut } = useAuth()
  const { totalItems } = useCart()

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4">
              <Link href="/category/groceries" className="block px-2 py-1 text-lg">
                Groceries
              </Link>
              <Link href="/category/household" className="block px-2 py-1 text-lg">
                Household
              </Link>
              <Link href="/category/fashion" className="block px-2 py-1 text-lg">
                Fashion
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="text-2xl font-bold">O-Mart</span>
        </Link>
        <div className="hidden lg:flex lg:gap-x-12">
          <Link href="/category/groceries" className="text-sm font-medium">
            Groceries
          </Link>
          <Link href="/category/household" className="text-sm font-medium">
            Household
          </Link>
          <Link href="/category/fashion" className="text-sm font-medium">
            Fashion
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end gap-x-4">
          <div className={`${isSearchOpen ? 'flex' : 'hidden'} lg:flex items-center gap-x-2`}>
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full lg:w-[300px]"
            />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            {isSearchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
          </Button>
          <Button variant="ghost" size="icon" className="hover-rotate">
            <Heart className="h-5 w-5" />
          </Button>
          
          <Link href="/cart" className="relative">
            <Button variant="ghost" size="icon" className="hover-rotate">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white rounded-full h-5 w-5 text-xs flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>
          </Link>

          {user ? (
            <Button variant="ghost" size="icon" className="hover-rotate" onClick={() => signOut()}>
              <User className="h-5 w-5" />
            </Button>
          ) : (
            <AuthDialog />
          )}
        </div>
      </div>
    </nav>
  )
}