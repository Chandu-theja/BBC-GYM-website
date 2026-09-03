-- Run once against the Neon database (psql, or the Neon SQL editor).
create table if not exists enquiries (
  id         serial primary key,
  name       text not null,
  phone      text not null,
  program    text,
  goal       text,
  message    text,
  created_at timestamptz not null default now()
);

create index if not exists enquiries_created_at_idx on enquiries (created_at desc);
