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
              
//                 <svg
//                   xmlns='http://www.w3.org/2000/svg'
//                   width='24'
//                   height='24'
//                   viewBox='0 0 100 100'
//                 >
//                   <g transform='translate(0.000000,100) scale(0.080000,-0.080000)'>
//                     <path d='M762 1203 c-6 -15 -13 -46 -17 -68 -4 -22 -13 -49 -20 -61 -15 -23 -122 -69 -257 -109 -49 -14 -88 -28 -88 -29 0 -2 33 -20 73 -40 49 -24 87 -36 115 -36 28 0 42 -4 42 -13 0 -34 -295 -517 -390 -639 -40 -52 -4 -28 86 56 49 46 105 109 124 141 19 31 64 98 100 148 77 108 125 186 173 283 20 39 46 78 59 86 13 8 69 34 126 58 107 45 118 57 110 111 -3 21 -10 25 -78 34 l-75 10 -5 45 c-5 42 -7 45 -36 48 -26 3 -33 -1 -42 -25z' />
//                     <path d='M754 616 c-40 -19 -88 -39 -108 -46 -43 -14 -45 -30 -7 -72 25 -28 33 -31 80 -30 39 1 54 -3 58 -15 7 -18 -30 -140 -58 -192 -36 -67 6 -93 135 -84 l86 6 0 -26 c0 -14 -4 -37 -10 -51 -5 -14 -8 -26 -6 -26 7 0 110 68 129 85 11 10 17 30 17 60 0 62 -22 70 -150 57 -52 -5 -98 -6 -103 -2 -4 3 3 31 16 61 13 30 32 78 42 108 10 30 28 70 41 89 26 38 30 63 14 93 -17 31 -91 25 -176 -15z' />
//                   </g>
//                 </svg>
<svg t="1659261557944" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4553" width="200" height="200"><path d="M1003.988341 920.409302c0 47.254822-38.308713 85.563535-85.563535 85.563535H105.575194c-47.254822 0-85.563535-38.308713-85.563535-85.563535s38.308713-85.563535 85.563535-85.563535h812.849612c47.254822 0 85.563535 38.308713 85.563535 85.563535z" fill="#A5A5A5" p-id="4554"></path><path d="M939.817674 321.464558v470.595473c0 47.254822-38.308713 85.571473-85.571472 85.571473h-684.492404c-47.26276 0-85.571473-38.316651-85.571472-85.571473V321.464558c0-47.254822 38.308713-85.563535 85.571472-85.563535h684.492404c47.26276 0 85.571473 38.308713 85.571472 85.571473z" fill="#CCCAC4" p-id="4555"></path><path d="M854.25414 834.845767H169.74586a42.785736 42.785736 0 0 1-42.785736-42.785736V321.464558a42.785736 42.785736 0 0 1 42.785736-42.785736h684.50828a42.785736 42.785736 0 0 1 42.785736 42.785736v470.595473a42.785736 42.785736 0 0 1-42.785736 42.785736z" fill="#F2EFE2" p-id="4556"></path><path d="M800.775938 412.378295H223.224062a32.085333 32.085333 0 0 1 0-64.170667h577.551876a32.085333 32.085333 0 0 1 0 64.170667zM490.607132 492.591628a32.085333 32.085333 0 0 0-32.085334-32.085333H223.224062a32.085333 32.085333 0 0 0 0 64.170666h235.297736a32.085333 32.085333 0 0 0 32.085334-32.085333z m342.254139 0a32.085333 32.085333 0 0 0-32.085333-32.085333H565.478202a32.085333 32.085333 0 0 0 0 64.170666h235.297736a32.085333 32.085333 0 0 0 32.085333-32.085333z" fill="#BFBBA3" p-id="4557"></path><path d="M800.775938 759.982636H223.224062a32.085333 32.085333 0 0 1-32.085333-32.085334V599.548031a32.085333 32.085333 0 0 1 32.085333-32.085333h577.551876a32.085333 32.085333 0 0 1 32.085333 32.085333v128.349271a32.085333 32.085333 0 0 1-32.085333 32.085334z" fill="#FFD880" p-id="4558"></path><path d="M288.466357 741.201364l-4.477024 4.484962 0.15876 0.158759-36.697302 36.705241a14.050233 14.050233 0 0 1-19.860838 0l-36.697302-36.705241 0.15876-0.158759-4.477023-4.484962a32.863256 32.863256 0 1 1 46.468961-46.468961l4.477023 4.484961 4.477023-4.484961a32.863256 32.863256 0 1 1 46.468962 46.468961z" fill="#FC8059" p-id="4559"></path><path d="M743.019163 583.862574l-42.785737 57.042356a21.392868 21.392868 0 0 1-34.212713 0l-42.785736-57.042356a21.392868 21.392868 0 0 1-4.286512-12.835721V64.773953a42.785736 42.785736 0 0 1 42.785737-42.777798h42.785736a42.785736 42.785736 0 0 1 42.785736 42.785736v506.244962c-0.007938 4.627845-1.508217 9.128682-4.286511 12.835721z" fill="#D6A154" p-id="4560"></path><path d="M731.25507 599.548031l-31.013706 41.356899a21.392868 21.392868 0 0 1-34.228589 0l-31.013705-41.356899h96.256z" fill="#B26932" p-id="4561"></path><path d="M618.956403 513.984496V64.773953a42.785736 42.785736 0 0 1 42.785737-42.777798h42.777798a42.785736 42.785736 0 0 1 42.785736 42.785736V513.984496h-128.357209z" fill="#FFD880" p-id="4562"></path><path d="M683.12707 513.984496V21.996155h21.392868a42.785736 42.785736 0 0 1 42.785736 42.785736V513.984496h-64.178604z" fill="#FCC159" p-id="4563"></path><path d="M747.297736 64.773953v42.785737H618.956403V64.773953a42.785736 42.785736 0 0 1 42.777799-42.777798h42.785736a42.785736 42.785736 0 0 1 42.777798 42.785736z" fill="#FC8059" p-id="4564"></path><path d="M950.708589 824.042171c3.341891-10.057426 5.151752-20.813395 5.151752-31.974202V321.464558c0-56.018357-45.579907-101.606202-101.606201-101.606201H763.340403V64.773953c0-32.426667-26.38586-58.820465-58.820465-58.820465h-42.785736c-32.434605 0-58.820465 26.393798-58.820466 58.820465v155.084404H169.737922c-56.026295 0-101.606202 45.587845-101.606201 101.606201v470.595473c0 11.168744 1.80986 21.916775 5.15969 31.974202A101.49507 101.49507 0 0 0 3.968992 920.409302c0 56.026295 45.579907 101.606202 101.606202 101.606202h812.849612c56.026295 0 101.606202-45.579907 101.606202-101.606202a101.487132 101.487132 0 0 0-69.322419-96.367131zM634.99907 64.773953a26.766884 26.766884 0 0 1 26.735132-26.735131h42.785736a26.766884 26.766884 0 0 1 26.735132 26.743069v26.735132H634.99907V64.773953z m96.256 58.828404v374.339472h-32.085334V123.602357h32.085334z m-96.256 0h32.085333v374.339472h-32.085333V123.602357z m0 406.424806H731.247132v40.99969a5.397829 5.397829 0 0 1-1.071628 3.206945l-42.785737 57.042357a5.247008 5.247008 0 0 1-4.270635 2.143256 5.247008 5.247008 0 0 1-4.286512-2.143256l-42.777798-57.034419a5.397829 5.397829 0 0 1-1.071628-3.214883v-40.99969zM100.224992 321.464558c0-38.332527 31.188341-69.520868 69.520868-69.520868h433.167876v319.083163c0 8.041178 2.651287 16.010915 7.48552 22.464496l42.785736 57.034418a37.110078 37.110078 0 0 0 29.942078 14.971039 37.118016 37.118016 0 0 0 29.950015-14.971039l42.785737-57.034418a37.665736 37.665736 0 0 0 7.485519-22.464496V251.94369h90.913737c38.332527 0 69.51293 31.196279 69.51293 69.528806v470.595473c0 38.332527-31.180403 69.520868-69.51293 69.520868H169.737922c-38.332527 0-69.520868-31.188341-69.520868-69.520868V321.464558zM918.424806 989.930171H105.575194c-38.340465 0-69.520868-31.188341-69.520868-69.520869a69.401798 69.401798 0 0 1 52.446263-67.393488c18.55107 24.671256 48.064496 40.658357 81.245271 40.658357h684.50828c33.180775 0 62.694202-15.987101 81.253209-40.666295a69.409736 69.409736 0 0 1 52.438325 67.401426c0 38.340465-31.188341 69.520868-69.520868 69.520869z m-572.201674-48.128a16.034729 16.034729 0 0 1-16.042667 16.034728H159.053395a16.034729 16.034729 0 1 1 0-32.077395h171.12707a16.034729 16.034729 0 0 1 16.034729 16.034729z m534.766139 0a16.034729 16.034729 0 0 1-16.034728 16.034728H544.077395a16.034729 16.034729 0 1 1 0-32.077395h320.861272a16.034729 16.034729 0 0 1 16.042666 16.034729z m-393.589085 0a16.034729 16.034729 0 0 1-16.042667 16.034728h-2.143255a16.034729 16.034729 0 1 1 0-32.077395h2.143255a16.034729 16.034729 0 0 1 16.042667 16.034729z m-66.313922 0a16.034729 16.034729 0 0 1-16.034729 16.034728h-2.143256a16.034729 16.034729 0 1 1 0-32.077395h2.143256a16.034729 16.034729 0 0 1 16.034729 16.034729z" fill="#4C4C4C" p-id="4565"></path></svg>
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
