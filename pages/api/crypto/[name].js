import * as Cors from "cors"
import corsMiddleware from "../../../utils/corsMiddleware"

import { DOMParser, parseHTML } from 'linkedom';

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
		const name = req.query.name.toUpperCase() || "btc";
		const url =
			`https://finance.yahoo.com/quote/${name}-usd`;
		response = await axios.get(url);
		const html = await response.data;
		const {
			window, document, customElements,
			HTMLElement,
			Event, CustomEvent
		} = parseHTML(html)
		const price = document.querySelector('[data-test="qsp-price"]')?.textContent || "N/A";
		const change = document.querySelector('[data-test="qsp-price-change"]')?.textContent || "N/A"
		const changePercent = document.querySelectorAll('[data-field="regularMarketChangePercent"]')[6]?.textContent || "N/A"
		const previousClose = document.querySelector('[data-test="PREV_CLOSE-value"]')?.textContent || "N/A"
		const open = document.querySelector('[data-test="OPEN-value"]').textContent;
		const daysRange = document.querySelector('[data-test="DAYS_RANGE-value"]')?.textContent || "N/A"
		const _52WeekRange = document.querySelector('[data-test="FIFTY_TWO_WK_RANGE-value"]')?.textContent || "N/A"
		const startDate = document.querySelector('[data-test="START_DATE-value"]')?.textContent || "N/A"
		const algorithm = document.querySelector('[data-test="ALGORITHM-value"]')?.textContent || "N/A"
		const marketCap = document.querySelector('[data-test="MARKET_CAP-value"]')?.textContent || "N/A"
		const circulatingSupply = document.querySelector('[data-test="CIRCULATING_SUPPLY-value"]')?.textContent || "N/A"
		const maxSupply = document.querySelector('[data-test="MAX_SUPPLY-value"]')?.textContent || "N/A"
		const volume = document.querySelector('[data-test="TD_VOLUME-value"]')?.textContent || "N/A"
		const volume24Hr = document.querySelector('[data-test="TD_VOLUME_24HR-value"]')?.textContent || "N/A"
		res.status(200).json({
			name,
			price,
			change,
			changePercent,
			previousClose,
			open,
			daysRange,
			_52WeekRange,
			startDate,
			algorithm,
			marketCap,
			circulatingSupply,
			maxSupply,
			volume,
			volume24Hr
		})
	} catch (e) {
		console.log(e);
		res.status(503).json({ error: e.code })
	}
}