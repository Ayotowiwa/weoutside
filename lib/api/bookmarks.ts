import { supabase } from "@/lib/auth/authClient";

type BookmarkResponse<T> = {
  data: T | null;
  error: Error | null;
};

/**
 * Get the current authenticated user
 */
async function getCurrentUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return { user: null, error: new Error("User not authenticated") };
  }

  return { user, error: null };
}

/**
 * Save a bookmark for the current user
 */
export async function saveBookmark(
  itemId: string
): Promise<BookmarkResponse<{ success: boolean }>> {
  try {
    const { user, error: userError } = await getCurrentUser();
    if (userError) {
      return { data: null, error: userError };
    }

    const { error } = await supabase.from("bookmarks").insert([
      {
        user_id: user!.id,
        item_id: itemId,
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      return { data: null, error: new Error(error.message) };
    }

    return { data: { success: true }, error: null };
  } catch (error) {
    return {
      data: null,
      error:
        error instanceof Error ? error : new Error("Failed to save bookmark"),
    };
  }
}

/**
 * Remove a bookmark for the current user
 */
export async function removeBookmark(
  itemId: string
): Promise<BookmarkResponse<{ success: boolean }>> {
  try {
    const { user, error: userError } = await getCurrentUser();
    if (userError) {
      return { data: null, error: userError };
    }

    const { error } = await supabase
      .from("bookmarks")
      .delete()
      .eq("user_id", user!.id)
      .eq("item_id", itemId);

    if (error) {
      return { data: null, error: new Error(error.message) };
    }

    return { data: { success: true }, error: null };
  } catch (error) {
    return {
      data: null,
      error:
        error instanceof Error
          ? error
          : new Error("Failed to remove bookmark"),
    };
  }
}

/**
 * Check if an item is bookmarked by the current user
 */
export async function isBookmarked(
  itemId: string
): Promise<BookmarkResponse<boolean>> {
  try {
    const { user, error: userError } = await getCurrentUser();
    if (userError) {
      return { data: false, error: null };
    }

    const { data, error } = await supabase
      .from("bookmarks")
      .select("id")
      .eq("user_id", user!.id)
      .eq("item_id", itemId)
      .single();

    if (error && error.code !== "PGRST116") {
      // PGRST116 = no rows returned
      return { data: false, error: null };
    }

    return { data: !!data, error: null };
  } catch (error) {
    return {
      data: false,
      error:
        error instanceof Error
          ? error
          : new Error("Failed to check bookmark status"),
    };
  }
}

/**
 * Toggle bookmark status for an item
 */
export async function toggleBookmark(
  itemId: string
): Promise<BookmarkResponse<{ isBookmarked: boolean }>> {
  try {
    const { user, error: userError } = await getCurrentUser();
    if (userError) {
      return { data: null, error: userError };
    }

    // Check if already bookmarked
    const { data: existing, error: checkError } = await supabase
      .from("bookmarks")
      .select("id")
      .eq("user_id", user!.id)
      .eq("item_id", itemId)
      .single();

    if (existing) {
      // Remove bookmark
      const { error: deleteError } = await supabase
        .from("bookmarks")
        .delete()
        .eq("user_id", user!.id)
        .eq("item_id", itemId);

      if (deleteError) {
        return {
          data: null,
          error: new Error(deleteError.message),
        };
      }

      return { data: { isBookmarked: false }, error: null };
    } else {
      // Add bookmark
      const { error: insertError } = await supabase.from("bookmarks").insert([
        {
          user_id: user!.id,
          item_id: itemId,
          created_at: new Date().toISOString(),
        },
      ]);

      if (insertError) {
        return {
          data: null,
          error: new Error(insertError.message),
        };
      }

      return { data: { isBookmarked: true }, error: null };
    }
  } catch (error) {
    return {
      data: null,
      error:
        error instanceof Error
          ? error
          : new Error("Failed to toggle bookmark"),
    };
  }
}

/**
 * Get all bookmarks for the current user
 */
export async function getBookmarks(): Promise<
  BookmarkResponse<Array<{ item_id: string }>>
> {
  try {
    const { user, error: userError } = await getCurrentUser();
    if (userError) {
      return { data: [], error: null };
    }

    const { data, error } = await supabase
      .from("bookmarks")
      .select("item_id")
      .eq("user_id", user!.id);

    if (error) {
      return { data: [], error: new Error(error.message) };
    }

    return { data: data || [], error: null };
  } catch (error) {
    return {
      data: [],
      error:
        error instanceof Error ? error : new Error("Failed to get bookmarks"),
    };
  }
}
