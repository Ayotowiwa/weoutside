# Database Seed Script Guide

## Overview

The seed script (`/scripts/seed.ts`) imports mock data from `homepageData.ts` and inserts it into your Supabase `recommendations` table. This allows you to populate your database with the hardcoded data and start querying from the database instead of using mock data.

## Prerequisites

Before running the seed script:

1. **Environment variables set** (in `.env.local`):
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

2. **Supabase table created** - See [Database Schema](#database-schema) section below

3. **RLS Policy configured** - Allow inserts from the anon key (or run as service role)

## Running the Seed Script

### Option 1: Using tsx (Recommended)
```bash
npx tsx scripts/seed.ts
```

### Option 2: Using ts-node
```bash
npx ts-node scripts/seed.ts
```

### Option 3: Add npm script
Edit `package.json`:
```json
{
  "scripts": {
    "seed": "tsx scripts/seed.ts"
  }
}
```

Then run:
```bash
npm run seed
```

## Database Schema

The seed script expects a `recommendations` table with the following structure:

### SQL to Create Table

```sql
CREATE TABLE recommendations (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('EVENT', 'PLACE')),
  categories TEXT[] NOT NULL,
  image TEXT NOT NULL,
  location_name TEXT NOT NULL,
  latitude FLOAT NOT NULL,
  longitude FLOAT NOT NULL,
  start_date TIMESTAMP NULL,
  end_date TIMESTAMP NULL,
  opening_hours TEXT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Optional: Create index for faster queries
CREATE INDEX idx_type ON recommendations(type);
CREATE INDEX idx_categories ON recommendations USING GIN(categories);
```

### Create via Supabase Dashboard

1. Go to **SQL Editor** in Supabase Dashboard
2. Create new query
3. Paste the SQL above
4. Click **Run**

## Data Mapping

The seed script transforms homepageData into Supabase format:

| Source (homepageData) | Database Column | Type | Notes |
|---|---|---|---|
| `id` | `id` | TEXT | Primary key |
| `title` | `title` | TEXT | |
| `description` | `description` | TEXT | |
| `type` | `type` | TEXT | "EVENT" or "PLACE" |
| `categories[]` | `categories` | TEXT[] | Array of strings |
| `image` | `image` | TEXT | Image URL |
| `locationName` | `location_name` | TEXT | |
| `latitude` | `latitude` | FLOAT | |
| `longitude` | `longitude` | FLOAT | |
| `startDate?` | `start_date` | TIMESTAMP | Optional |
| `endDate?` | `end_date` | TIMESTAMP | Optional |
| `openingHours?` | `opening_hours` | TEXT | Optional |
| (auto) | `created_at` | TIMESTAMP | Auto-generated |
| (auto) | `updated_at` | TIMESTAMP | Auto-generated |

## What the Script Does

1. Reads all recommendations from `homepageData.ts`
2. Separates them by type (events vs places)
3. Transforms field names to snake_case (Supabase convention)
4. Handles optional fields (sets null if missing)
5. Preserves categories as an array
6. Inserts in batches of 100 items (efficient)
7. Provides detailed success/error reporting
8. Shows breakdown by type and category

## Example Output

```
Starting database seed...

Found 25 items to seed

Inserting batch 1/1 (25 items)...
  Successfully inserted 25 items

==================================================
SEED RESULTS:
==================================================
Successfully inserted: 25 items
Failed: 0 items
Total processed: 25 items

BREAKDOWN BY TYPE:
  Events: 12
  Places: 13

BREAKDOWN BY CATEGORY:
  Music: 3
  Outdoors: 2
  Parks: 2
  Dinner: 2
  ...

==================================================
Seed completed successfully!
```

## RLS (Row Level Security) Configuration

If you're using RLS, ensure your `recommendations` table allows:

```sql
-- Allow public read
CREATE POLICY "Enable read access for all users" ON recommendations
  FOR SELECT
  USING (true);

-- Allow service role to insert (for seeding)
CREATE POLICY "Enable insert for authenticated users" ON recommendations
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');
```

Or if using anon key for seeding:

```sql
CREATE POLICY "Enable insert via anon" ON recommendations
  FOR INSERT
  WITH CHECK (true);
```

## After Seeding

Once data is in Supabase:

1. **Test the data layer**: 
   ```bash
   npm run dev
   ```
   Your app should still work with mock data fallback

2. **Update `/lib/dataSource.ts`**: Replace function implementations to query Supabase

3. **Example migration** for `getRecommendations()`:
   ```typescript
   import { supabase } from "./supabaseClient";
   
   export async function getRecommendations(): Promise<Recommendation[]> {
     const { data, error } = await supabase
       .from("recommendations")
       .select("*");
     
     if (error) {
       console.error("Failed to fetch:", error);
       return homepageData.allRecommendations; // Fallback
     }
     
     return data || [];
   }
   ```

4. **Transform field names**: Remember to map `location_name` → `locationName`, etc.

## Troubleshooting

"Supabase environment variables not set"
- Ensure `.env.local` exists with:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Restart terminal after adding env vars

"Relation \"recommendations\" does not exist"
- Create the table using SQL in Supabase Dashboard
- Check table name matches exactly: `recommendations`

"Permission denied"
- RLS policy issue
- Either disable RLS on the table, or
- Configure policies to allow inserts
- Or use service role key for seeding

"Duplicate key value violates unique constraint"
- Table already has data with same IDs
- Comment out truncate line (see script) or delete table and recreate

## Next Steps

1. Run the seed script: `npx tsx scripts/seed.ts`
2. Verify data in Supabase Dashboard → Table Editor → recommendations
3. Update `/lib/dataSource.ts` to query from database
4. Test queries in browser
5. Remove mock data fallback once confident

---

Note: This is a one-time seed script. Future data should be managed through your app's admin panel or Supabase Dashboard.
