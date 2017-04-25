-- View: public.elements_death

-- DROP VIEW public.elements_death;

CREATE OR REPLACE VIEW public."vElementsDeath" AS 
 SELECT count(death.victim_steamid) AS count,
    death.victim_name,
    death.killer_name
   FROM death
  WHERE death.created_at > (now() - '24:00:00'::interval) AND death.died = true
  GROUP BY death.victim_name, death.killer_name;

ALTER TABLE public."vElementsDeath"
  OWNER TO rustbot;
