import { supabase } from "./supabaseClient";

// Filtrar RAM compatible con una Placa Madre
export async function obtenerRAMCompatible(idPlaca) {
  try {
    const { data: ramPlacaData, error: ramPlacaError } = await supabase
      .from("ram_placa")
      .select("id_ram")
      .eq("id_placa", idPlaca);

    if (ramPlacaError) throw new Error("Error al obtener relaciones RAM-Placa: " + ramPlacaError.message);

    const idsRAMCompatibles = ramPlacaData.map((ram) => ram.id_ram);

    const { data, error } = await supabase
      .from("ram")
      .select(`
        id_ram, 
        nombre, 
        tipo, 
        capacidad, 
        frecuencia, 
        componente (
          imagenurl,
          precio 
        )
      `)
      .in("id_ram", idsRAMCompatibles);

    if (error) throw new Error("Error al obtener RAM compatibles: " + error.message);

    return data.map(item => ({
      id_ram: item.id_ram,
      nombre: item.nombre,
      tipo: item.tipo,
      capacidad: item.capacidad,
      frecuencia: item.frecuencia,
      imgURL: item.componente?.imagenurl || '',
      price: item.componente?.precio || 0,
    }));
  } catch (err) {
    console.error(err);
    return [];
  }
}

// Filtrar Procesadores compatibles con una Placa Madre
export async function obtenerProcesadoresCompatibles(idPlaca) {
  try {
    console.log(`Buscando procesadores para la placa con ID: ${idPlaca}`);

    // Validar que idPlaca no sea null o undefined
    if (!idPlaca) {
      console.error("ID de placa es null o undefined");
      return [];
    }

    // Primero, obtener información detallada de la placa madre
    const { data: placaData, error: placaError } = await supabase
      .from('placa_madre')
      .select('socket')
      .eq('id_placa', idPlaca)
      .single();

    if (placaError) {
      console.error("Error al obtener detalles de la placa:", placaError);
      return [];
    }

    console.log("Socket de la placa madre:", placaData.socket);

    // Buscar procesadores compatibles por socket
    const { data, error } = await supabase
      .from('procesador')
      .select(`
        id_procesador, 
        nombre, 
        socket, 
        nucleos, 
        velocidad_base, 
        velocidad_max,
        componente (
          imagenurl,
          precio
        )
      `)
      .eq('socket', placaData.socket);

    console.log("Procesadores encontrados:", data);
    console.log("Error al buscar procesadores:", error);

    if (error) throw error;

    // Verificar si hay datos
    if (!data || data.length === 0) {
      console.log(`No se encontraron procesadores para el socket ${placaData.socket}`);
      return [];
    }

    // Mapear los resultados
    const procesadores = data.map(item => ({
      id_procesador: item.id_procesador,
      nombre: item.nombre,
      socket: item.socket,
      nucleos: item.nucleos,
      velocidad_base: item.velocidad_base,
      velocidad_max: item.velocidad_max,
      imgURL: item.componente?.imagenurl || '',
      price: item.componente?.precio || 0,
    }));

    console.log("Procesadores mapeados:", procesadores);

    return procesadores;
  } catch (err) {
    console.error("Error completo en obtenerProcesadoresCompatibles:", err);
    return [];
  }
}

// Filtrar Discos compatibles con una Placa Madre
export async function obtenerDiscosCompatibles(idPlaca) {
  try {
    // Obtenemos las relaciones de discos con la placa
    const { data: discoPlacaData, error: discoPlacaError } = await supabase
      .from("disco_placa")
      .select("id_disco")
      .eq("id_placa", idPlaca);

    if (discoPlacaError) throw new Error("Error al obtener relaciones Disco-Placa: " + discoPlacaError.message);

    const idsDiscosCompatibles = discoPlacaData.map((disco) => disco.id_disco);

    // Obtenemos los detalles de los discos compatibles
    const { data, error } = await supabase
      .from("disco")
      .select(`
        id_disco, 
        nombre, 
        tipo, 
        capacidad, 
        puerto_d,
        componente (
          imagenurl,
          precio
        )
      `)
      .in("id_disco", idsDiscosCompatibles);

    if (error) throw new Error("Error al obtener discos compatibles: " + error.message);

    return data.map(item => ({
      id_disco: item.id_disco,
      nombre: item.nombre,
      tipo: item.tipo,
      capacidad: item.capacidad,
      puerto_d: item.puerto_d,
      imgURL: item.componente?.imagenurl || '',
      price: item.componente?.precio || 0,
    }));
  } catch (err) {
    console.error(err.message);
    throw err;
  }
}