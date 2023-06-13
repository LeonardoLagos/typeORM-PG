import express from "express";
import { routes } from './database/services/routes';

const app = express();

app.use(express.json())
app.use(routes)
app.listen(8000, () => console.log("server running"));