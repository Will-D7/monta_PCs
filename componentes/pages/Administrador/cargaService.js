import { supabase } from './dependencias';
export const crearComponenteService = async (componenteData) => {
    try {
  
      const atributosJSONB = componenteData.atributos 
        ? (typeof componenteData.atributos === 'string' 
          ? componenteData.atributos 
          : JSON.stringify(componenteData.atributos)) 
        : null;
  
      console.log('Datos a insertar:', {
        tipo: componenteData.tipo,
        nombre: componenteData.nombre,
        descripcion: componenteData.descripcion || null,
        precio: componenteData.precio,
        consumo: componenteData.consumo,
        atributos: atributosJSONB,
        imagenURL: componenteData.imagenURL || null
      });
  
      const { data, error } = await supabase
        .from('Componente')
        .insert({
          tipo: componenteData.tipo,
          nombre: componenteData.nombre,
          descripcion: componenteData.descripcion || null,
          precio: componenteData.precio,
          consumo: componenteData.consumo,
          atributos: atributosJSONB,
          imagenURL: componenteData.imagenURL || null
        })
        .select();
  
      if (error) {
        console.error('Supabase Insertion Error:', {
          message: error.message,
          code: error.code,
          details: error.details,
          hint: error.hint,
          fullError: error
        });
        throw new Error(error.message || 'Error al insertar componente');
      }
  
      return data[0];
    } catch (error) {
      console.error('Catch Block Error:', error);
      throw error;
    }
  };
  
  // Función para obtener atributos específicos de un tipo de componente
  export const obtenerAtributosEspecificos = (tipo) => {
    switch(tipo) {
      case 'Procesador':
        return [
          { nombre: 'socket', tipo: 'texto', requerido: true },
          { nombre: 'nucleos', tipo: 'numero', requerido: true },
          { nombre: 'velocidad_base', tipo: 'decimal', requerido: true },
          { nombre: 'velocidad_max', tipo: 'decimal', requerido: false }
        ];
      case 'RAM':
        return [
          { nombre: 'tipo', tipo: 'texto', requerido: true },
          { nombre: 'capacidad', tipo: 'numero', requerido: true },
          { nombre: 'frecuencia', tipo: 'numero', requerido: true }
        ];
      case 'Placa Madre':
        return [
          { nombre: 'chipset', tipo: 'texto', requerido: true },
          { nombre: 'socket', tipo: 'texto', requerido: true },
          { nombre: 'slots_ram', tipo: 'numero', requerido: true },
          { nombre: 'tipo_ram', tipo: 'texto', requerido: true },
          { nombre: 'puertos_pcie', tipo: 'texto', requerido: false },
          { nombre: 'puertos_disco', tipo: 'texto', requerido: false }
        ];
      case 'GPU':
        return [
          { nombre: 'version_pcie', tipo: 'texto', requerido: true },
          { nombre: 'memoria', tipo: 'numero', requerido: true }
        ];
      case 'Disco':
        return [
          { nombre: 'tipo', tipo: 'texto', requerido: true },
          { nombre: 'capacidad', tipo: 'numero', requerido: true },
          { nombre: 'puerto_d', tipo: 'texto', requerido: true }
        ];
      case 'Ventilador':
        return [
          { nombre: 'tipo', tipo: 'texto', requerido: true },
          { nombre: 'tamaño', tipo: 'texto', requerido: true }
        ];
      case 'Gabinete':
        return [
          { nombre: 'tamañoAncho', tipo: 'numero', requerido: true },
          { nombre: 'tamañoLargo', tipo: 'numero', requerido: true }
        ];
      case 'Fuente Poder':
        return [
          { nombre: 'potencia', tipo: 'numero', requerido: true },
          { nombre: 'eficiencia', tipo: 'texto', requerido: false }
        ];
      default:
        return [];
    }
  };