import '../styles/globals.css'
import 'nextra-theme-docs/style.css'

//code highlight for json
import Prism from 'prism-react-renderer/prism'
import Head from 'next/head'
(typeof global !== "undefined" ? global : window).Prism = Prism
require("prismjs/components/prism-json")
require("prismjs/components/prism-json5")
require("prismjs/components/prism-jsonp")

function MyApp({ Component, pageProps }) {
	return <>
		<Head>
			{/* <title>Yahoo Finance Api</title> */}
		</Head>
		<Component {...pageProps} />
	</>
}

export default MyApp
