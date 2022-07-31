import { getAllNotes } from '@/lib/craft'
import BLOG from '@/blog.config'

module.exports = async (req, res) => {
  const { pathname, slug } = req.query
  console.log('pathname: ', pathname)
  console.log('slug: ', slug)

  const noteItem = await getNoteItem(pathname)
  console.log('htmlrewrite noteItem: ', noteItem)
  if (noteItem === undefined) {
    res.statusCode = 404
    res.end(
      'Notes Not Found, Make sure you have the correct pathname and check your Craft.do setting page.'
    )
    return
  }
  const craftUrl = noteItem.link

  // console.log('htmlrewrite craftUrl: ', craftUrl)
  const response = await fetch(craftUrl)
  const originResText = await response.text()
  const modifyResText = originResText
    .replace('<meta name="robots" content="noindex">', '')
    .replace(
      '<link rel="icon" href="/share/static/favicon.ico">',
      '<link rel="icon" href="/favicon.svg">'
    )
    .replace(
      '<link rel="apple-touch-icon" href="/share/static/logo-192.png">',
      '<link rel="apple-touch-icon" href="/apple-touch-icon.png">'
    )
    .replace(
      '<link href="https://fonts.googleapis.com/css?family=Roboto+Mono:300,300i,400,400i,500,500i,700,700i&amp;display=swap" rel="stylesheet"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&amp;display=swap" rel="stylesheet">',
      ''
    )
    .replace(
      '<meta name="luki:api-endpoint" content="https://www.craft.do/api">',
      '<meta name="luki:api-endpoint" content="/api">'
    )
    .replace(
      '<script async src="https://www.craft.do/assets/js/analytics2.js"></script>',
      ''
    )
    .replace('</head><body', headStr + '</head><body')
    .replace('</body></html>', bodyStr + '</body></html>')

  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.send(modifyResText)
}

async function getNoteItem(path) {
  const notesObj = await getAllNotes()
  for (let i = 0; i < notesObj.length; i++) {
    const noteItem = notesObj[i]
    console.log('getNoteItem path: ', path)
    console.log('getNoteItem noteItem: ', noteItem)
    if (path === noteItem.path) {
      return noteItem
    }
  }
}

const headStr = `
  <style>
    .navigation {
      position: fixed;
      top: 0;
      right: 0;
      z-index: 99;
    }
    .navigation__checkbox {
      display: none;
    }

    .navigation__button {
      position: absolute;
      top: 0.5rem;
      right: 1.25rem;
      padding-top: 0.4rem;
      height: 2rem;
      width: 2rem;
      text-align: center;
      border-radius: 50%;
      z-index: 98;
      cursor: pointer;
    }
    .navigation__logo:hover {
      color: blue;
    }
    .navigation__title {
      position: fixed;
      top: 0.5rem;
      right: 3rem;
      visibility: hidden;
      margin: 0.2rem 1rem;
      color: gray;
      font-size: 1rem;
      z-index: 98;
      transition: all 200ms ease-out;
    }

    .navigation__background {
      position: fixed;
      top: 0.65rem;
      right: 1.25rem;
      height: 2rem;
      width: 2rem;
      border-radius: 50%;
      z-index: 97;
      transition: all 400ms cubic-bezier(0.86, 0, 0.07, 1);
    }
    .navigation__nav {
      position: fixed;
      top: 0;
      right: 0;
      opacity: 0;
      width: 100%;
      visibility: hidden;
      z-index: 97;
      transition: all 400ms ease-in;
    }

    .navigation__list {
      position: absolute;
      top: 4rem;
      right: 1rem;
      list-style: none;
    }
    .navigation__item {
      margin: 0.5rem;
      text-align: right;
    }

    .navigation__link:link,
    .navigation__link:visited {
      display: inline-block;
      padding: 0.5rem 1rem;
      color: #494b4e;
      font-size: 1.2rem;
      text-decoration: none;
      transition: all 0.2s;
    }
    .navigation__link:hover {
      color: #494b4e;
      transform: scale(1.2);
    }

    .navigation__icon {
      position: fixed;
      top: 15rem;
      right: 0;
      visibility: hidden;
      margin: 0.8rem 2rem;
      z-index: 98;
      transition: all 200ms ease-out;
    }
    .navigation__icon a {
      top: 0;
      right: 0;
      display: inline-block;
      width: 1rem;
      margin: 0.5rem;
      z-index: 98;
    }
    .navigation__icon a:hover {
      opacity: 0.7;
    }

    .navigation__checkbox:checked ~ .navigation__background {
      background: #F6F8FA;
      transform: rotate(45deg) translateY(12px) translateX(12px);
      box-shadow: 0 0 20px rgb(0 0 0 / 20%);
      height: 500px;
      width: 500px;
      right: -160px;
      top: -160px;
      border-radius: 50%;
    }
    .navigation__checkbox:checked ~ .navigation__title {
      visibility: visible;
      opacity: 1;
    }
    .navigation__checkbox:checked ~ .navigation__icon {
      visibility: visible;
      opacity: 1;
    }
    .navigation__checkbox:checked ~ .navigation__nav {
      width: 100%;
      visibility: visible;
      opacity: 1;
    }

    .footer {
      position: absolute;
      top: 18rem;
      right: 2rem;
      color: #b7c0c3;
      font-size: 0.8rem;
    }
  </style>
`

