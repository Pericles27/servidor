import express from "express";
import getKey from "./Funciones/Key.js";
import Cotizaciones from "./Funciones/Cotizaciones.js";
import CotizacionesUSA from "./Funciones/AccionesUSA.js";
import AccionesARG from "./Funciones/AccionesARG.js";
import ADRs from "./Funciones/ADRs.js";
import cors from "cors";
const app = express();
const port = 3000;
app.use(cors());

app.get("/", (req, res) => {
    res.send("<h1>Bienvenido al servidor hecho con express</h1>")
});

app.get("/yo", async (req, res) => {
    try {
        const key = await getKey();
        res.send(key);
    } catch (error) {
        res.status(500).send(`${error}`);
    }
});

app.get("/bonos", async (req, res) => {
    try {
        const data = await Cotizaciones()
        res.send(data);
    } catch (error) {
        res.status(500).send(`${error}`);
    }
});

app.get("/usa", async (req, res) => {
    try {
        const data = await CotizacionesUSA()
        res.send(data);
    } catch (error) {
        res.status(500).send(`${error}`);
    }
});

app.get("/adrs", async (req, res) => {
    try {
        const data = await ADRs()
        res.send(data);
    } catch (error) {
        res.status(500).send(`${error}`);
    }
});
app.get("/Merval", async (req, res) => {
    try {
        const data = await AccionesARG()
        res.send(data);
    } catch (error) {
        res.status(500).send(`${error}`);
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});



