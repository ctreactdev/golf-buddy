import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://bxajwjfrfiyhxtloqsel.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ4YWp3amZyZml5aHh0bG9xc2VsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDIyNzc0MTksImV4cCI6MjAxNzg1MzQxOX0.l9OVklybEUu_SUh8eEfPNcCv2ESRMOTkHGHig-YUblE";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
