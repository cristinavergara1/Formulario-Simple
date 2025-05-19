import Database from 'better-sqlite3';
import path from 'path';

const db = new Database(path.join(process.cwd(), 'formulario.db'));

// Crear tabla si no existe
db.exec(`
  CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT,
    apellido TEXT,
    direccion TEXT,
    telefono TEXT,
    correo TEXT,
    ciudad TEXT
  )
`);

export default db;
