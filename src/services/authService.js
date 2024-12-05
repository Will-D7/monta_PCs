import { supabase } from './supabaseClient';

export const signUp = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.error('Error during sign-up: ', error.message);
    return error.message; // Devuelve el error si ocurre uno
  }

  console.log('User registered: ', data.user);
  return data.user; // Devuelve el usuario registrado
};
