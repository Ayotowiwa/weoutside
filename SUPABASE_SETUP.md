# Supabase Integration Setup Guide

## Overview

This document outlines the infrastructure created to safely integrate Supabase without breaking existing functionality.

## Architecture

### 1. **Supabase Client** (`/lib/supabaseClient.ts`)
- Initializes the Supabase client with environment variables
- Uses placeholder values if environment variables are not set
- Logs a warning if Supabase is not configured
- Exported as a singleton for reuse across the app

### 2. **Data Abstraction Layer** (`/lib/dataSource.ts`)
- Acts as a **switch** between mock data and Supabase
- Currently returns mock data from `homepageData.ts`
- Provides stub functions ready for Supabase implementation:
  - `getRecommendations()` - Get all events + places
  - `getEvents()` - Get only events
  - `getPlaces()` - Get only places
  - `getRecommendationById(id)` - Get single item
  - `getRecommendationsByCategory(category)` - Filter by category
  - `getHomepageData()` - Get complete homepage data

### 3. **Environment Configuration** (`.env.local.example`)
- Template for required environment variables
- Copy to `.env.local` and fill in your Supabase credentials

## Current State

Working:
- Mock data from `homepageData.ts` (unchanged)
- All UI components (unchanged)
- All filtering logic (unchanged)
- All page components (unchanged)

Not Connected Yet:
- Supabase client is installed but not used
- Data layer returns mock data only
- No database calls

## Next Steps: Migrating to Supabase

### Step 1: Configure Environment Variables
```bash
cp .env.local.example .env.local
```
Then fill in your Supabase credentials:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Step 2: Implement Supabase Functions
Replace the TODO sections in `/lib/dataSource.ts`:

**Example: Migrating `getRecommendations()`**

From:
```typescript
export async function getRecommendations(): Promise<Recommendation[]> {
  return homepageData.allRecommendations;
}
```

To:
```typescript
export async function getRecommendations(): Promise<Recommendation[]> {
  const { data, error } = await supabase
    .from("recommendations")
    .select("*");
  
  if (error) {
    console.error("Failed to fetch recommendations:", error);
    return homepageData.allRecommendations; // Fallback to mock
  }
  
  return data || [];
}
```

### Step 3: Update Page Components (if needed)
If your page components currently use `homepageData.allRecommendations` directly, update them to use the new data layer:

**Before:**
```typescript
import { homepageData } from "@/lib/homepageData";

// In component:
const items = homepageData.allRecommendations;
```

**After:**
```typescript
import { getRecommendations } from "@/lib/dataSource";

// In component (if using async):
const items = await getRecommendations();
```

## Important Notes

### DO NOT:
- Modify existing UI components
- Change filtering logic
- Replace `homepageData.ts` yet
- Remove mock data imports

### DO:
- Implement Supabase queries in `dataSource.ts` only
- Keep fallbacks to mock data for robustness
- Test thoroughly before removing mock data
- Use the data layer consistently

## Supabase Tables Expected

Based on the `Recommendation` interface, you should have:

**recommendations** table:
```
- id (text, primary key)
- title (text)
- description (text)
- type (text: "EVENT" or "PLACE")
- categories (text[] - array of strings)
- image (text)
- locationName (text)
- latitude (float)
- longitude (float)
- startDate (timestamp, optional)
- endDate (timestamp, optional)
- openingHours (text, optional)
- created_at (timestamp)
- updated_at (timestamp)
```

## File Structure

```
lib/
  ├── supabaseClient.ts      ← New: Supabase client setup
  ├── dataSource.ts          ← New: Data abstraction layer
  ├── homepageData.ts        ← Existing: Mock data (unchanged)
  ├── recommendations.ts     ← Existing: Type definitions (unchanged)
  
.env.local                   ← Create from .env.local.example
.env.local.example           ← New: Template for env vars
```

## Troubleshooting

**Warning: "Supabase environment variables not configured"**
- Make sure `.env.local` exists and has correct credentials
- Check that variable names match exactly
- Restart dev server after updating `.env.local`

**"createClient is not exported"**
- Run `npm install @supabase/supabase-js`
- Clear `.next` cache: `rm -rf .next`
- Restart dev server

**Type errors in dataSource.ts**
- Ensure `recommendations.ts` exports the `Recommendation` interface
- Check import paths are correct

## Success Indicators

When migration is complete:
1. Data fetches from Supabase instead of mock
2. UI looks identical (no changes needed)
3. Filtering/search still works
4. All pages load correctly
5. No console errors

---

Status: Infrastructure Ready
The groundwork is laid. When you're ready, implement Supabase queries in `dataSource.ts`.
