import express from 'express'
import mongoose from 'mongoose'

const Libro = mongoose.model('Libro', new mongoose.Schema({
  autor: String,
  titulo: String,
}));

const app = express();

mongoose.connect('mongodb://dani:passwd@monguito:27017/miapp?authSource=admin');

app.get('/', async (_req, res) => {
  console.log('Buscando... libros...')
  const libros = await Libro.find()
  return res.send(libros)
});

app.get('/cargar', async(_req, res) => {
  console.log('Cargando libro...')
  await Libro.create({ autor: 'Ghibli', titulo: 'La Princesa Mononoke' })
  return res.send('Ok')
});

app.listen(3000, () => console.log('Listening on port:3000...'))