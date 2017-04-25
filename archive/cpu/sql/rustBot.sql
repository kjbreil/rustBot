--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.0
-- Dumped by pg_dump version 9.6.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: rustbot; Type: DATABASE; Schema: -; Owner: norge
--

CREATE DATABASE rustbot WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.UTF-8' LC_CTYPE = 'en_US.UTF-8';


ALTER DATABASE rustbot OWNER TO rustbot;

\connect rustbot

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

--
-- Name: func_pl_time(); Type: FUNCTION; Schema: public; Owner: rustbot
--

CREATE FUNCTION func_pl_time() RETURNS timestamp without time zone
    LANGUAGE plpgsql
    AS $$
DECLARE
	out timestamp;
BEGIN
   SELECT created_at
   FROM playerlist
   ORDER BY 1 DESC LIMIT 1 into out;
   RETURN out;
END; $$;


ALTER FUNCTION public.func_pl_time() OWNER TO rustbot;

--
-- Name: rand(); Type: FUNCTION; Schema: public; Owner: rustbot
--

CREATE FUNCTION rand() RETURNS double precision
    LANGUAGE sql
    AS $$SELECT random();$$;


ALTER FUNCTION public.rand() OWNER TO rustbot;

--
-- Name: substring_index(text, text, integer); Type: FUNCTION; Schema: public; Owner: rustbot
--

CREATE FUNCTION substring_index(text, text, integer) RETURNS text
    LANGUAGE sql
    AS $_$SELECT array_to_string((string_to_array($1, $2)) [1:$3], $2);$_$;


ALTER FUNCTION public.substring_index(text, text, integer) OWNER TO rustbot;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: chat; Type: TABLE; Schema: public; Owner: rustbot
--

CREATE TABLE chat (
    id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    steamid bigint,
    name text,
    message text,
    json json
);


ALTER TABLE chat OWNER TO rustbot;

--
-- Name: chat_id_seq; Type: SEQUENCE; Schema: public; Owner: rustbot
--

CREATE SEQUENCE chat_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE chat_id_seq OWNER TO rustbot;

--
-- Name: chat_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: rustbot
--

ALTER SEQUENCE chat_id_seq OWNED BY chat.id;


--
-- Name: connect; Type: TABLE; Schema: public; Owner: rustbot
--

CREATE TABLE connect (
    id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    ip inet,
    port integer,
    steamid bigint,
    name text,
    connect boolean,
    os text,
    os_steamid bigint,
    disconnect boolean,
    disconnect_why text,
    auth boolean,
    auth_level text,
    line text
);


ALTER TABLE connect OWNER TO rustbot;

--
-- Name: connect_id_seq; Type: SEQUENCE; Schema: public; Owner: rustbot
--

CREATE SEQUENCE connect_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE connect_id_seq OWNER TO rustbot;

--
-- Name: connect_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: rustbot
--

ALTER SEQUENCE connect_id_seq OWNED BY connect.id;


--
-- Name: death; Type: TABLE; Schema: public; Owner: rustbot
--

CREATE TABLE death (
    id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    victim_steamid bigint,
    victim_name text,
    killer_steamid bigint,
    killer_name text,
    sleeper boolean,
    pvp boolean,
    died boolean,
    killed boolean,
    suicide boolean,
    line text
);


ALTER TABLE death OWNER TO rustbot;

--
-- Name: death_id_seq; Type: SEQUENCE; Schema: public; Owner: rustbot
--

CREATE SEQUENCE death_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE death_id_seq OWNER TO rustbot;

--
-- Name: death_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: rustbot
--

ALTER SEQUENCE death_id_seq OWNED BY death.id;


--
-- Name: playerlist; Type: TABLE; Schema: public; Owner: rustbot
--

CREATE TABLE playerlist (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    steamid bigint,
    ownersteamid bigint,
    name text,
    ping integer,
    ip inet,
    port integer,
    connectedseconds integer,
    violationlevel numeric(8,2),
    unspentxp numeric(8,2),
    health numeric(8,2),
    currentlevel numeric(8,2)
);


ALTER TABLE playerlist OWNER TO rustbot;

--
-- Name: playerlist_id_seq; Type: SEQUENCE; Schema: public; Owner: rustbot
--

CREATE SEQUENCE playerlist_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE playerlist_id_seq OWNER TO rustbot;

--
-- Name: playerlist_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: rustbot
--

ALTER SEQUENCE playerlist_id_seq OWNED BY playerlist.id;


--
-- Name: rawlog; Type: TABLE; Schema: public; Owner: rustbot
--

CREATE TABLE rawlog (
    id integer NOT NULL,
    created_at timestamp without time zone,
    log json
);


ALTER TABLE rawlog OWNER TO rustbot;

--
-- Name: rawlog_id_seq; Type: SEQUENCE; Schema: public; Owner: rustbot
--

