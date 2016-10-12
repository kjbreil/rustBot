 CREATE OR REPLACE VIEW public."pvpView" AS
 
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
          WHERE connect.disconnect = true
          AND connect.created_at > (now() - interval '4 hour')
          GROUP BY connect.steamid, connect.name
       ) cn ON cn.steamid = pl.steamid



;

ALTER TABLE public."pvpView"
    OWNER TO rustbot;