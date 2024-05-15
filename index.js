import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const host = "localhost";
const port = 3000;
const api_URL = "http://api.weatherapi.com/v1";
const apiKey = "7bbcaee52971411f9d163707241305";
const currentWeather = "/current.json";
const forecastWeather = "/forecast.json";
const q = "10.772275245077545,106.65790179558195";
const lang = "en";


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    try {
        const currData = await axios.get(api_URL + currentWeather, {
            params: {
                key: apiKey,
                q: q,
                lang: lang,
            },
        });
        const forecastData = await axios.get(api_URL + forecastWeather, {
            params: {
                key: apiKey,
                q: q,
                lang: lang,
            },
        });
        res.render("index.ejs", {
            data: currData.data, 
            location: currData.data.location.name,
            temperature: currData.data.current.temp_c,
            feelLike: currData.data.current.feelslike_c,
            condition: currData.data.current.condition.text,
            conditionIcon: currData.data.current.condition.icon,
            forecast: forecastData.data.forecast.forecastday[0].hour.slice(0,6),
         });
    } catch (error) {
        res.status(404).send(error.message);
        }
});

app.post("/weather", async (req, res) => {
    try {
        const query = req.body.city;
        const currData = await axios.get(api_URL + currentWeather, {
            params: {
                key: apiKey,
                q: query,
                lang: lang,
            },
        });
        const forecastData = await axios.get(api_URL + forecastWeather, {
            params: {
                key: apiKey,
                q: query,
                lang: lang,
            },
        });
        res.render("index.ejs", {
            data: currData.data, 
            location: currData.data.location.name,
            temperature: currData.data.current.temp_c,
            feelLike: currData.data.current.feelslike_c,
            condition: currData.data.current.condition.text,
            conditionIcon: currData.data.current.condition.icon,
            forecast: forecastData.data.forecast.forecastday[0].hour.slice(0,6),
         });
    } catch (error) {
        res.status(404).send(error.message);
        }
});



app.listen(port, () => {
    console.log(`Server is running at http://${host}:${port}`);
});