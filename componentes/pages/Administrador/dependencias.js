import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zveylnnhomwptidyucah.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2ZXlsbm5ob213cHRpZHl1Y2FoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIwNzQ3MTYsImV4cCI6MjA0NzY1MDcxNn0.pR3uoc20ByHNdQYuDMcYe7dcrNDHSW14rbpmtp_CUU0';
export const supabase = createClient(supabaseUrl, supabaseKey);