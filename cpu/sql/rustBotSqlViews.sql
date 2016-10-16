-- rustBotSqlViews.sql
 -- psql -f './rustBotSqlViews.sql' "postgresql://rustbot:xxxxx@localhost/rustbot"

CREATE OR REPLACE VIEW public."vLastStats" AS
SELECT to_char(pl.created_at, 'MM/DD/YY HH24:MI:SS'::text) AS to_char,
       pl.created_at,
       pl.steamid,
       pl.name,
       pl.ping,
       pl.health,
       pl.currentlevel,
       pl.unspentxp,
       pl.violationlevel,
       pl.ownersteamid,
       pl.ip
FROM playerlist pl,
  (SELECT MAX(created_at),
          steamid
   FROM playerlist
   WHERE steamid != 0
   GROUP BY 2
   ORDER BY 1 DESC) lto
WHERE pl.steamid = lto.steamid
  AND lto.max = pl.created_at
ORDER BY pl.created_at DESC;

ALTER TABLE public."vLastStats" OWNER TO rustbot;


CREATE OR REPLACE VIEW public."vConnectedPlayers" AS
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
WHERE func_pl_time() = pl.created_at;


ALTER TABLE public."vConnectedPlayers" OWNER TO rustbot;


CREATE OR REPLACE VIEW public."vRecentlyConnected" AS
SELECT max(ct.created_at) AS lcon,
       ct.steamid,
       ct.name,
       vls.ping,
       vls.health,
       vls.currentlevel,
       vls.unspentxp,
       vls.violationlevel,
       vls.ip,
       vls.ownersteamid
FROM CONNECT ct
JOIN "vLastStats" vls ON ct.steamid = vls.steamid
WHERE ct.disconnect = TRUE
  AND ct.steamid NOT IN
    (SELECT steamid
     FROM "vConnectedPlayers")
  AND ct.created_at > (now() - interval '24 hour')
GROUP BY ct.steamid,
         ct.name,
         vls.ping,
         vls.health,
         vls.currentlevel,
         vls.unspentxp,
         vls.violationlevel,
         vls.ip,
         vls.ownersteamid,
         vls.created_at
ORDER BY vls.created_at DESC;


ALTER TABLE public."vRecentlyConnected" OWNER TO rustbot;



CREATE OR REPLACE VIEW public."v24KillerStats" AS
SELECT killer_steamid,
       killer_name,
       COUNT(CASE WHEN pvp THEN 1 END) AS pvp,
       COUNT(CASE WHEN sleeper THEN 1 END) AS sleeper,
       COUNT(CASE WHEN died THEN 1 END) AS died,
       COUNT(CASE WHEN killed THEN 1 END) AS killed
FROM death
WHERE created_at > (now() - '24:00:00'::interval)
GROUP BY killer_steamid,
         killer_name;


ALTER TABLE public."v24KillerStats" OWNER TO rustbot;


CREATE OR REPLACE VIEW public."v24DeathStats" AS
SELECT victim_steamid,
       victim_name,
       COUNT(pvp) AS pvp,
       COUNT(sleeper) AS sleeper,
       COUNT(died) + COUNT(killed) AS died,
       COUNT(suicide) AS suicided
FROM death
WHERE created_at > (now() - '24:00:00'::interval)
GROUP BY victim_steamid,
         victim_name;


ALTER TABLE public."v24DeathStats" OWNER TO rustbot;



