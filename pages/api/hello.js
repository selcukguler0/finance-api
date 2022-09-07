import * as Cors from "cors"
import corsMiddleware from "../../utils/corsMiddleware"

// Initializing the cors middleware
const cors = Cors({
	methods: ['GET', 'HEAD'],
})

export default async function handler(req, res) {

  res.status(200).json({ name: 'John Doe' })
}
