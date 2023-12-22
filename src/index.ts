import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import express from 'express';
import { PORT } from './constants';
import { InputCriteriaDTO } from './dtos/input-criteria.dto';
import { InputCriteria } from './interfaces/input-criteria.interface';
import { eligibilityCriteria } from './service';


const app = express();
app.use(express.json());

app.get('/', (_, res) => {
  res.status(200).json({data: "server on"})
});

app.post('/',async (req, res) => {
  try {
    const payload: InputCriteria = req.body;
    const inputCriteria= plainToInstance(InputCriteriaDTO, payload);
    
    const errors = await validate(inputCriteria, { whitelist: true });
    if(!!errors.length) throw errors.map(item => ({ property: item.property, constraints: item.constraints }));

    const aux = eligibilityCriteria(inputCriteria);
    res.status(201).json(aux);
  } catch (error) {
    res.status(400).json(error)
  }
});

app.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});
