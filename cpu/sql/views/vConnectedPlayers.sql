-- View: public.connected_players
 -- DROP VIEW public.connected_players;

CREATE OR REPLACE VIEW "public"."vConnectedPlayers" AS
SELECT to_char(pl.created_at, 'MM/DD/YY HH24:MI:SS'::text) AS to_char,
       pl.steamid,
       pl.name,
       pl.ping,
       pl.ip,
       age(now(), cn.lcon::TIMESTAMP WITH time ZONE) AS onlinetime,
       pl.violationlevel,
       pl.unspentxp,
       pl.health,
       pl.currentlevel
FROM playerlist pl
JOIN
  (SELECT "vLastStats".created_at AS lcon,
          "vLastStats".steamid,
          d "vLastStats".name
   FROM "vLastStats"
   WHERE "vLastStats".name IS NOT NULL
   ORDER BY "vLastStats".created_at DESC) cn ON pl.steamid = cn.steamid
RIGHT JOIN
  (SELECT playerlist.created_at
   FROM playerlist
   ORDER BY playerlist.created_at DESC LIMIT 1) lr ON date_trunc('second'::text, pl.created_at) = date_trunc('second'::text, lr.created_at);

