-- View: public.laststats
 -- DROP VIEW public.laststats;

CREATE OR REPLACE VIEW public."vLastStats" AS
SELECT *
FROM playerlist
WHERE id IN
    (SELECT max(id)
     FROM playerlist
     WHERE name NOTNULL
     GROUP BY steamid)
ORDER BY id DESC
ALTER TABLE public."vLastStats" OWNER TO rustbot;

