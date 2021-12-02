import express from 'express';
import router from './routes';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import { parserConfiguration } from 'yargs';

const parser = yargs(hideBin(process.argv)).options({
  port: { type: 'string', default: '8080' },
});

const app = express();

// const port = argv.port || 8080;

const port = async () => {
  const argv = await parser.argv;
  return argv.port;
};

app.listen(port(), () => {
  console.log(`Servidor UP en ${port()}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);
