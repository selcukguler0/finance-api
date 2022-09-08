import '../styles/globals.css'
import 'nextra-theme-docs/style.css'

//code highlight for json
import Prism from 'prism-react-renderer/prism'
(typeof global !== "undefined" ? global : window).Prism = Prism
require("prismjs/components/prism-kotlin")
require("prismjs/components/prism-csharp")

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
