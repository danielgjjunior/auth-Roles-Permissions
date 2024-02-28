// src/index.ts
import express from 'express';
import routes from './routes/index';
import fileUpload from 'express-fileupload';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', routes);

app.use(fileUpload());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
