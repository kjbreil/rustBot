-- View: public.laststats
 -- DROP VIEW public.laststats;

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