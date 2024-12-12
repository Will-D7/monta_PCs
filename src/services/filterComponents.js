import { supabase } from "./supabaseClient";

// Filtrar RAM compatible con una Placa Madre
export async function obtenerRAMCompatible(idPlaca) {
  try {
    // Obtenemos todas las RAM compatibles para la placa
    const { data: ramPlacaData, error: ramPlacaError } = await supabase
      .from("ram_placa")
      .select("id_ram")
      .eq("id_placa", idPlaca);

    if (ramPlacaError) throw new Error("Error al obtener relaciones RAM-Placa: " + ramPlacaError.message);

    const idsRAMCompatibles = ramPlacaData.map((ram) => ram.id_ram);

    // Obtenemos los detalles de las RAM compatibles
    const { data, error } = await supabase
      .from("ram")
      .select("id_ram, nombre, tipo, capacidad, frecuencia")
      .in("id_ram", idsRAMCompatibles);

    if (error) throw new Error("Error al obtener RAM compatibles: " + error.message);

    return data;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
}

// Filtrar Procesadores compatibles con una Placa Madre
export async function obtenerProcesadoresCompatibles(idPlaca) {
  try {
    // Obtenemos el socket de la placa seleccionada
    const { data: placaData, error: placaError } = await supabase
      .from("placa_madre")
      .select("socket")
      .eq("id_placa", idPlaca)
      .single();

    if (placaError) throw new Error("Error al obtener el socket de la placa: " + placaError.message);

    const socketPlaca = placaData?.socket;
    if (!socketPlaca) throw new Error("El socket de la placa no está definido");

    // Filtramos procesadores con socket compatible
    const { data, error } = await supabase
      .from("procesador")
      .select("id_procesador, nombre, socket, nucleos, velocidad_base, velocidad_max")
      .eq("socket", socketPlaca);

    if (error) throw new Error("Error al obtener procesadores compatibles: " + error.message);

    return data;
  } catch (err) {
    console.error(err.message);
    throw err;
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
      .select("id_disco, nombre, tipo, capacidad, puerto_d")
      .in("id_disco", idsDiscosCompatibles);

    if (error) throw new Error("Error al obtener discos compatibles: " + error.message);

    return data;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
}
