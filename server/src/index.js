import express  from 'express';
import cors from 'cors';
import convertToRoman from './convertToRoman.js';

const port = 5000

var app = express();

app.use(cors(
  {
    origin: ['http://localhost:3000'],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
))

let result
app.get('/getRomanNumberXHR', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  try {
    result = JSON.stringify({data: convertToRoman(req.query.number)})
    res.status(200).send(result);
  } catch (error) {
    result = JSON.stringify({error: error.message})
    res.status(400).send(result);
  }
});

app.get('/sse', (req, res) => {
  const headers = {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  }
  res.writeHead(200, headers)
  setInterval(() => {
    res.write("data: " + result + "\n\n")
  }, 500);
  result = undefined
})

app.listen(port, () => {
  console.log(`🚀 server started on port ${port}`)
})