export const PASSWORD_MIN_LENGTH = 4;
export const PASSWORD_MAX_LENGTH = 20;
export const USERNAME_REGEX = new RegExp(/^[a-zA-Z0-9가-힣]+$/);
export const PASSWORD_REGEX = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*?[#?!@$%^&*()\-]).+$/);
export const PASSWORD_REGEX_ERROR = "Must have lowercase, UPPERCASE, a number, special charters";
export const SUPABASE_PROJECT_URL = "https://fvejxpcbdmkopiczwpsn.supabase.co"
export const SUPABASE_PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ2ZWp4cGNiZG1rb3BpY3p3cHNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUwODA2NTksImV4cCI6MjA2MDY1NjY1OX0.0LUtmaxZUtaD-mbHDyioHjhOB9ZRTr6W7BtVAUZMuXc";
