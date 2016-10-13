-- View: public.laststats

-- DROP VIEW public.laststats;

CREATE OR REPLACE VIEW public."vLastStats" AS 
 SELECT DISTINCT ON (playerlist.steamid) to_char(playerlist.created_at, 'MM/DD/YY HH24:MI:SS'::text) AS to_char,
    playerlist.created_at,
    playerlist.steamid,
    playerlist.name,
    playerlist.ping,
    playerlist.health,
    playerlist.currentlevel,
    playerlist.unspentxp,
    playerlist.violationlevel,
    playerlist.ownersteamid,
    playerlist.ip
   FROM playerlist
  ORDER BY playerlist.steamid, playerlist.created_at DESC;

ALTER TABLE public."vLastStats"
  OWNER TO rustbot;
