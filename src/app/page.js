'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [formulario, setFormulario] = useState({
    nombre: '',
    apellido: '',
    direccion: '',
    telefono: '',
    correo: '',
    ciudad: '',
  });

  const [usuarios, setUsuarios] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({
      ...formulario,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/registrar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formulario),
    });

    const data = await res.json();
    if (data.success) {
      alert('Registro guardado correctamente');
      setFormulario({
        nombre: '',
        apellido: '',
        direccion: '',
        telefono: '',
        correo: '',
        ciudad: '',
      });
      fetchUsuarios(); // Recarga la lista después de guardar
    } else {
      alert('Hubo un error al guardar');
    }
  };

  const fetchUsuarios = async () => {
    const res = await fetch('/api/usuarios');
    const data = await res.json();
    setUsuarios(data);
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  return (
    <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '50px' }}>
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: '#fff',
          borderRadius: '8px',
          padding: '30px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          width: '100%',
          maxWidth: '400px',
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
        }}
      >
        <h2 style={{ textAlign: 'center' }}>Formulario de Registro</h2>

        <label>Nombre</label>
        <input type="text" name="nombre" value={formulario.nombre} onChange={handleChange} required />

        <label>Apellido</label>
        <input type="text" name="apellido" value={formulario.apellido} onChange={handleChange} required />

        <label>Dirección</label>
        <input type="text" name="direccion" value={formulario.direccion} onChange={handleChange} required />

        <label>Teléfono</label>
        <input type="tel" name="telefono" value={formulario.telefono} onChange={handleChange} required />

        <label>Correo electrónico</label>
        <input type="email" name="correo" value={formulario.correo} onChange={handleChange} required />

        <label>Ciudad de residencia</label>
        <input type="text" name="ciudad" value={formulario.ciudad} onChange={handleChange} required />

        <button
          type="submit"
          style={{
            marginTop: '10px',
            padding: '10px',
            backgroundColor: '#3b82f6',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          Enviar
        </button>
      </form>

    </main>
  );
}
