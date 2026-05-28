# Quick Start: Supabase Integration with Categories

## What's Been Created

- `/lib/supabaseClient.ts` - Supabase client setup  
- `/lib/dataSource.ts` - Data abstraction layer (stub functions)  
- `/lib/dbTransform.ts` - Database ↔ App format converters  
- `/scripts/seed.ts` - One-click database seeder  
- `.env.local.example` - Environment template  

## Step-by-Step Setup

### 1. Configure Environment Variables

```bash
# Copy template
cp .env.local.example .env.local
```

Edit `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Get these from: Supabase Dashboard → Project Settings → API

### 2. Create Database Table

Go to **Supabase Dashboard** → **SQL Editor** → **New Query**

Paste this SQL:

```sql
-- Create recommendations table
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

-- Create indexes for faster queries
CREATE INDEX idx_type ON recommendations(type);
CREATE INDEX idx_categories ON recommendations USING GIN(categories);

-- Enable RLS
ALTER TABLE recommendations ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read
CREATE POLICY "Enable read for all users"
  ON recommendations FOR SELECT USING (true);

-- Allow authenticated users to insert (for seeding)
CREATE POLICY "Enable insert for service role"
  ON recommendations FOR INSERT
  WITH CHECK (true);
```

Click **Run**

### 3. Seed Your Database

```bash
# Run from project root
npx tsx scripts/seed.ts
```

You should see:
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

BREAKDOWN BY TYPE:
  Events: 12
  Places: 13

BREAKDOWN BY CATEGORY:
  Music: 3
  Outdoors: 2
  ...

Seed completed successfully!
```

### 4. Verify Data in Supabase

Go to **Supabase Dashboard** → **Table Editor** → **recommendations**

You should see all your items with:
- Categories as arrays
- Fields properly named (snake_case)
- Proper timestamps
- All items

### 5. Update Data Layer (When Ready)

Once confirmed, update `/lib/dataSource.ts`:

**For `getRecommendations()`:**

```typescript
import { supabase } from "./supabaseClient";
import { transformDbToRecommendations } from "./dbTransform";

export async function getRecommendations(): Promise<Recommendation[]> {
  const { data, error } = await supabase
    .from("recommendations")
    .select("*");
  
  if (error) {
    console.error("Failed to fetch recommendations:", error);
    return homepageData.allRecommendations; // Fallback
  }
  
  return transformDbToRecommendations(data || []);
}
```

**For `getRecommendationsByCategory(category)`:**

```typescript
export async function getRecommendationsByCategory(
  category: string
): Promise<Recommendation[]> {
  const { data, error } = await supabase
    .from("recommendations")
    .select("*")
    .contains("categories", [category]); // Array filtering
  
  if (error) {
    console.error("Failed to fetch by category:", error);
    return homepageData.allRecommendations.filter((item) =>
      item.categories.some(
        (cat) => cat.toLowerCase() === category.toLowerCase()
      )
    );
  }
  
  return transformDbToRecommendations(data || []);
}
```

**For `getRecommendationById(id)`:**

```typescript
export async function getRecommendationById(
  id: string
): Promise<Recommendation | null> {
  const { data, error } = await supabase
    .from("recommendations")
    .select("*")
    .eq("id", id)
    .single();
  
  if (error) {
    console.error("Failed to fetch item:", error);
    return homepageData.allRecommendations.find((item) => item.id === id) || null;
  }
  
  return data ? transformDbToRecommendation(data) : null;
}
```

### 6️⃣ Test It

```bash
npm run dev
```

Navigate to http://localhost:3000 and verify:
- ✅ Page loads (with fallback to mock if needed)
- ✅ Search works
- ✅ Categories filter
- ✅ Detail pages load

## File Structure Overview

```
lib/
  ├── supabaseClient.ts     ← Supabase setup
  ├── dataSource.ts         ← Data layer (swap mock ↔ Supabase)
  ├── dbTransform.ts        ← Format converters
  ├── homepageData.ts       ← Mock data (unchanged)
  └── recommendations.ts    ← Types (unchanged)

scripts/
  └── seed.ts               ← Populate database

.env.local                  ← Credentials (create from example)
.env.local.example          ← Template

SEED_GUIDE.md              ← Detailed seed documentation
SUPABASE_SETUP.md          ← Supabase infrastructure guide
```

## Key Concepts

### Field Mapping

When querying Supabase, remember:
- DB: `location_name` ↔ App: `locationName`
- DB: `start_date` ↔ App: `startDate`
- DB: `opening_hours` ↔ App: `openingHours`

Use `dbTransform.ts` functions to handle this automatically!

### Categories Stored as Array

Database:
```sql
categories: ["Music", "Outdoors", "Fun"]
```

Query by category:
```typescript
.contains("categories", ["Music"]) // Returns all items with Music category
```

### Fallback Mechanism

Every function has fallback:
```typescript
if (error) {
  console.error("DB error, using mock:", error);
  return homepageData.allRecommendations; // Falls back to mock
}
```

This means zero downtime during migration!

## Troubleshooting

Script won't run
```bash
# Make sure you have tsx installed
npm install -D tsx

# Then run
npx tsx scripts/seed.ts
```

"Permission denied" error
- Check RLS policies in Supabase
- Ensure INSERT policy allows the anon key
- Or run as service role instead

"relation does not exist"
- Table wasn't created or name is wrong
- Check spelling: must be exactly `recommendations`
- Run SQL query again

### "duplicate key value"
- Table already has this data
- Run truncate before seeding (see SEED_GUIDE.md)

## What's Next?

1. Set up .env.local
2. Create table in Supabase
3. Run seed script
4. Verify data appears
5. Update dataSource.ts functions
6. Remove mock data once confident
7. Deploy!

---

Congratulations! Your WeOutside app is now Supabase-enabled and ready for real data!
