import { createClient } from '@supabase/supabase-js';
import { supabaseUrl, supabaseKey } from '@env';

export const supabase = createClient(supabaseUrl, supabaseKey);
