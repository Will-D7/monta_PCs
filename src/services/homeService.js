import { supabase } from './supabaseClient';

export const obtenerComponentesDestacados = async () => {
  try {
    const { data, error } = await supabase
      .from('componente')
      .select('id_componente, nombre, imagenurl, tipo, precio')
      .limit(6);  // Limitar a 6 componentes

    if (error) throw error;

    return data.map(item => ({
      id: item.id_componente,
      title: item.nombre,
      price: item.tipo,  
      imageUrl: item.imagenurl
    }));
  } catch (error) {
    console.error('Error al obtener componentes destacados:', error);
    return [];
  }
};