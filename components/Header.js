import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import BLOG from '@/blog.config'
import { lang } from '@/lib/lang'
import { useRouter } from 'next/router'
import {
  HomeIcon,
  NewspaperIcon,
  CollectionIcon,
  SparklesIcon,
  SearchIcon,
  MenuIcon
} from '@heroicons/react/outline'
import Social from './Social.js'
import ThemeSwitcher from './ThemeSwitcher.js'
import LangSwitcher from './LangSwitcher.js'
import { motion } from 'framer-motion'

const NavBar = () => {
  const router = useRouter()
  const { locale } = useRouter()
  const t = lang[locale]
  const [showMenu, setShowMenu] = useState(false)

  let activeMenu = ''
  if (router.query.slug) {
    activeMenu = '/' + router.query.slug
  } else {
    activeMenu = router.pathname
  }

  const links = [
    {
      id: 0,
      name: t.NAV.INDEX,
      to: BLOG.path || '/',
      icon: <HomeIcon className='inline-block mb-1 h-5 w-5' />,
      show: true
    },
    {
      id: 1,
      name: t.NAV.NEWSLETTER,
      to: '/newsletter',
      icon: <NewspaperIcon className='inline-block mb-1 h-5 w-5' />,
      show: true
    },
    {
      id: 2,
      name: t.NAV.NOTES,
      to: '/notes',
      icon: <CollectionIcon className='inline-block mb-1 h-5 w-5' />,
      show: true
    },
    {
      id: 3,
      name: t.NAV.PROJECTS,
      to: '/projects',
      icon: <SparklesIcon className='inline-block mb-1 h-5 w-5' />,
      show: BLOG.showAbout
    },
    {
      id: 4,
      name: t.NAV.SEARCH,
      to: '/search',
      icon: <SearchIcon className='inline-block mb-1 h-5 w-5' />,
      show: true
    }
  ]
  return (
    <motion.div className='flex'>
      {/* Desktop Menu */}
      <ul className='hidden md:flex md:gap-1'>
        {links.map(
          (link) =>
            link.show && (
              <Link passHref key={link.id} href={link.to} scroll={false}>
                <li
                  className={`${
                    activeMenu === link.to ? 'bg-gray-200 dark:bg-gray-700' : ''
                  } hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer rounded-lg block py-1 px-2 nav`}
                >
                  <a className='font-light'>
                    {link.icon}
                    <span className='inline-block m-1'>{link.name}</span>
                  </a>
                </li>
              </Link>
            )
        )}
      </ul>

      <ThemeSwitcher />
      <LangSwitcher />

      {/* Mobile Phone Menu */}
      <div className='md:hidden mr-2 block '>
        <button
          type='button'
          onClick={() => setShowMenu((showMenu) => !showMenu)}
          className='hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer rounded-lg block p-2 -mr-3 md:pb-3'
        >
          <MenuIcon className='inline-block mb-1 h-5 w-5' />
        </button>
        {showMenu && (
          <div className='absolute right-0 w-40 mr-4 mt-2 origin-top-right bg-white dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-600 rounded-md shadow-lg outline-none'>
            <div className='py-1'>
              {links.map(
                (link) =>
                  link.show && (
                    <Link passHref key={link.id} href={link.to} scroll={false}>
                      <a className='hover:bg-gray-100 dark:hover:bg-gray-600 font-light block justify-between w-full px-4 py-2 leading-5'>
                        {link.icon}
                        <span className='m-1'>{link.name}</span>
                      </a>
                    </Link>
                  )
              )}
            </div>
            <div className='px-4 py-4'>
              <Social />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

const Header = ({ navBarTitle, fullWidth }) => {
  const [showTitle, setShowTitle] = useState(false)
  const useSticky = !BLOG.autoCollapsedNavBar
  const navRef = useRef(null)
  const sentinalRef = useRef([])
  const handler = ([entry]) => {
    if (navRef && navRef.current && useSticky) {
      if (!entry.isIntersecting && entry !== undefined) {
        navRef.current?.classList.add('sticky-nav-full')
      } else {
        navRef.current?.classList.remove('sticky-nav-full')
      }
    } else {
      navRef.current?.classList.add('remove-sticky')
    }
  }
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 100) {
        setShowTitle(true)
      } else {
        setShowTitle(false)
      }
    })

    const obvserver = new window.IntersectionObserver(handler)
    obvserver.observe(sentinalRef.current)
    // Don't touch this, I have no idea how it works XD
    // return () => {
    //   if (sentinalRef.current) obvserver.unobserve(sentinalRef.current)
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sentinalRef])
  return (
    <>
      <div className='observer-element h-4 md:h-12' ref={sentinalRef}></div>
      <div
        className={`sticky-nav m-auto w-full h-6 flex flex-row justify-between items-center mb-2 md:mb-12 py-8 bg-opacity-60 ${
          !fullWidth ? 'max-w-3xl px-4' : 'px-4 md:px-24'
        }`}
        id='sticky-nav'
        ref={navRef}
      >
        <div className='flex items-center'>
          <Link passHref href='/' scroll={false}>
            <a aria-label={BLOG.title}>
              <motion.div className='h-6 hover:text-blue-500 dark:hover:text-blue-500 fill-current'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 100 100'
                >
                  <g transform="translate(0.000000,128.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
                    <path d="M589 1227 c14 -18 51 -42 51 -33 0 3 -15 15 -32 27 -24 17 -29 18-19 6z"/>
                    <path d="M968 933 c-10 -2 -18 -9 -18 -15 0 -5 7 -7 16 -4 13 5 14 3 6 -6 -6 -7 -10 -17 -10 -23 0 -5 -8 -12 -17 -15 -16 -6 -16 -8 -2 -22 9 -9 13 -19 9 -24 -4 -5 0 -3 8 3 17 12 48 9 63 -6 7 -7 3 -8 -12 -4 -11 3 -35 0 -51 -7 -29 -12 -30 -14 -16 -35 21 -31 3 -47 -32 -29 -15 8 -32 14 -39 14 -23 0 -63 -23 -63 -37 0 -8 5 -11 10 -8 6 4 5 -5 -2 -20 -11 -25 -24 -24 -30 5 -2 8 -11 23 -20 34 -13 14 -21 16 -30 8 -8 -6 -36 -14 -62 -19 -45 -8 -48 -9 -31 -23 15 -12 17 -12 10 -1 -5 9 -4 12 3 7 6 -4 8 -14 5 -23 -5 -12 -2 -15 10 -10 11 4 14 2 11 -8 -3 -7 0 -23 6 -36 11 -19 10 -21 -3 -16 -12 4 -14 2 -10 -10 5 -12 2 -15 -10 -10 -8 3 -18 1 -21 -6 -3 -9 -8 -8 -15 3 -9 13 -11 11 -11 -6 0 -22 24 -39 41 -28 5 3 9 0 9 -6 0 -6 5 -8 10 -5 18 11 -1 26 -23 19 -13 -4 -18 -3 -14 2 5 5 29 9 53 10 37 1 44 -2 38 -15 -16 -40 -16 -54 0 -63 9 -5 14 -14 11 -19 -4 -5 -10 -7 -15 -4 -5 3 -11 1 -15 -5 -3 -5 -1 -10 6 -10 9 0 9 -4 -1 -15 -10 -12 -7 -15 14 -21 21 -5 32 -1 51 20 17 18 25 22 25 12 0 -8 -7 -21 -15 -29 -17 -18 -7 -31 12 -16 7 6 13 7 13 2 0 -14 37 -13 50 2 8 9 7 14 -5 19 -11 4 -14 2 -9 -6 5 -8 2 -9 -10 -5 -10 4 -19 7 -22 7 -2 0 1 12 7 28 13 33 13 33 1 41 -6 4 -4 11 4 19 12 11 14 10 14 -4 0 -10 2 -15 5 -12 12 11 -8 58 -24 59 -9 0 2 7 24 16 22 9 43 21 46 26 3 5 9 2 12 -7 4 -9 13 -16 22 -16 8 0 15 -7 15 -16 0 -10 -6 -14 -15 -10 -22 8 -20 -38 3 -60 16 -17 16 -17 0 -11 -10 3 -20 2 -23 -3 -3 -5 -12 -7 -19 -4 -18 7 -13 -45 6 -58 7 -5 58 -7 113 -6 l100 3 5 -52 c3 -32 2 -51 -5 -50 -5 1 -9 -7 -8 -18 1 -11 -2 -22 -6 -25 -4 -3 -11 -17 -15 -32 -5 -23 -3 -28 11 -28 48 1 73 59 72 167 -1 83 -12 103 -59 107 -19 2 -47 7 -62 11 -22 6 -28 4 -28 -9 0 -9 -7 -16 -15 -16 -19 0 -20 -2 15 72 33 69 37 97 18 117 -11 12 -10 13 6 7 16 -6 18 -2 12 31 -6 35 -5 37 9 19 23 -30 19 2 -5 42 -22 36 -25 46 -10 37 14 -9 12 1 -6 37 -9 16 -11 27 -5 24 6 -4 11 -3 11 3 0 5 -5 13 -11 16 -6 4 -8 13 -5 21 5 12 -30 46 -44 43 -3 -1 -13 -3 -22 -6z m42 -133 c0 -5 -5 -10 -11 -10 -5 0 -7 5 -4 10 3 6 8 10 11 10 2 0 4 -4 4 -10z m-27 -50 c3 -12 0 -20 -8 -20 -8 0 -11 8 -8 20 3 11 7 20 8 20 1 0 5 -9 8 -20z m-236 -64 c22 -25 21 -38 -3 -29 -8 3 -14 11 -14 19 0 8 -4 14 -9 14 -7 0 -8 -15 -2 -55 1 -5 6 -3 11 5 5 8 10 10 10 4 0 -19 -12 -23 -30 -11 -15 9 -17 15 -8 31 6 12 11 22 10 24 -1 1 -2 7 -2 12 0 17 15 11 37 -14z m107 15 c3 -5 -1 -11 -9 -14 -9 -4 -12 -1 -8 9 6 16 10 17 17 5z m124 -42 c-2 -6 -8 -10 -13 -10 -5 0 -11 4 -13 10 -2 6 4 11 13 11 9 0 15 -5 13 -11z m-218 -36 c0 -5 -4 -14 -9 -22 -7 -10 -12 -11 -27 -1 -17 10 -17 11 -1 6 11 -3 20 0 23 9 6 16 14 20 14 8z m85 -23 c3 -6 -1 -7 -9 -4 -18 7 -21 14 -7 14 6 0 13 -4 16 -10z m130 -100 c3 -5 1 -10 -4 -10 -6 0 -11 5 -11 10 0 6 2 10 4 10 3 0 8 -4 11 -10z m-165 -12 c0 -4 -7 -8 -15 -8 -8 0 -18 0 -22 -1 -4 0 -9 4 -11 10 -2 6 7 10 22 9 14 -1 26 -6 26 -10z"/>
                    <path d="M127 760 c-41 -33 -57 -121 -40 -223 4 -28 8 -35 15 -25 6 8 7 3 3 -17 -4 -16 -8 -55 -10 -85 -2 -30 -1 -39 2 -20 5 36 22 66 24 40 0 -10 4 -7 9 5 8 18 9 18 9 2 1 -15 6 -13 26 11 14 17 25 38 26 48 0 18 1 17 9 -1 8 -18 9 -17 9 8 1 16 -2 26 -6 24 -5 -3 -9 5 -9 16 -1 12 -6 45 -11 74 -9 48 -8 52 12 63 12 7 31 10 41 8 20 -4 21 -12 9 -82 -5 -25 -1 -62 10 -102 17 -63 17 -64 -5 -99 -15 -24 -32 -38 -52 -42 -34 -7 -43 -25 -58 -119 -6 -36 -18 -76 -26 -89 -14 -21 -14 -27 0 -54 9 -16 16 -39 16 -50 0 -17 7 -20 50 -19 56 0 61 9 25 42 -26 24 -32 68 -19 134 7 36 82 122 106 122 8 0 27 9 41 20 l26 21 -20 39 c-19 36 -30 45 -51 41 -14 -2 -4 69 10 74 9 3 11 -1 7 -15 -4 -11 -2 -20 3 -20 5 0 12 9 15 21 3 12 10 18 15 15 6 -3 12 0 15 8 3 8 14 13 24 12 10 -2 24 3 32 11 7 8 20 12 27 9 8 -3 14 1 14 10 0 12 7 15 26 11 20 -3 33 2 50 21 13 14 24 32 25 41 0 9 2 24 4 34 2 9 0 15 -4 12 -5 -2 -17 2 -27 9 -17 13 -16 14 11 10 l30 -4 -33 12 c-29 10 -35 8 -56 -11 -21 -20 -24 -21 -23 -4 2 14 -6 18 -38 20 -22 2 -47 3 -55 4 -28 4 -51 -1 -46 -9 2 -4 -6 -9 -20 -10 -13 -1 -24 3 -24 9 0 5 -11 21 -25 34 -30 31 -82 33 -118 5z m378 -70 c3 -6 -1 -7 -9 -4 -18 7 -21 14 -7 14 6 0 13 -4 16 -10z m31 -27 c-10 -10 -19 5 -10 18 6 11 8 11 12 0 2 -7 1 -15 -2 -18z m-100 -46 c21 -12 17 -26 -8 -36 -17 -6 -28 -3 -45 13 -12 11 -19 25 -15 31 4 5 6 19 5 30 -2 11 0 14 3 8 6 -14 35 -18 33 -5 -1 4 0 12 1 17 2 6 5 -3 7 -20 3 -16 11 -34 19 -38z"/>
                    <path d="M520 580 c-8 -5 -12 -12 -9 -15 4 -3 12 1 19 10 14 17 11 19 -10 5z"/>
                    <path d="M680 516 c0 -8 -3 -23 -7 -33 -6 -15 -4 -16 9 -6 8 7 18 10 21 6 4 -3 7 1 7 11 0 9 -4 14 -10 11 -6 -3 -7 1 -4 9 3 9 1 16 -5 16 -6 0 -11 -6 -11 -14z"/>
                    <path d="M833 382 c-15 -10 -25 -80 -12 -87 8 -6 13 8 10 28 0 4 4 6 10 5 6 -2 14 3 17 11 3 10 0 12 -12 8 -20 -8 -21 7 0 27 16 17 8 21 -13 8z"/>
                    <path d="M785 371 c-3 -5 -1 -12 5 -16 5 -3 10 1 10 9 0 18 -6 21 -15 7z"/>
                    <path d="M366 331 c-10 -11 -15 -25 -11 -31 5 -8 15 -4 31 14 13 14 24 28 24 31 0 12 -28 3 -44 -14z"/>
                    <path d="M567 190 c3 -11 10 -20 17 -20 6 0 4 -5 -4 -11 -12 -8 -12 -12 -2 -16 10 -4 10 -8 0 -21 -12 -15 -11 -16 4 -3 17 13 18 35 3 74 -10 24 -24 22 -18 -3z"/>
                    <path d="M740 152 c-11 -35 -11 -44 1 -58 8 -9 12 -27 11 -40 -3 -23 0 -24 48 -24 55 0 54 -1 18 52 -10 14 -18 33 -18 41 0 9 -10 28 -23 43 l-23 26 -14 -40z"/>
                  </g>
                </svg>
              </motion.div>
            </a>
          </Link>
          {navBarTitle ? (
            <p
              className={`ml-2 font-medium ${
                !showTitle ? 'hidden' : 'hidden xl:block'
              }`}
            >
              {navBarTitle}
            </p>
          ) : (
            <p
              className={`ml-2 font-medium ${
                !showTitle ? 'hidden' : 'hidden xl:block'
              }`}
            >
              {BLOG.title},{' '}
              <span className='font-normal'>{BLOG.description}</span>
            </p>
          )}
        </div>
        <NavBar />
      </div>
    </>
  )
}

export default Header
