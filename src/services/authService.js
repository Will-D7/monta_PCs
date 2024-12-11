import { supabase } from '../services/supabaseClient';

export const signUp = async (username, email, password) => {
  try {
    console.log('Registrando usuario...');
    console.log('Correo:', email);
    console.log('Contraseña:', password);
    console.log('Nombre de Usuario:', username);

    // Crear usuario en auth.users
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name: username },
      },
    });

    if (signUpError) {
      console.error('Error al crear el usuario en auth.users:', signUpError.message);
      return { error: signUpError };
    }

    console.log('Usuario creado en auth.users:', signUpData);

    const userId = signUpData.user?.id; // ID del usuario
    if (userId) {
      // Insertar usuario en la tabla personalizada 'usuarios'
      const { error: insertError } = await supabase
        .from('usuarios')
        .insert([{ user_id: userId, name: username, email: email }]);

      if (insertError) {
        console.error('Error al insertar en la tabla usuarios:', insertError.message);
        return { error: insertError };
      }

      console.log('Datos insertados en la tabla usuarios.');
    }

    return { success: true };
  } catch (err) {
    console.error('Error general en el proceso de registro:', err.message);
    return { error: { message: err.message } };
  }
};


//login

export const signInWithEmail =async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if(error) throw error;

    return data;

  } catch (err){
    console.error('Error al iniciar sesion: ', err.message);
    throw err;
  }
};

