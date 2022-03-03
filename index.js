const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { pool } = require('./config')

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

const getOrganizacao = (request, response) => {
    pool.query('SELECT * FROM organizacao', (error, results) => {
        if (error) {
            return response.status(401).json({status: 'error', 
            message: 'Erro: ' + error});
        }
        response.status(200).json(results.rows)
    })
}

const addOrganizacao = (request, response) => {
    const { nome, fundacao, localicade } = request.body

    pool.query(
        'INSERT INTO organizacao (nome, fundacao, localicade) VALUES ($1, $2, $3)',
        [nome, fundacao, localicade],
        (error) => {
            if (error) {
                return response.status(401).json({ status: 'error', 
                message: 'Erro: ' + error });
            }
            response.status(201).json({ status: 'success', message: 'Organização criada.' })
        },
    )
}

const updateOrganizacao = (request, response) => {
    const { codigo, nome, fundacao, localicade } = request.body
    pool.query('UPDATE organizacao set nome=$1, fundacao=$2, localicade=$3 where codigo=$4',
        [nome, fundacao, localicade, codigo], error => {
            if (error) {
                return response.status(401).json({ status: 'error', 
                message: 'Erro: ' + error });
            }
            response.status(201).json({ status: 'success', message: 'Organização atualizada.' })
        })
}

const deleteOrganizacao = (request, response) => {    
    const codigo = parseInt(request.params.id);
    pool.query('DELETE FROM organizacao where codigo = $1', [codigo], error => {
        if (error) {
            return response.status(401).json({ status: 'error', 
            message: 'Erro: ' + error });
        }
        response.status(201).json({ status: 'success', message: 'Organização apagada.' })
    })
}

const getOrganizacaoPorID = (request, response) => {
    const codigo = parseInt(request.params.id);
    pool.query('SELECT * FROM organizacao where codigo = $1', [codigo], (error, results) => {
        if (error) {
            return response.status(401).json({ status: 'error', 
            message: 'Erro: ' + error });
        }
        response.status(200).json(results.rows)
    })
}

app
    .route('/organizacao')
    // GET endpoint
    .get(getOrganizacao)
    // POST endpoint
    .post(addOrganizacao)
    // PUT
    .put(updateOrganizacao)  

app.route('/organizacao/:id')
    .get(getOrganizacaoPorID) 
    .delete(deleteOrganizacao) 


// Start server
app.listen(process.env.PORT || 3002, () => {
    console.log(`Servidor rodando na porta 3002`)
})