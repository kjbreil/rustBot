-- View: public.connected_players
 -- DROP VIEW public.connected_players;

CREATE OR REPLACE VIEW public.vConnectedPlayers AS
SELECT to_char(pl.created_at, 'MM/DD/YY HH24:MI:SS'::text) AS to_char,
       pl.steamid,
       pl.name,
       pl.ping,
       pl.ip,
       age(now(), cn.lcon) AS onlinetime,
       pl.violationlevel,
       pl.unspentxp,
       pl.health,
       pl.currentlevel
FROM playerlist pl
JOIN
  (SELECT created_at AS lcon,
          steamid,
          name
   FROM "vLastStats"
   WHERE name NOTNULL
   ORDER BY 1 DESC) cn ON pl.steamid = cn.steamid
RIGHT JOIN
  (SELECT created_at
   FROM playerlist
   ORDER BY 1 DESC LIMIT 1) lr ON pl.created_at = lr.created_at;


ALTER TABLE public.vConnectedPlayers OWNER TO rustbot;

