const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const emailsFilePath = '/tmp/unsubscribe_emails.json';

app.post('/unsubscribe', async (req, res) => {
  const userEmail = req.body.email;

  if (userEmail) {
    try {
      // Lê os e-mails já existentes, se houver
      const existingEmails = JSON.parse(await fs.readFile(emailsFilePath, 'utf-8'));

      // Adiciona o novo e-mail à lista
      existingEmails.push({ email: userEmail });

      // Salva a lista atualizada no arquivo
      await fs.writeFile(emailsFilePath, JSON.stringify(existingEmails));

      console.log(`E-mail ${userEmail} adicionado à lista.`);
      res.send('Você foi removido da lista de e-mails.');
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao processar a solicitação.');
    }
  } else {
    res.status(400).send('Endereço de e-mail inválido.');
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
