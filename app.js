const express = require('express');
const bodyParser = require('body-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const cors = require('cors'); // Adicione esta linha

const app = express();
const port = 3000;

app.use(cors()); // Adicione esta linha para habilitar o CORS
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const csvWriter = createCsvWriter({
  path: 'unsubscribe_emails.csv',
  header: [
    { id: 'email', title: 'Email' },
  ],
});

app.post('/unsubscribe', (req, res) => {
  const userEmail = req.body.email;

  if (userEmail) {
    csvWriter.writeRecords([{ email: userEmail }])
      .then(() => {
        console.log(`E-mail ${userEmail} adicionado ao arquivo CSV.`);
        res.send('Você foi removido da lista de e-mails.');
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Erro ao processar a solicitação.');
      });
  } else {
    res.status(400).send('Endereço de e-mail inválido.');
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
