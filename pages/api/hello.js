export default async function handler(req, res) {
	const url = "https://www.google.com/search?q=hello+world";
	const response = await axios.get(url);
	const html = response.data;
	const dom = new jsdom.JSDOM(html);
	console.log(dom.window.document.querySelector("title").textContent);
	res.status(200).json({ name: dom.window.document.querySelector("title").textContent })
}
