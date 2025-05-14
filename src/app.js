import express from "express";
import cors from "cors";
import { atualizarUsuario, cadastrarUsuario, deletarUsuario, filtrarUsuario, listarUsuarios  } from "./models/loginModels.js";

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3000;

app.post("/login", cadastrarUsuario);
app.get("/mostrar", listarUsuarios);
app.get("/mostrar/:id", filtrarUsuario);
app.put("/atualizar/:id",atualizarUsuario);
app.delete("/deletar/:id", deletarUsuario);


app.get("/", (req, res) => {
  res.send("API funcionando");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});
