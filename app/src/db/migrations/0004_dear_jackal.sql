-- Custom SQL migration file, put you code below! --

INSERT INTO "Badge" ("Name", "Identifier", "Description", "ImageFilename", "PublicationState")
VALUES ('Einer von Tausend', '1-1000', 'Limitiertes Badge für die ersten 1000 Nutzer von Constellatio', 'general-1-of-100.svg', 'published')
ON CONFLICT DO NOTHING;
