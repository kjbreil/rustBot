CREATE OR REPLACE VIEW public."pvpView" AS
SELECT 
       dt.victim_steamid,
       dt.victim_name,
       vlst.currentlevel as victim_level,
       vlst.ping as victim_ping,
       dt.killer_steamid,
       dt.killer_name,
       klst.currentlevel as killer_level,
       klst.ping as killer_ping
FROM death dt 
JOIN laststats vlst ON dt.victim_steamid = vlst.steamid
JOIN laststats klst ON dt.killer_steamid = klst.steamid
WHERE dt.created_at > (now() - interval '36 hour')
  AND dt.pvp = TRUE
  AND dt.sleeper = FALSE

;

ALTER TABLE public."pvpView"
    OWNER TO rustbot;