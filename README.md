# what i eat

Moderní Next.js aplikace pro logování jídel s makroživinami a Supabase backendem.

## Nastavení Supabase

1. Vytvořte projekt na [Supabase](https://supabase.com/).
2. Vytvořte tabulku `meals` v SQL editoru:

```sql
create table meals (
  id serial primary key,
  image_url text not null,
  calories integer not null,
  protein integer not null,
  carbs integer not null,
  fat integer not null,
  created_at timestamp with time zone default timezone('utc'::text, now())
);
```

3. Získejte hodnoty `Project URL` a `anon public key` v nastavení projektu.
4. Vytvořte soubor `.env.local` v rootu projektu:

```
NEXT_PUBLIC_SUPABASE_URL=... (váš Supabase URL)
NEXT_PUBLIC_SUPABASE_ANON_KEY=... (váš anon key)
```

5. Nainstalujte závislosti:

```
npm install
```

6. Spusťte vývojový server:

```
npm run dev
```

## Funkce
- Google přihlášení (NextAuth.js)
- Upload fotky jídla a ruční zadání makroživin
- Ukládání jídel do Supabase (Postgres)
- Dashboard s přehledem jídel
- Moderní UI (TailwindCSS)

---

Pokud potřebujete pomoc, napište!
