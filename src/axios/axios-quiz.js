import axios from 'axios';
import data from './database';

export default axios.create({
  baseURL: data.database,
});