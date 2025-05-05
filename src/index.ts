import express from 'express';
import cors from 'cors';
import router from './interfaces/Routes/routes';

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api', router);

app.listen(PORT, () => console.log('🚀 API corriendo en el puerto 3000'));