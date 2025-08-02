import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
      setIsLoading(false);
      
      // Check if user needs shop setup after sign in
      if (event === 'SIGNED_IN' && session?.user) {
        setTimeout(async () => {
          const { data: profile } = await supabase
            .from('profiles')
            .select('shop_setup_completed')
            .eq('user_id', session.user.id)
            .maybeSingle();
          
          if (!profile?.shop_setup_completed) {
            // User needs to set up their shop - this will be handled in the app
            console.log('User needs shop setup');
          }
        }, 0);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({ 
      email, 
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/`
      }
    });
    if (error) throw error;
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  const signOut = async () => {
    try {
      // Check if there's an active session before attempting to sign out
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        // No active session, just clear local state
        setUser(null);
        return;
      }
      
      const { error } = await supabase.auth.signOut();
      if (error && !error.message.includes('Session not found')) {
        throw error;
      }
    } catch (error: any) {
      // If there's any error, still clear the local state
      console.warn('Sign out error (clearing local state):', error.message);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};