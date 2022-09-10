import Image from "next/image"
export default {
	projectLink: 'https://github.com/selcukguler0/finance-api', // GitHub link in the navbar
	nextLinks: true,
	prevLinks: true,
	search: true,
	customSearch: null, // customizable, you can use algolia for example
	darkMode: true,
	footer: true,
	footerText: `MIT ${new Date().getFullYear()} © Selçuk Güler.`,
	footerEditLink: false, // will link to the docs repo
	logo: (
		<>
			<Image src="/logo.png" alt="me" width="32" height="32" /> &amp;
			<span>Yahoo Finance Api</span>
		</>
	),
	head: (
		<>
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<meta name="description" content="The yahoo finance api is a simple and intuitive way for developers to access and integrate the functionality of finance.yahoo.com with other applications. Whether you're building a mobile app or looking for a ticker for your personal website, the Yahoo Finance API can help take your product to the next level." />
			<meta name="og:title" content="Yahoo Finance Api" />
			<meta name="title" content="Yahoo Finance Api" />
			<title>Yahoo Finance Api</title>
			<script
				lang="javascript"
				dangerouslySetInnerHTML={{
					__html: `
					if (!window.localStorage.getItem("theme_default")) {
      window.localStorage.setItem("theme", "dark");
      window.localStorage.setItem("theme_default", "dark");
    }
		if(typeof window !== "undefined") {
			document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
			}`,
				}}
			/>;
		</>
	),

}
