import express from 'express';
import router from './routes';

const app = express();

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Servidor UP en ${port}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);
