import { Router } from 'express';
import { searchByPreferences, searchByName } from '../controllers/search';

export const searchRouter = Router();

searchRouter.post('/preferences', searchByPreferences);
searchRouter.post('/name', searchByName);