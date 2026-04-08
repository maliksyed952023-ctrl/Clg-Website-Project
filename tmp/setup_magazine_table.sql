-- Table: public.department_magazines

-- DROP TABLE IF EXISTS public.department_magazines;

CREATE TABLE IF NOT EXISTS public.department_magazines
(
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    dept_slug text NOT NULL,
    name text NOT NULL,
    file_url text NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT department_magazines_pkey PRIMARY KEY (id)
);

-- RUN THIS TO UPDATE THE TABLE FOR THUMBNAILS:
ALTER TABLE public.department_magazines ADD COLUMN IF NOT EXISTS thumbnail_url text;
