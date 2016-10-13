CREATE OR REPLACE VIEW public."vTopKiller" AS
SELECT count(killer_name),
       killer_name
FROM death
WHERE created_at > (now() - interval '24 hour')
  AND killed = TRUE
  AND pvp IS NULL
GROUP BY killer_name;


ALTER TABLE public."vTopKiller" OWNER TO rustbot;