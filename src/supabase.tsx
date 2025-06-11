import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tsmtiqjmxnugejumwydn.supabase.co'; 
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzbXRpcWpteG51Z2VqdW13eWRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyMzU0MTgsImV4cCI6MjA2MjgxMTQxOH0.ifoFueopjy-togPs5tozOQ_CWQ04y2PNqq9QT5fWHnI';             

export const supabase = createClient(supabaseUrl, supabaseKey);