/* 你可以调整为使用图片, 而不是使用 svg
<a aria-label="toggle navigation menu" class="navigation__logo">
  <img alt="logo" class="logo" src="/favicon.svg" />
</a>
*/

const bodyStr = `
  <div class="navigation">
    <input type="checkbox" class="navigation__checkbox" id="nav-toggle" />
    <label for="nav-toggle" class="navigation__button">
      <a aria-label="toggle navigation menu" class="navigation__logo">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 100 100">
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
      </a>
    </label>
    <div class="navigation__background"></div>

    <p class="navigation__title">${BLOG.notes}</p>

    <nav class="navigation__nav" role="navigation">
      <ul class="navigation__list">
        <li class="navigation__item">
          <a href="${BLOG.notesLink.index}" class="navigation__link">${BLOG.notesNav.index}</a>
        </li>
        <li class="navigation__item">
          <a href="${BLOG.notesLink.blog}" class="navigation__link">${BLOG.notesNav.blog}</a>
        </li>
        <li class="navigation__item">
          <a href="${BLOG.notesLink.contact}" target="_blank" class="navigation__link">${BLOG.notesNav.contact}</a>
        </li>
      </ul>
      <p class="footer">© CC BY-NC-SA 4.0</p>
    </nav>

    <div class="navigation__icon">
      <a target="_blank" href=${BLOG.socialLink.telegram}>
        <img alt="Telegram" src="data:image/svg+xml;base64,PHN2ZyByb2xlPSJpbWciIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+VGVsZWdyYW08L3RpdGxlPjxwYXRoIGZpbGw9ImdyYXkiIGQ9Ik0xMS45NDQgMEExMiAxMiAwIDAgMCAwIDEyYTEyIDEyIDAgMCAwIDEyIDEyIDEyIDEyIDAgMCAwIDEyLTEyQTEyIDEyIDAgMCAwIDEyIDBhMTIgMTIgMCAwIDAtLjA1NiAwem00Ljk2MiA3LjIyNGMuMS0uMDAyLjMyMS4wMjMuNDY1LjE0YS41MDYuNTA2IDAgMCAxIC4xNzEuMzI1Yy4wMTYuMDkzLjAzNi4zMDYuMDIuNDcyLS4xOCAxLjg5OC0uOTYyIDYuNTAyLTEuMzYgOC42MjctLjE2OC45LS40OTkgMS4yMDEtLjgyIDEuMjMtLjY5Ni4wNjUtMS4yMjUtLjQ2LTEuOS0uOTAyLTEuMDU2LS42OTMtMS42NTMtMS4xMjQtMi42NzgtMS44LTEuMTg1LS43OC0uNDE3LTEuMjEuMjU4LTEuOTEuMTc3LS4xODQgMy4yNDctMi45NzcgMy4zMDctMy4yMy4wMDctLjAzMi4wMTQtLjE1LS4wNTYtLjIxMnMtLjE3NC0uMDQxLS4yNDktLjAyNGMtLjEwNi4wMjQtMS43OTMgMS4xNC01LjA2MSAzLjM0NS0uNDguMzMtLjkxMy40OS0xLjMwMi40OC0uNDI4LS4wMDgtMS4yNTItLjI0MS0xLjg2NS0uNDQtLjc1Mi0uMjQ1LTEuMzQ5LS4zNzQtMS4yOTctLjc4OS4wMjctLjIxNi4zMjUtLjQzNy44OTMtLjY2MyAzLjQ5OC0xLjUyNCA1LjgzLTIuNTI5IDYuOTk4LTMuMDE0IDMuMzMyLTEuMzg2IDQuMDI1LTEuNjI3IDQuNDc2LTEuNjM1eiIvPjwvc3ZnPg==" />
      </a>
      <a target="_blank" href=${BLOG.socialLink.twitter}>
        <img alt="Twitter" src="data:image/svg+xml;base64,PHN2ZyByb2xlPSJpbWciIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+VHdpdHRlcjwvdGl0bGU+PHBhdGggZmlsbD0iZ3JheSIgZD0iTTIzLjk1MyA0LjU3YTEwIDEwIDAgMDEtMi44MjUuNzc1IDQuOTU4IDQuOTU4IDAgMDAyLjE2My0yLjcyM2MtLjk1MS41NTUtMi4wMDUuOTU5LTMuMTI3IDEuMTg0YTQuOTIgNC45MiAwIDAwLTguMzg0IDQuNDgyQzcuNjkgOC4wOTUgNC4wNjcgNi4xMyAxLjY0IDMuMTYyYTQuODIyIDQuODIyIDAgMDAtLjY2NiAyLjQ3NWMwIDEuNzEuODcgMy4yMTMgMi4xODggNC4wOTZhNC45MDQgNC45MDQgMCAwMS0yLjIyOC0uNjE2di4wNmE0LjkyMyA0LjkyMyAwIDAwMy45NDYgNC44MjcgNC45OTYgNC45OTYgMCAwMS0yLjIxMi4wODUgNC45MzYgNC45MzYgMCAwMDQuNjA0IDMuNDE3IDkuODY3IDkuODY3IDAgMDEtNi4xMDIgMi4xMDVjLS4zOSAwLS43NzktLjAyMy0xLjE3LS4wNjdhMTMuOTk1IDEzLjk5NSAwIDAwNy41NTcgMi4yMDljOS4wNTMgMCAxMy45OTgtNy40OTYgMTMuOTk4LTEzLjk4NSAwLS4yMSAwLS40Mi0uMDE1LS42M0E5LjkzNSA5LjkzNSAwIDAwMjQgNC41OXoiLz48L3N2Zz4=" />
      </a>
      <a target="_blank" href=${BLOG.socialLink.github}>
        <img alt="Giithub" src="data:image/svg+xml;base64,PHN2ZyByb2xlPSJpbWciIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+R2l0SHViPC90aXRsZT48cGF0aCBmaWxsPSJncmF5IiBkPSJNMTIgLjI5N2MtNi42MyAwLTEyIDUuMzczLTEyIDEyIDAgNS4zMDMgMy40MzggOS44IDguMjA1IDExLjM4NS42LjExMy44Mi0uMjU4LjgyLS41NzcgMC0uMjg1LS4wMS0xLjA0LS4wMTUtMi4wNC0zLjMzOC43MjQtNC4wNDItMS42MS00LjA0Mi0xLjYxQzQuNDIyIDE4LjA3IDMuNjMzIDE3LjcgMy42MzMgMTcuN2MtMS4wODctLjc0NC4wODQtLjcyOS4wODQtLjcyOSAxLjIwNS4wODQgMS44MzggMS4yMzYgMS44MzggMS4yMzYgMS4wNyAxLjgzNSAyLjgwOSAxLjMwNSAzLjQ5NS45OTguMTA4LS43NzYuNDE3LTEuMzA1Ljc2LTEuNjA1LTIuNjY1LS4zLTUuNDY2LTEuMzMyLTUuNDY2LTUuOTMgMC0xLjMxLjQ2NS0yLjM4IDEuMjM1LTMuMjItLjEzNS0uMzAzLS41NC0xLjUyMy4xMDUtMy4xNzYgMCAwIDEuMDA1LS4zMjIgMy4zIDEuMjMuOTYtLjI2NyAxLjk4LS4zOTkgMy0uNDA1IDEuMDIuMDA2IDIuMDQuMTM4IDMgLjQwNSAyLjI4LTEuNTUyIDMuMjg1LTEuMjMgMy4yODUtMS4yMy42NDUgMS42NTMuMjQgMi44NzMuMTIgMy4xNzYuNzY1Ljg0IDEuMjMgMS45MSAxLjIzIDMuMjIgMCA0LjYxLTIuODA1IDUuNjI1LTUuNDc1IDUuOTIuNDIuMzYuODEgMS4wOTYuODEgMi4yMiAwIDEuNjA2LS4wMTUgMi44OTYtLjAxNSAzLjI4NiAwIC4zMTUuMjEuNjkuODI1LjU3QzIwLjU2NSAyMi4wOTIgMjQgMTcuNTkyIDI0IDEyLjI5N2MwLTYuNjI3LTUuMzczLTEyLTEyLTEyIi8+PC9zdmc+" />
      </a>
    </div>

  </div>
`