CREATE SEQUENCE rawlog_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE rawlog_id_seq OWNER TO rustbot;

--
-- Name: rawlog_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: rustbot
--

ALTER SEQUENCE rawlog_id_seq OWNED BY rawlog.id;


--
-- Name: steamstats_audit; Type: TABLE; Schema: public; Owner: rustbot
--

CREATE TABLE steamstats_audit (
    id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    connect boolean,
    steamid bigint,
    stats jsonb
);


ALTER TABLE steamstats_audit OWNER TO rustbot;

--
-- Name: steamstats_audit_id_seq; Type: SEQUENCE; Schema: public; Owner: rustbot
--

CREATE SEQUENCE steamstats_audit_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE steamstats_audit_id_seq OWNER TO rustbot;

--
-- Name: steamstats_audit_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: rustbot
--

ALTER SEQUENCE steamstats_audit_id_seq OWNED BY steamstats_audit.id;


--
-- Name: steamstats_server; Type: TABLE; Schema: public; Owner: rustbot
--

CREATE TABLE steamstats_server (
    id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    connect_time timestamp with time zone,
    steamid bigint,
    stats jsonb
);


ALTER TABLE steamstats_server OWNER TO rustbot;

--
-- Name: steamstats_server_id_seq; Type: SEQUENCE; Schema: public; Owner: rustbot
--

CREATE SEQUENCE steamstats_server_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE steamstats_server_id_seq OWNER TO rustbot;

--
-- Name: steamstats_server_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: rustbot
--

ALTER SEQUENCE steamstats_server_id_seq OWNED BY steamstats_server.id;


--
-- Name: tempSteamStats; Type: TABLE; Schema: public; Owner: rustbot
--

CREATE TABLE "tempSteamStats" (
    id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    steamid bigint,
    name text,
    value bigint
);


ALTER TABLE "tempSteamStats" OWNER TO rustbot;

--
-- Name: tempSteamStats24; Type: TABLE; Schema: public; Owner: rustbot
--

CREATE TABLE "tempSteamStats24" (
    id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    data_time timestamp with time zone,
    steamid bigint,
    name text,
    value bigint
);


ALTER TABLE "tempSteamStats24" OWNER TO rustbot;

--
-- Name: tempSteamStats24_id_seq; Type: SEQUENCE; Schema: public; Owner: rustbot
--

CREATE SEQUENCE "tempSteamStats24_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "tempSteamStats24_id_seq" OWNER TO rustbot;

--
-- Name: tempSteamStats24_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: rustbot
--

ALTER SEQUENCE "tempSteamStats24_id_seq" OWNED BY "tempSteamStats24".id;


--
-- Name: tempSteamStats4; Type: TABLE; Schema: public; Owner: rustbot
--

CREATE TABLE "tempSteamStats4" (
    id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    data_time timestamp with time zone,
    steamid bigint,
    name text,
    value bigint
);


ALTER TABLE "tempSteamStats4" OWNER TO rustbot;

--
-- Name: tempSteamStats4_id_seq; Type: SEQUENCE; Schema: public; Owner: rustbot
--

CREATE SEQUENCE "tempSteamStats4_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "tempSteamStats4_id_seq" OWNER TO rustbot;

--
-- Name: tempSteamStats4_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: rustbot
--

ALTER SEQUENCE "tempSteamStats4_id_seq" OWNED BY "tempSteamStats4".id;


--
-- Name: tempSteamStats_id_seq; Type: SEQUENCE; Schema: public; Owner: rustbot
--

CREATE SEQUENCE "tempSteamStats_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "tempSteamStats_id_seq" OWNER TO rustbot;

--
-- Name: tempSteamStats_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: rustbot
--

ALTER SEQUENCE "tempSteamStats_id_seq" OWNED BY "tempSteamStats".id;


--
-- Name: v24DeathStats; Type: VIEW; Schema: public; Owner: rustbot
--

CREATE VIEW "v24DeathStats" AS
 SELECT death.victim_steamid,
    death.victim_name,
    count(death.pvp) AS pvp,
    count(death.sleeper) AS sleeper,
    (count(death.died) + count(death.killed)) AS died,
    count(death.suicide) AS suicided
   FROM death
  WHERE (death.created_at > (now() - '24:00:00'::interval))
  GROUP BY death.victim_steamid, death.victim_name;


ALTER TABLE "v24DeathStats" OWNER TO rustbot;

--
-- Name: v24KillerStats; Type: VIEW; Schema: public; Owner: rustbot
--

