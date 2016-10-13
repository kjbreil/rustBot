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
     JOIN ( SELECT max(connect.created_at) AS lcon,
            connect.steamid,
            connect.name
           FROM connect
          WHERE connect.connect = true
          GROUP BY connect.steamid, connect.name) cn ON cn.steamid = pl.steamid
  WHERE to_char(pl.created_at, 'MM/DD/YY HH24:MI:SS'::text) = (( SELECT to_char(playerlist.created_at, 'MM/DD/YY HH24:MI:SS'::text) AS to_char
           FROM playerlist
          ORDER BY playerlist.created_at DESC
         LIMIT 1));

ALTER TABLE public.vConnectedPlayers
  OWNER TO rustbot;
