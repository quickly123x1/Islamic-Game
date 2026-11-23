-- نفّذ هذا الملف كاملًا من Supabase Dashboard > SQL Editor > New query.
create table if not exists public.player_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text not null default 'Player' check (char_length(username) between 1 and 18),
  total_points integer not null default 0 check (total_points >= 0),
  game_state jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.player_profiles enable row level security;

drop policy if exists "Profiles are publicly readable" on public.player_profiles;
create policy "Profiles are publicly readable"
  on public.player_profiles for select
  to anon, authenticated
  using (true);

drop policy if exists "Players can insert their own profile" on public.player_profiles;
create policy "Players can insert their own profile"
  on public.player_profiles for insert
  to authenticated
  with check (auth.uid() = id);

drop policy if exists "Players can update their own profile" on public.player_profiles;
create policy "Players can update their own profile"
  on public.player_profiles for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

grant select on public.player_profiles to anon, authenticated;
grant insert, update on public.player_profiles to authenticated;
