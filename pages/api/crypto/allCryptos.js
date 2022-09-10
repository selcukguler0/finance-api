import * as Cors from "cors"
import corsMiddleware from "../../../utils/corsMiddleware"

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
		const type = req.query.type || "advanced"; // advanced or basic
		const url =
			`https://finance.yahoo.com/cryptocurrencies?offset=${page}&count=${count}&type=${type}`;
		response = await axios.get(url);
		const html = await response.data;
		const dom = new jsdom.JSDOM(html);
		const length = dom.window.document.querySelectorAll('[aria-label="Name"]').length
		const xSymbol = dom.window.document.querySelectorAll('[aria-label="Symbol"]')
		const xName = dom.window.document.querySelectorAll('[aria-label="Name"]')
		const xPrice = dom.window.document.querySelectorAll('[data-field="regularMarketPrice"]')
		const xChange = dom.window.document.querySelectorAll('[data-field="regularMarketChange"]')
		const xChangePercent = dom.window.document.querySelectorAll('[data-field="regularMarketChangePercent"]')
		const xMarketCap = dom.window.document.querySelectorAll('[data-field="marketCap"]')
		const xVolume = dom.window.document.querySelectorAll('[aria-label="Volume in Currency (Since 0:00 UTC)"]')
		const xVolume24h = dom.window.document.querySelectorAll('[aria-label="Volume in Currency (24Hr)"]')
		const xTotalVolume = dom.window.document.querySelectorAll('[aria-label="Total Volume All Currencies (24Hr)"]')
		const xCirculatingSupply = dom.window.document.querySelectorAll('[aria-label="Circulating Supply"]')
		// const x52WeekHigh = dom.window.document.querySelectorAll('[aria-label="52 Week Range"]')
		// const xDayChart = dom.window.document.querySelectorAll('[aria-label="Day Chart"]')
		const cryptos = []
		const cryptosBasic = []
		var i = 0;
		console.log(dom.window.document.querySelectorAll('[aria-label="52 Week Range"]')[0].getElementsByTagName("canvas")[0].toDataURL());
		for (var x in xName) {
			cryptos.push({
				name: xName[i]?.textContent,
				symbol: xSymbol[i]?.getElementsByTagName("img")[0]?.src,
				price: xPrice[i]?.textContent,
				change: xChange[i]?.textContent,
				changePercent: xChangePercent[i]?.textContent,
				marketCap: xMarketCap[i]?.textContent,
				"VolumeSince0:00UTC": xVolume[i]?.textContent,
				"Volume24Hr": xVolume24h[i]?.textContent,
				totalVolume: xTotalVolume[i]?.textContent,
				circulatingSupply: xCirculatingSupply[i]?.textContent,
			// 	_52WeekHigh: x52WeekHigh[i]?.getElementsByTagName("canvas")[0].toDataURL(),
			// 	dayChart: xDayChart[i]?.getElementsByTagName("canvas")[0].toDataURL()
			})
			cryptosBasic.push({
				name: xName[i]?.textContent,
				symbol: xSymbol[i]?.getElementsByTagName("img")[0]?.src,
				price: xPrice[i]?.textContent,
			})
			i++;
			if (i >= length) {
				break;
			}
		}
		if (type === "advanced") {
			res.status(200).json({ page: (page / 100) + 1, count, data: cryptos })
		} else {
			res.status(200).json({ page: (page / 100) + 1, count, data: cryptosBasic })
		}
	} catch (e) {
		console.log(e);
		res.status(503).json({ error: e.code })
	}
}




