
CREATE OR REPLACE VIEW public."vDeathStats" AS
SELECT victim_steamid,
       victim_name,
       COUNT(pvp) AS pvp,
       COUNT(sleeper) AS sleeper,
       COUNT(died) AS died,
       COUNT(killed) AS waskilled,
       COUNT(suicide) AS suicided
FROM death
WHERE created_at > (now() - '24:00:00'::interval)
GROUP BY victim_steamid,
         victim_name
ALTER TABLE public."vDeathStats" OWNER TO rustbot;

