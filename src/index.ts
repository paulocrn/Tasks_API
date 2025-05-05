import express from 'express';
import cors from 'cors';
import router from './interfaces/Routes/routes';

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api', router);

app.listen(3000, () => console.log('🚀 API corriendo en el puerto 3000'));