import db from '@/lib/db';

export async function GET() {
  try {
    const stmt = db.prepare('SELECT * FROM usuarios');
    const usuarios = stmt.all();
    return Response.json(usuarios);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    return Response.json({ error: 'Error al obtener usuarios' }, { status: 500 });
  }
}
