const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const pool = new Pool({
  connectionString: 'postgresql://GxbrielLeno:mcbg0pOvK6ux@ep-sweet-art-93850706.us-east-2.aws.neon.tech/lista_negra_email?sslmode=require',
  ssl: {
    rejectUnauthorized: false, // Para evitar erros relacionados a certificados SSL em alguns ambientes.
  },
});

app.get('/unsubscribe', (req, res) => {
  const userEmail = req.query.email;

  if (userEmail) {
    const insertQuery = 'INSERT INTO tabela_emails (email) VALUES ($1)';

    pool.query(insertQuery, [userEmail], (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Erro ao processar a solicitação.');
      } else {
        console.log(`E-mail ${userEmail} adicionado ao banco de dados.`);
        res.send('Você foi removido da lista de e-mails.');
      }
    });
  } else {
    res.status(400).send('Endereço de e-mail inválido.');
  }
});

app.listen(3333, () => {
  console.log(`Rodando na porta 3333`);
});
