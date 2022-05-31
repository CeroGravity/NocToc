import Image from 'next/image'
import { BellIcon, SearchIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'

function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { logout } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header
      className={`${
        isScrolled && 'bg-[#141414]'
      } transition duration-500 ease-in`}
    >
      <div className="flex items-center space-x-2 md:space-x-8">
        <Image
          src="/logo.svg"
          width={120}
          height={120}
          className="cursor-pointer object-contain"
        />

        <ul className="hidden space-x-4 md:flex">
          <li className="headerLink link-underline link-underline-black">
            Home
          </li>
          <li className="headerLink link-underline link-underline-black">
            TV Shows
          </li>
          <li className="headerLink link-underline link-underline-black">
            Movies
          </li>
          <li className="headerLink link-underline link-underline-black">
            New & Popular
          </li>
          <li className="headerLink link-underline link-underline-black">
            My List
          </li>
        </ul>
      </div>
      <div className="flex items-center space-x-4 text-sm font-light">
        <SearchIcon className="hidden sm:inline h-6 w-6 cursor-pointer" />
        <p className="hidden lg:inline cursor-progress">Kids</p>
        <BellIcon className="h-6 w-6 cursor-pointer" />
        {/* <Link href="/account"> */}
        <img
          onClick={logout}
          src="/avatar.png"
          alt="avatar_image"
          className="cursor-pointer rounded-lg h-8 w-8"
        />
        {/* </Link> */}
      </div>
    </header>
  )
}

export default Header
