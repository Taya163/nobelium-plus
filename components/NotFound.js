import Link from 'next/link'
import { lang } from '@/lib/lang'
import { useRouter } from 'next/router'

const Page404 = ({ statusCode }) => {
  const { locale } = useRouter()
  const t = lang[locale]
  return (
    <div className='py-6 sm:py-8 lg:py-12'>
      <div className='max-w-screen-2xl px-4 md:px-8 mx-auto'>
        <div className='flex flex-col items-center'>
          <div className='inline-flex items-center gap-2.5 mb-8'>
            <img
                src='/logo.png'
                alt='Logo'
                width={20}
                height={20}
             />
          </div>

          <p className='text-sm md:text-base font-semibold uppercase mb-4'>
            {t.ERROR.MESSAGE}
          </p>
          <h1 className='text-2xl md:text-3xl font-bold text-center mb-2'>
            {statusCode
              ? `${statusCode} - ${t.ERROR.TITLE}`
              : `Error - ${t.ERROR.TITLE}`}
          </h1>

          <p className='max-w-screen-md md:text-lg text-center mb-12'>
            {t.ERROR.HELP_TEXT}
          </p>

          <Link href='/' scroll={false}>
            <a className='inline-block bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-sm md:text-base font-semibold text-center rounded-lg outline-none px-8 py-3'>
              {t.ERROR.BACK_TO_HOME}
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Page404
