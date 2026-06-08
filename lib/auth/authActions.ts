import { supabase } from "./authClient";
import type { User } from "@supabase/supabase-js";


type AuthResponse<T> = {
  data: T | null;
  error: Error | null;
};


export async function signUp(
  email: string,
  password: string
): Promise<AuthResponse<{ user: User | null; session: any }>> {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return {
        data: null,
        error: new Error(error.message),
      };
    }

    return {
      data: {
        user: data.user,
        session: data.session,
      },
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error : new Error("Sign up failed"),
    };
  }
}


export async function signIn(
  email: string,
  password: string
): Promise<AuthResponse<{ user: User | null; session: any }>> {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return {
        data: null,
        error: new Error(error.message),
      };
    }

    return {
      data: {
        user: data.user,
        session: data.session,
      },
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error : new Error("Sign in failed"),
    };
  }
}


export async function signOut(): Promise<AuthResponse<{ success: boolean }>> {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return {
        data: null,
        error: new Error(error.message),
      };
    }

    return {
      data: { success: true },
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error : new Error("Sign out failed"),
    };
  }
}


export async function getUser(): Promise<AuthResponse<User>> {
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      return {
        data: null,
        error: new Error(error.message),
      };
    }

    return {
      data: user,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error : new Error("Failed to get user"),
    };
  }
}


export async function getSession(): Promise<
  AuthResponse<{ session: any | null }>
> {
  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      return {
        data: null,
        error: new Error(error.message),
      };
    }

    return {
      data: { session },
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error:
        error instanceof Error ? error : new Error("Failed to get session"),
    };
  }
}
