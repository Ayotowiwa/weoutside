'use server';

import { supabase } from '../auth/authClient';

type BookmarkItemType = 'event' | 'place';

type BookmarkResponse<T> = {
  data: T | null;
  error: Error | null;
};

type Bookmark = {
  id: string;
  user_id: string;
  item_type: BookmarkItemType;
  item_id: string;
  created_at: string;
};

/**
 * Save a bookmark for a user
 */
export async function saveBookmark(
  userId: string,
  itemType: BookmarkItemType,
  itemId: string
): Promise<BookmarkResponse<Bookmark>> {
  try {
    const { data, error } = await supabase
      .from('bookmarks')
      .insert([
        {
          user_id: userId,
          item_type: itemType,
          item_id: itemId,
        },
      ])
      .select()
      .single();

    if (error) {
      return {
        data: null,
        error: new Error(error.message),
      };
    }

    return {
      data: data as Bookmark,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error : new Error('Failed to save bookmark'),
    };
  }
}

/**
 * Remove a bookmark for a user
 */
export async function removeBookmark(
  userId: string,
  itemType: BookmarkItemType,
  itemId: string
): Promise<BookmarkResponse<{ success: boolean }>> {
  try {
    const { error } = await supabase
      .from('bookmarks')
      .delete()
      .eq('user_id', userId)
      .eq('item_type', itemType)
      .eq('item_id', itemId);

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
      error: error instanceof Error ? error : new Error('Failed to remove bookmark'),
    };
  }
}

/**
 * Check if an item is bookmarked by a user
 */
export async function isBookmarked(
  userId: string,
  itemType: BookmarkItemType,
  itemId: string
): Promise<BookmarkResponse<boolean>> {
  try {
    const { data, error } = await supabase
      .from('bookmarks')
      .select('id')
      .eq('user_id', userId)
      .eq('item_type', itemType)
      .eq('item_id', itemId)
      .single();

    if (error && error.code === 'PGRST116') {
      // No rows returned - this is expected when not bookmarked
      return {
        data: false,
        error: null,
      };
    }

    if (error) {
      return {
        data: null,
        error: new Error(error.message),
      };
    }

    return {
      data: !!data,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error : new Error('Failed to check bookmark status'),
    };
  }
}

/**
 * Toggle a bookmark - remove if exists, save if doesn't exist
 * Returns the final bookmark state (true if bookmarked, false if removed)
 */
export async function toggleBookmark(
  userId: string,
  itemType: BookmarkItemType,
  itemId: string
): Promise<BookmarkResponse<boolean>> {
  try {
    // Check if bookmark exists
    const { data: existingBookmark, error: checkError } = await supabase
      .from('bookmarks')
      .select('id')
      .eq('user_id', userId)
      .eq('item_type', itemType)
      .eq('item_id', itemId)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      return {
        data: null,
        error: new Error(checkError.message),
      };
    }

    // If bookmark exists, remove it
    if (existingBookmark) {
      const { error: deleteError } = await supabase
        .from('bookmarks')
        .delete()
        .eq('user_id', userId)
        .eq('item_type', itemType)
        .eq('item_id', itemId);

      if (deleteError) {
        return {
          data: null,
          error: new Error(deleteError.message),
        };
      }

      return {
        data: false,
        error: null,
      };
    }

    // If bookmark doesn't exist, create it
    const { error: insertError } = await supabase
      .from('bookmarks')
      .insert([
        {
          user_id: userId,
          item_type: itemType,
          item_id: itemId,
        },
      ]);

    if (insertError) {
      return {
        data: null,
        error: new Error(insertError.message),
      };
    }

    return {
      data: true,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error : new Error('Failed to toggle bookmark'),
    };
  }
}

/**
 * Get all bookmarks for a user
 */
export async function getBookmarks(
  userId: string
): Promise<BookmarkResponse<Bookmark[]>> {
  try {
    const { data, error } = await supabase
      .from('bookmarks')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      return {
        data: null,
        error: new Error(error.message),
      };
    }

    return {
      data: (data || []) as Bookmark[],
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error : new Error('Failed to fetch bookmarks'),
    };
  }
}
