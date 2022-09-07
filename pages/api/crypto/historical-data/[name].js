import * as Cors from "cors"
import corsMiddleware from "../../../../utils/corsMiddleware"

import { DOMParser, parseHTML } from 'linkedom';

import canvas from "canvas";
import axios from "axios";
import jsdom from "jsdom";

// Initializing the cors middleware
const cors = Cors({
	methods: ['GET', 'HEAD'],
})

export default async function handler(req, res) {
	try {
		await corsMiddleware(req, res, cors);
		// frequency => 1d, 1wk, 1mo
		const frequency = req.query.frequency || "1d";
		const name = req.query.name.toUpperCase() || "btc";
		const url =
			`https://finance.yahoo.com/quote/${name}-USD/history?filter=history&frequency=${frequency}&interval=${frequency}`;
		var response = await axios.get(url);
		const html = await response.data;
		const {
			window, document, customElements,
			HTMLElement,
			Event, CustomEvent
		} = parseHTML(html)
		const length = document.querySelectorAll("tr").length;
		const data = [];
		var i = 1;
		for (var tr in document.querySelectorAll("tr")) {
			if (i < length - 1) {
				const date = document.querySelectorAll("tr")[i].querySelectorAll("td")[0].textContent
				const open = document.querySelectorAll("tr")[i].querySelectorAll("td")[1].textContent
				const high = document.querySelectorAll("tr")[i].querySelectorAll("td")[2].textContent
				const low = document.querySelectorAll("tr")[i].querySelectorAll("td")[3].textContent
				const close = document.querySelectorAll("tr")[i].querySelectorAll("td")[4].textContent
				const adj_close = document.querySelectorAll("tr")[i].querySelectorAll("td")[5].textContent
				const volume = document.querySelectorAll("tr")[i].querySelectorAll("td")[6].textContent
				data.push({
					date,
					open,
					high,
					low,
					close,
					adj_close,
					volume
				})
			} else {
				break;
			}
			i++;
		}
		console.log(data);
		res.status(200).json({ name, data });
		
	} catch (e) {
		console.log(e);
		res.status(503).json({ error: e.code })
	}
}