export const PASSWORD_MIN_LENGTH = 4;
export const PASSWORD_MAX_LENGTH = 20;
export const USERNAME_REGEX = new RegExp(/^[a-zA-Z0-9가-힣]+$/);
export const PASSWORD_REGEX = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*?[#?!@$%^&*()\-]).+$/);
export const PASSWORD_REGEX_ERROR = "Must have lowercase, UPPERCASE, a number, special charters";
export const SUPABASE_PROJECT_URL = "https://qbiigyqzdhttexxzfntf.supabase.co"
export const SUPABASE_PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFiaWlneXF6ZGh0dGV4eHpmbnRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIwMjY3MjAsImV4cCI6MjA2NzYwMjcyMH0.bxW-GtEV-yxEjOLUCnD63LVqG6IpRFXA_YtfXXOm_EU";