// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ohhbjtmwtyqgdpuqakqm.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9oaGJqdG13dHlxZ2RwdXFha3FtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg3ODA2MTgsImV4cCI6MjA1NDM1NjYxOH0.pxOVehWHmFQJG6S6dYMTqr9ZmYmkdt9r_ZyHw7BJigY";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);