CREATE VIEW "v24KillerStats" AS
 SELECT death.killer_steamid,
    death.killer_name,
    count(
        CASE
            WHEN death.pvp THEN 1
            ELSE NULL::integer
        END) AS pvp,
    count(
        CASE
            WHEN death.sleeper THEN 1
            ELSE NULL::integer
        END) AS sleeper,
    count(
        CASE
            WHEN death.died THEN 1
            ELSE NULL::integer
        END) AS died,
    count(
        CASE
            WHEN death.killed THEN 1
            ELSE NULL::integer
        END) AS killed
   FROM death
  WHERE (death.created_at > (now() - '24:00:00'::interval))
  GROUP BY death.killer_steamid, death.killer_name;


ALTER TABLE "v24KillerStats" OWNER TO rustbot;

--
-- Name: vLastStats; Type: VIEW; Schema: public; Owner: rustbot
--

CREATE VIEW "vLastStats" AS
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
    ( SELECT max(playerlist.created_at) AS max,
            playerlist.steamid
           FROM playerlist
          WHERE (playerlist.steamid <> 0)
          GROUP BY playerlist.steamid
          ORDER BY (max(playerlist.created_at)) DESC) lto
  WHERE ((pl.steamid = lto.steamid) AND (lto.max = pl.created_at))
  ORDER BY pl.created_at DESC;


ALTER TABLE "vLastStats" OWNER TO rustbot;

--
-- Name: vConnectedPlayers; Type: VIEW; Schema: public; Owner: rustbot
--

CREATE VIEW "vConnectedPlayers" AS
 SELECT to_char(pl.created_at, 'MM/DD/YY HH24:MI:SS'::text) AS to_char,
    pl.steamid,
    pl.name,
    pl.ping,
    pl.ip,
    age(now(), (cn.lcon)::timestamp with time zone) AS onlinetime,
    pl.violationlevel,
    pl.unspentxp,
    pl.health,
    pl.currentlevel
   FROM (playerlist pl
     JOIN ( SELECT "vLastStats".created_at AS lcon,
            "vLastStats".steamid,
            "vLastStats".name
           FROM "vLastStats"
          WHERE ("vLastStats".name IS NOT NULL)
          ORDER BY "vLastStats".created_at DESC) cn ON ((pl.steamid = cn.steamid)))
  WHERE (func_pl_time() = pl.created_at);


ALTER TABLE "vConnectedPlayers" OWNER TO rustbot;

--
-- Name: vDeathStats; Type: VIEW; Schema: public; Owner: rustbot
--

CREATE VIEW "vDeathStats" AS
 SELECT death.victim_steamid,
    death.victim_name,
    count(death.pvp) AS pvp,
    count(death.sleeper) AS sleeper,
    (count(death.died) + count(death.killed)) AS died,
    count(death.suicide) AS suicided
   FROM death
  WHERE (death.created_at > (now() - '24:00:00'::interval))
  GROUP BY death.victim_steamid, death.victim_name;


ALTER TABLE "vDeathStats" OWNER TO rustbot;

--
-- Name: vKillerStats; Type: VIEW; Schema: public; Owner: rustbot
--

CREATE VIEW "vKillerStats" AS
 SELECT death.killer_steamid,
    death.killer_name,
    count(
        CASE
            WHEN death.pvp THEN 1
            ELSE NULL::integer
        END) AS pvp,
    count(
        CASE
            WHEN death.sleeper THEN 1
            ELSE NULL::integer
        END) AS sleeper,
    count(
        CASE
            WHEN death.died THEN 1
            ELSE NULL::integer
        END) AS died,
    count(
        CASE
            WHEN death.killed THEN 1
            ELSE NULL::integer
        END) AS killed
   FROM death
  WHERE (death.created_at > (now() - '24:00:00'::interval))
  GROUP BY death.killer_steamid, death.killer_name;


ALTER TABLE "vKillerStats" OWNER TO rustbot;

--
-- Name: vRecentlyConnected; Type: VIEW; Schema: public; Owner: rustbot
--

CREATE VIEW "vRecentlyConnected" AS
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
   FROM (connect ct
     JOIN "vLastStats" vls ON ((ct.steamid = vls.steamid)))
  WHERE ((ct.disconnect = true) AND (NOT (ct.steamid IN ( SELECT "vConnectedPlayers".steamid
           FROM "vConnectedPlayers"))) AND (ct.created_at > (now() - '24:00:00'::interval)))
  GROUP BY ct.steamid, ct.name, vls.ping, vls.health, vls.currentlevel, vls.unspentxp, vls.violationlevel, vls.ip, vls.ownersteamid, vls.created_at
  ORDER BY vls.created_at DESC;


ALTER TABLE "vRecentlyConnected" OWNER TO rustbot;

--
-- Name: chat id; Type: DEFAULT; Schema: public; Owner: rustbot
--

ALTER TABLE ONLY chat ALTER COLUMN id SET DEFAULT nextval('chat_id_seq'::regclass);


--
-- Name: connect id; Type: DEFAULT; Schema: public; Owner: rustbot
--

