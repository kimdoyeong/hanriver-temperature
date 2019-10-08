const http = require("http");
const axios = require("axios");
const cheerio = require("cheerio");

let data;
async function refresh() {
    const r = await axios.get("http://koreawqi.go.kr/wQSCHomeLayout_D.wq?action_type=T");
    const $ = cheerio.load(r.data);
    data = $(".table_01 .site_S01004 > .avg1")
        .text()
        .trim();
    console.log(data);
    
}

refresh().then(() => {
  const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.statusCode = 200;
    res.end(data);
  });
  server.listen(process.env.PORT || 3001);

  setInterval(refresh, 1000 * 60 * 5); //5분 간격으로 Refresh
});

