-- View: public.pvpview
 -- DROP VIEW public.pvpview;

CREATE OR REPLACE VIEW public."vPvpKills" AS
SELECT dt.victim_steamid,
       dt.victim_name,
       dt.killer_steamid,
       dt.killer_name
FROM death dt
WHERE dt.created_at > (now() - '24:00:00'::interval)
  AND dt.pvp = TRUE
  AND dt.sleeper = FALSE;


ALTER TABLE public."vPvpKills" OWNER TO rustbot;

