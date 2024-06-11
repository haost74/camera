import express from 'express'
require('dotenv').config
import axios from 'axios';


const app = express();
const port = process.env.port || 3000

// создаем парсер для данных application/x-www-form-urlencoded
const urlencodedParser = express.urlencoded({extended: false});

const fetchData = async () => {
    const url = process.env.API_URL;
    const apiKey = process.env.API_KEY;
  
    try {
      const response = await axios.get(url, {
        headers: { 'Authorization': `Bearer ${apiKey}` }
      });
      console.log(response.data);
    } catch (error) {
      console.error(`Error fetching data: ${error}`);
    }
  };


  app.use(express.static(__dirname + '/public'));

  
app.get("/", function (_, response) {
    fetchData()
    //response.sendFile('build/index.html', { root: '.' })
    response.sendFile(__dirname + "/public" + "/index.html");
});

app.post("/", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    console.log(request.body);
    response.send(`${request.body.userName} - ${request.body.userAge}`);
});
   
app.listen(port, () => console.log(`Example app listening on port ${port}!`));