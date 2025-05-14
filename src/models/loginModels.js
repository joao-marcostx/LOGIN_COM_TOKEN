import db from "../conexao.js";
import mysql from "mysql2/promise";

const conexao = mysql.createPool(db);

export const cadastrarUsuario = async (req, res) => {
  console.log("função cadastarUsuario foi usada ");

  const params = req.body;
  const { nome, senha, email } = params;
  const query = `INSERT INTO usuario  (nome, senha, email) VALUES (?, ?, ?)`;
  try {
    const [rows] = await conexao.query(query, [nome, senha, email]);
    res.status(200).json({ message: "Usuario cadastrado com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const listarUsuarios = async (req, res) => {
  console.log("função listarUsuarios foi usada ");

  const query = `SELECT * FROM usuario`;

  try {
    const [rows] = await conexao.query(query);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const filtrarUsuario = async (req, res) => {
  console.log("função filtrarUsuario foi usada ");
  const { id } = req.params;
  const query = `SELECT * FROM usuario WHERE id_usuario = ?`;
  try {
    const [rows] = await conexao.query(query, [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Usuario não encontrado" });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const atualizarUsuario = async (req, res) => {
  console.log("função atualizarUsuario foi usada ");
  const { id } = req.params;
  const params = req.body;
  const { nome, senha, email } = params;
  const query = `UPDATE usuario SET nome = ?, senha = ?, email = ? WHERE id_usuario = ?`;
  try {
    const [rows] = await conexao.query(query, [nome, senha, email, id]);
    if (rows.affectedRows === 0) {
      return res.status(404).json({ message: "Usuario não encontrado" });
    }
    res.status(200).json({ message: "Usuario atualizado com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletarUsuario = async (req, res) => {
    console.log("função deletarUsuario foi usada ");
    const { id } = req.params;
    const query = `DELETE FROM usuario WHERE id_usuario = ?`;
    try {
        const [rows] = await conexao.query(query, [id]);
        if (rows.affectedRows === 0) {
        return res.status(404).json({ message: "Usuario não encontrado" });
        }
        res.status(200).json({ message: "Usuario deletado com sucesso!" });
    } catch (error) {
        res.status(500).json({ message: error.message  });
    }
    }
