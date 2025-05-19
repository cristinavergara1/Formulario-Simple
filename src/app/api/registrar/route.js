// src/app/api/registrar/route.js
import db from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const datos = await req.json();

    const stmt = db.prepare(`
      INSERT INTO usuarios (nombre, apellido, direccion, telefono, correo, ciudad)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    stmt.run(
      datos.nombre,
      datos.apellido,
      datos.direccion,
      datos.telefono,
      datos.correo,
      datos.ciudad
    );

    return NextResponse.json({ success: true, mensaje: 'Usuario guardado' });
  } catch (error) {
    console.error('Error en API:', error);
    return NextResponse.json(
      { success: false, mensaje: 'Error al guardar' },
      { status: 500 }
    );
  }
}
