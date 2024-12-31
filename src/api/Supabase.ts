import axios from 'axios';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

const supabase = axios.create({
  baseURL: supabaseUrl,
  headers: {
    Authorization: `Bearer ${supabaseKey}`,
    apikey: supabaseKey,
  },
});

export default supabase;
