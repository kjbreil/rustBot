CREATE TYPE "public"."death_type" AS  ("name" text COLLATE "default", "value" int4);

ALTER TYPE "public"."death_type" OWNER TO "rustbot";



 CREATE OR REPLACE VIEW public.view_breakoutstats AS
 SELECT bos.created_at AS audit_time,
    bos.steamid,
    vls.name,
    bos.name AS stat,
    bos.value,
    vls.ip
   FROM (( SELECT ssa.steamid,
            ssa.created_at,
            st.name,
            st.value
           FROM steamstats_audit ssa,
            LATERAL jsonb_populate_recordset(NULL::death_type, (ssa.stats -> 'stats'::text)) st(name, value)) bos
     LEFT JOIN "vLastStats" vls ON ((bos.steamid = vls.steamid)));