ALTER TABLE ONLY connect ALTER COLUMN id SET DEFAULT nextval('connect_id_seq'::regclass);


--
-- Name: death id; Type: DEFAULT; Schema: public; Owner: rustbot
--

ALTER TABLE ONLY death ALTER COLUMN id SET DEFAULT nextval('death_id_seq'::regclass);


--
-- Name: playerlist id; Type: DEFAULT; Schema: public; Owner: rustbot
--

ALTER TABLE ONLY playerlist ALTER COLUMN id SET DEFAULT nextval('playerlist_id_seq'::regclass);


--
-- Name: rawlog id; Type: DEFAULT; Schema: public; Owner: rustbot
--

ALTER TABLE ONLY rawlog ALTER COLUMN id SET DEFAULT nextval('rawlog_id_seq'::regclass);


--
-- Name: steamstats_audit id; Type: DEFAULT; Schema: public; Owner: rustbot
--

ALTER TABLE ONLY steamstats_audit ALTER COLUMN id SET DEFAULT nextval('steamstats_audit_id_seq'::regclass);


--
-- Name: steamstats_server id; Type: DEFAULT; Schema: public; Owner: rustbot
--

ALTER TABLE ONLY steamstats_server ALTER COLUMN id SET DEFAULT nextval('steamstats_server_id_seq'::regclass);


--
-- Name: tempSteamStats id; Type: DEFAULT; Schema: public; Owner: rustbot
--

ALTER TABLE ONLY "tempSteamStats" ALTER COLUMN id SET DEFAULT nextval('"tempSteamStats_id_seq"'::regclass);


--
-- Name: tempSteamStats24 id; Type: DEFAULT; Schema: public; Owner: rustbot
--

ALTER TABLE ONLY "tempSteamStats24" ALTER COLUMN id SET DEFAULT nextval('"tempSteamStats24_id_seq"'::regclass);


--
-- Name: tempSteamStats4 id; Type: DEFAULT; Schema: public; Owner: rustbot
--

ALTER TABLE ONLY "tempSteamStats4" ALTER COLUMN id SET DEFAULT nextval('"tempSteamStats4_id_seq"'::regclass);


--
-- Name: chat chat_pkey; Type: CONSTRAINT; Schema: public; Owner: rustbot
--

ALTER TABLE ONLY chat
    ADD CONSTRAINT chat_pkey PRIMARY KEY (id);


--
-- Name: connect connect_pkey; Type: CONSTRAINT; Schema: public; Owner: rustbot
--

ALTER TABLE ONLY connect
    ADD CONSTRAINT connect_pkey PRIMARY KEY (id);


--
-- Name: death death_pkey; Type: CONSTRAINT; Schema: public; Owner: rustbot
--

ALTER TABLE ONLY death
    ADD CONSTRAINT death_pkey PRIMARY KEY (id);


--
-- Name: playerlist playerlist_pkey; Type: CONSTRAINT; Schema: public; Owner: rustbot
--

ALTER TABLE ONLY playerlist
    ADD CONSTRAINT playerlist_pkey PRIMARY KEY (id);


--
-- Name: rawlog rawlog_pkey; Type: CONSTRAINT; Schema: public; Owner: rustbot
--

ALTER TABLE ONLY rawlog
    ADD CONSTRAINT rawlog_pkey PRIMARY KEY (id);


--
-- Name: steamstats_audit steamstats_audit_pkey; Type: CONSTRAINT; Schema: public; Owner: rustbot
--

ALTER TABLE ONLY steamstats_audit
    ADD CONSTRAINT steamstats_audit_pkey PRIMARY KEY (id);


--
-- Name: steamstats_server steamstats_server_pkey; Type: CONSTRAINT; Schema: public; Owner: rustbot
--

ALTER TABLE ONLY steamstats_server
    ADD CONSTRAINT steamstats_server_pkey PRIMARY KEY (id);


--
-- Name: tempSteamStats24 tempSteamStats24_pkey; Type: CONSTRAINT; Schema: public; Owner: rustbot
--

ALTER TABLE ONLY "tempSteamStats24"
    ADD CONSTRAINT "tempSteamStats24_pkey" PRIMARY KEY (id);


--
-- Name: tempSteamStats4 tempSteamStats4_pkey; Type: CONSTRAINT; Schema: public; Owner: rustbot
--

ALTER TABLE ONLY "tempSteamStats4"
    ADD CONSTRAINT "tempSteamStats4_pkey" PRIMARY KEY (id);


--
-- Name: tempSteamStats tempSteamStats_pkey; Type: CONSTRAINT; Schema: public; Owner: rustbot
--

ALTER TABLE ONLY "tempSteamStats"
    ADD CONSTRAINT "tempSteamStats_pkey" PRIMARY KEY (id);


--
-- Name: public; Type: ACL; Schema: -; Owner: rustbot
--

GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

