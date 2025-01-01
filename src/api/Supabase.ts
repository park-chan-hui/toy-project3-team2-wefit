import axios from 'axios';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

const supabase = axios.create({
  baseURL: supabaseUrl,
  headers: {
    Authorization: `Bearer ${supabaseKey}`,
    apikey: supabaseKey,
  },
});

export default supabase;
