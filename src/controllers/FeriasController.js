/**
 * Arquivo: FeriasController.js
 * Descrição: Responsável por gerenciar as Férias
 * Data: 12/05/2020
 * Autor: Matheus Ricardo Brunelli
 */

const db = require('../config/database')

module.exports = {
    // Listar Férias
    async listAll(req, res) {
        try {
            const response = await db.query("SELECT * FROM ferias")
            return res.json(response.rows)
        } catch (err) {
            return res.status(400).json({
                error: true,
                message: `Erro ao listar férias: ${err}`
            })
        }
    },

    // Listar Férias pelo id
    async listById(req, res) {
        try {
            const response = await db.query(`SELECT * FROM ferias WHERE idferias = ${req.params.id}`)

            // Verificar se retornou algum resultado
            if (response.rowCount == 0) {
                return (
                    res.status(400).json({
                        error: true,
                        message: 'Férias não encontrada!',
                        rows: `Linhas executadas: ${err}`
                    })
                )
            }

            return res.json(response.rows)
        } catch (err) {
            return res.status(400).json({
                error: true,
                message: `Erro ao listar férias: ${err}`
            })
        }
    },

    // Cadastrar Férias
    async createNew(req, res) {
        // Pegar conteúdo do body da requisição
        const {
            idcolaborador,
            data,
        } = req.body

        const data_inicio = data[0]
        const data_fim = data[1]

        try {
            await db.query("INSERT INTO ferias (idcolaborador, data_inicio, data_fim) VALUES ($1, $2, $3)",
                [idcolaborador, data_inicio, data_fim]
            )
            return res.json({
                error: false,
                message: 'Férias cadastrada com sucesso!'
            })
        } catch (err) {
            return res.status(400).json({
                error: true,
                message: `Erro ao cadastrar férias: ${err}`
            })
        }
    },
}