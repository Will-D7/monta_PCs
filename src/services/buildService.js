import { supabase } from './supabaseClient';

// Función para guardar una build
export async function saveBuild(userId, buildName, selectedComponents) {
  try {
    // 1. Crear la build
    const { data: buildData, error: buildError } = await supabase
      .from('build')
      .insert({ nombre: buildName })
      .select()
      .single();

    if (buildError) throw buildError;

    // 2. Asociar la build con el usuario
    const { error: userBuildError } = await supabase
      .from('usuario_build')
      .insert({ 
        id_usuario: userId, 
        id_build: buildData.id_build 
      });

    if (userBuildError) throw userBuildError;

    // 3. Guardar los componentes de la build
    const buildComponentsData = selectedComponents.map(component => ({
      id_build: buildData.id_build,
      id_componente: component.id
    }));

    const { error: componentsError } = await supabase
      .from('build_componente')
      .insert(buildComponentsData);

    if (componentsError) throw componentsError;

    return buildData;
  } catch (error) {
    console.error('Error saving build:', error);
    throw error;
  }
}

// Función para obtener builds de un usuario
export async function getUserBuilds(userId) {
  try {
    const { data, error } = await supabase
      .from('usuario_build')
      .select(`
        build (
          id_build,
          nombre,
          fecha_creacion
        )
      `)
      .eq('id_usuario', userId);

    if (error) throw error;

    return data.map(item => item.Build);
  } catch (error) {
    console.error('Error fetching user builds:', error);
    throw error;
  }
}

// Función para cargar componentes de una build específica
export async function getBuildComponents(buildId) {
  try {
    const { data, error } = await supabase
      .from('build_componente')
      .select(`
        componente (
          id_componente,
          nombre,
          tipo,
          descripcion,
          imagenURL,
          precio
        )
      `)
      .eq('id_build', buildId);

    if (error) throw error;

    return data.map(item => item.Componente);
  } catch (error) {
    console.error('Error fetching build components:', error);
    throw error;
  }
}