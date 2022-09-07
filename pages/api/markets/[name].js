import * as Cors from "cors"
import corsMiddleware from "../../../utils/corsMiddleware"

import { DOMParser, parseHTML } from 'linkedom';

import axios from "axios";

// Initializing the cors middleware
const cors = Cors({
	methods: ['GET', 'HEAD'],
})

export default async function handler(req, res) {
	try {
		await corsMiddleware(req, res, cors);
		const name = req.query.name.toUpperCase() || "btc";
		const url =
			`https://finance.yahoo.com/quote/${name}`;
		var response = await axios.get(url);
		const html = await response.data;
		const {
			window, document, customElements,
			HTMLElement,
			Event, CustomEvent
		} = parseHTML(html)
		const fullName = document.querySelector('[data-test="quote-header"]')?.getElementsByTagName("h1")[0].textContent || "N/A";
		const price = document.querySelector('[data-test="qsp-price"]')?.textContent || "N/A";
		const change = document.querySelector('[data-test="qsp-price-change"]')?.textContent || "N/A"
		const changePercent = document.querySelectorAll('[data-field="regularMarketChangePercent"]')[6]?.textContent || "N/A"
		const previousClose = document.querySelector("[data-test='PREV_CLOSE-value']")?.textContent || "N/A";
		const open = document.querySelector("[data-test='OPEN-value']")?.textContent || "N/A";
		const bid = document.querySelector("[data-test='BID-value']")?.textContent || "N/A";
		const ask = document.querySelector("[data-test='ASK-value']")?.textContent || "N/A";
		const dayRange = document.querySelector("[data-test='DAYS_RANGE-value']")?.textContent || "N/A";
		const _52WeekRange = document.querySelector("[data-test='FIFTY_TWO_WK_RANGE-value']")?.textContent || "N/A";
		const volume = document.querySelector("[data-test='TD_VOLUME-value']")?.textContent || "N/A";
		const avgVolume = document.querySelector("[data-test='AVERAGE_VOLUME_3MONTH-value']")?.textContent || "N/A";
		const marketCap = document.querySelector("[data-test='MARKET_CAP-value']")?.textContent || "N/A";
		const beta = document.querySelector("[data-test='BETA_3Y-value']")?.textContent || "N/A";
		const peRatio = document.querySelector("[data-test='PE_RATIO-value']")?.textContent || "N/A";
		const eps = document.querySelector("[data-test='EPS_RATIO-value']")?.textContent || "N/A";
		const earningsDate = document.querySelector("[data-test='EARNINGS_DATE-value']")?.textContent || "N/A";
		const forwardDividend = document.querySelector("[data-test='DIVIDEND_AND_YIELD-value']")?.textContent || "N/A";
		const exDividendDate = document.querySelector("[data-test='EX_DIVIDEND_DATE-value']")?.textContent || "N/A";
		const oneYearTargetEst = document.querySelector("[data-test='ONE_YEAR_TARGET_PRICE-value']")?.textContent || "N/A";
		const data = {
			fullName,
			price,
			change,
			changePercent,
			previousClose,
			open,
			bid,
			ask,
			dayRange,
			_52WeekRange,
			volume,
			avgVolume,
			marketCap,
			beta,
			peRatio,
			eps,
			earningsDate,
			forwardDividend,
			exDividendDate,
			oneYearTargetEst,
		}

		res.status(200).json(data);
		
	} catch (e) {
		console.log(e);
		res.status(503).json({ error: e.code })
	}
}