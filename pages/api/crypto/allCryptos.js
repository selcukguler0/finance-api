import * as Cors from "cors"
import corsMiddleware from "../../../utils/corsMiddleware"

import canvas from "canvas";
import axios from "axios";
import jsdom from "jsdom";

// Initializing the cors middleware
const cors = Cors({
	methods: ['GET', 'HEAD'],
})

export default async function handler(req, res) {
	var response;
	try {
		await corsMiddleware(req, res, cors);
		const page = (req.query.page * 100) - 100 || 0;
		const count = req.query.count || 25;
		const url =
			`https://finance.yahoo.com/cryptocurrencies?offset=${page}&count=${count}`;
		response = await axios.get(url);
		const html = await response.data;
		const dom = new jsdom.JSDOM(html);
		const length = dom.window.document.querySelectorAll('[aria-label="Name"]').length
		const xSymbol = dom.window.document.querySelectorAll('[data-test="quoteLink"]')
		const xName = dom.window.document.querySelectorAll('[aria-label="Name"]')
		const xPrice = dom.window.document.querySelectorAll('[data-field="regularMarketPrice"]')
		const xChange = dom.window.document.querySelectorAll('[data-field="regularMarketChange"]')
		const xChangePercent = dom.window.document.querySelectorAll('[data-field="regularMarketChangePercent"]')
		const xMarketCap = dom.window.document.querySelectorAll('[data-field="marketCap"]')
		const xVolume = dom.window.document.querySelectorAll('[aria-label="Volume in Currency (Since 0:00 UTC)"]')
		const xVolume24h = dom.window.document.querySelectorAll('[aria-label="Volume in Currency (24Hr)"]')
		const xTotalVolume = dom.window.document.querySelectorAll('[aria-label="Total Volume All Currencies (24Hr)"]')
		const xCirculatingSupply = dom.window.document.querySelectorAll('[aria-label="Circulating Supply"]')
		const x52WeekHigh = dom.window.document.querySelectorAll('[aria-label="52 Week Range"]')
		const xDayChart = dom.window.document.querySelectorAll('[aria-label="Day Chart"]')
		const cryptos = []
		var i = 0;
		console.log(dom.window.document.querySelectorAll('[aria-label="52 Week Range"]')[0].getElementsByTagName("canvas")[0].toDataURL());
		for (var x in xName) {
			cryptos.push({
				name: xName[i]?.textContent,
				price: xPrice[i]?.textContent,
				change: xChange[i]?.textContent,
				changePercent: xChangePercent[i]?.textContent,
				marketCap: xMarketCap[i]?.textContent,
				"Volume in Currency (Since 0:00 UTC)": xVolume[i]?.textContent,
				"Volume in Currency (24Hr)": xVolume24h[i]?.textContent,
				totalVolume: xTotalVolume[i]?.textContent,
				circulatingSupply: xCirculatingSupply[i]?.textContent,
			// 	_52WeekHigh: x52WeekHigh[i]?.getElementsByTagName("canvas")[0].toDataURL(),
			// 	dayChart: xDayChart[i]?.getElementsByTagName("canvas")[0].toDataURL()
			})
			i++;
			if (i >= length) {
				break;
			}
		}
		res.status(200).json({ count, page: (page / 100) + 1, cryptos })
	} catch (e) {
		console.log(e);
		res.status(503).json({ error: e.code })
	}
}




