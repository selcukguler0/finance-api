export default {
	projectLink: 'https://github.com/shuding/nextra', // GitHub link in the navbar
	docsRepositoryBase: 'https://github.com/shuding/nextra/blob/master', // base URL for the docs repository
	// titleSuffix: 'Yahoo Finance Api',
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
			<svg>...</svg>
			<span>Finance Api</span>
		</>
	),
	head: (
		<>
			{/* <meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<meta name="description" content="Yahoo Finance Api:" /> */}
			<script
				lang="javascript"
				dangerouslySetInnerHTML={{
					__html: `if (!window.localStorage.getItem("theme_default")) {
      window.localStorage.setItem("theme", "dark");
      window.localStorage.setItem("theme_default", "dark");
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    }`,
				}}
			/>;
		</>
	),

}
