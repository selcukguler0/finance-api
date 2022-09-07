import * as Cors from "cors"
import corsMiddleware from "../../utils/corsMiddleware"

import axios from "axios";
import jsdom from "jsdom";

// Initializing the cors middleware
const cors = Cors({
	methods: ['GET', 'HEAD'],
})

export default async function handler(req, res) {
	await corsMiddleware(req, res, cors);
	const url = "https://www.google.com/search?q=hello+world";
	const response = await axios.get(url);
	const html = response.data;
	const dom = new jsdom.JSDOM(html);
	console.log(dom.window.document.querySelector("title").textContent);
	res.status(200).json({ name: dom.window.document.querySelector("title").textContent })
}
