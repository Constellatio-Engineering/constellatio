-- Custom SQL migration file, put you code below! --

DELETE FROM "Badge";
INSERT INTO "Badge" ("Name", "Identifier", "Description", "ImageFilename", "PublicationState")
VALUES
    ('Starter', 'cases-starter', 'Du hast deinen ersten Fall gelöst!', 'cases-great-job-1.svg', 'published'),
    ('Power User', 'power-user', 'Aktives und engagiertes Forummitglied', 'forum-power-user.svg', 'coming-soon'),
    ('Langzeitmeister', 'longevity-champion', 'Für langfristige Hingabe', 'general-longevity.svg', 'not-listed'),
    ('Meister der Fälle', 'master-of-cases', 'Mastery in der Lösung von Fällen erreicht', 'cases-master-of.svg', 'coming-soon'),
    ('Forum Pro', 'forum-pro', 'Aktiv und hilfreich im Forum', 'forum-pro.svg', 'coming-soon'),
    ('Errungenschaft Perfekte Woche', 'perfect-week-achiever', 'Beständigkeit ist der Schlüssel', 'general-perfect-week.svg', 'coming-soon'),
    ('Schlauer Kerl 10', 'smart-guy-10', 'Erreichte eine Punktzahl von 10', 'cases-smart-guy-10.svg', 'coming-soon'),
    ('Einer von 100', 'one-of-100', 'Unter den Top 100 Teilnehmern', 'general-1-of-100.svg', 'published'),
    ('Spielen und Lernen 25', 'play-and-learn-25', '25-mal durch Spielen gelernt', 'general-play-and-learn-25.svg', 'coming-soon'),
    ('Schlauer Kerl 25', 'smart-guy-25', 'Erreichte eine Punktzahl von 25', 'cases-smart-guy-25.svg', 'coming-soon'),
    ('Dreitagestreifen', 'three-day-streak', 'Kontinuierlich für 3 Tage aktiv', 'general-3-days.svg', 'coming-soon'),
    ('Spielen und Lernen 3', 'play-and-learn-3', 'Durch 3-maliges Spielen gelernt', 'general-play-and-learn-3.svg', 'coming-soon'),
    ('Schlauer Kerl 5', 'smart-guy-5', 'Erreichte eine Punktzahl von 5', 'cases-smart-guy-5.svg', 'coming-soon'),
    ('Auszeichnung für Hingabe', 'dedication-awardee', 'Anerkennung deiner Hingabe', 'general-dedication.svg', 'coming-soon'),
    ('Spielen und Lernen 50', 'play-and-learn-50', '50-mal durch Spielen gelernt', 'general-play-and-learn-50.svg', 'coming-soon'),
    ('Meister des Wörterbuchs', 'master-of-dictionary', 'Ein Meister der Worte', 'dictionary-master-of.svg', 'coming-soon'),
    ('Liebhaber von Favoriten', 'favorites-collector', 'Du liebst unseren Inhalt', 'general-favourites-1.svg', 'published'),
    ('Power User', 'power-user-1', 'Einflussreicher Power-User', 'general-power-user.svg', 'coming-soon'),
    ('Aktives Mitglied 1', 'active-member-1', 'Aktive Mitarbeit seit Tag 1', 'forum-active-member-1.svg', 'coming-soon'),
    ('Feedback-Guru', 'feedback-guru', 'Wertvolles Feedback bereitstellen', 'general-feedback-1.svg', 'not-listed'),
    ('UGC-Uploader 1', 'ugc-uploader-1', 'Erster, der benutzergenerierten Inhalt teilt', 'ugc-upload-1.svg', 'published'),
    ('Aktives Mitglied 10', 'active-member-10', 'Engagiertes Mitglied seit 10 Tagen', 'forum-active-member-10.svg', 'coming-soon'),
    ('Feedback-Meister', 'feedback-master', 'Meister im Geben von Feedback', 'general-feedback-10.svg', 'coming-soon'),
    ('UGC-Uploader 10', 'ugc-uploader-10', 'Benutzergenerierten Inhalt seit 10 Tagen teilen', 'ugc-upload-10.svg', 'coming-soon'),
    ('Aktives Mitglied 5', 'active-member-5', 'Kontinuierlich für 5 Tage aktiv', 'forum-active-member-5.svg', 'coming-soon'),
    ('Feedback-Enthusiast', 'feedback-enthusiast', 'Begeistert vom Geben von Feedback', 'general-feedback-5.svg', 'not-listed'),
    ('UGC-Uploader 5', 'ugc-uploader-5', 'Benutzergenerierten Inhalt seit 5 Tagen teilen', 'ugc-upload-5.svg', 'coming-soon');



