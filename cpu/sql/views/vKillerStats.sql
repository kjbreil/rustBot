CREATE OR REPLACE VIEW public."vKillerStats" AS
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


ALTER TABLE public."vKillerStats" OWNER TO rustbot;