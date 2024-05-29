INSERT INTO "Badge" ("Name", "Identifier", "Description", "ImageFilename", "PublicationState") VALUES
    ('Dein Start mit Constellatio', 'fall-1', 'Super! Du hast deinen ersten Fall mit Constellatio gelöst', 'cases-great-job-1.svg', 'published'),
    ('Power Nutzer', 'forum-power', 'Du bist als einer der aktivsten Nutzer im Forum von Constellatio verifiziert', 'forum-power-user.svg', 'coming-soon'),
    ('Disziplin', 'disziplin', 'Du hast insgesamt 25 Stunden auf Constellatio verbracht', 'general-longevity.svg', 'coming-soon'),
    ('BGB AT Profi', 'fall-profi-bgb-at', 'Glückwunsch! Du hast alle Fälle im BGB AT gelöst', 'cases-master-of.svg', 'coming-soon'),
    ('Forum Profi', 'forum-profi', 'Du hast schon 20 Fragen im Constellatio-Forum beantwortet, die durch Constellatio verifiziert wurden', 'forum-pro.svg', 'coming-soon'),
    ('Perfekte Woche', 'perfekte-woche', 'Durchstarter! Du hast 4 perfekte Wochen in Folge geschafft, in denen du an 5/7 Tagen mit Constellatio gelernt hast', 'general-perfect-week.svg', 'coming-soon'),
    ('Profi', 'fall-10', 'Super! Du hast schon 10 Fälle auf Constellatio erfolgreich gelöst', 'cases-smart-guy-10.svg', 'coming-soon'),
    ('Einer von Hundert', '1-100', 'Limitiertes Badge für die ersten 100 Nutzer von Constellatio', 'general-1-of-100.svg', 'published'),
    ('Game Master', 'game-master-25', 'Du hast 25 Gamification-Elemente in den Fällen gelöst und dir dadurch die Inhalte selber erarbeitet', 'general-play-and-learn-25.svg', 'coming-soon'),
    ('Legende', 'fall-25', 'Super! Du hast schon 25 Fälle mit Constellatio erfolgreich gelöst', 'cases-smart-guy-25.svg', 'coming-soon'),
    ('Dauerbrenner', 'dauerbrenner', 'Du hast 3 Tage in Folge mit Constellatio gelernt', 'general-3-days.svg', 'coming-soon'),
    ('Game Master', 'game-master-3', 'Du hast 3 Gamification-Elemente in den Fällen gelöst und dir dadurch die Inhalte selber erarbeitet', 'general-play-and-learn-3.svg', 'coming-soon'),
    ('Fortgeschrittener', 'fall-5', 'Super! Du hast schon 5 Fälle mit Constellatio erfolgreich gelöst', 'cases-smart-guy-5.svg', 'coming-soon'),
    ('Entschlossenheit', 'entschlossenheit', 'Du gibst richtig Gas! Du hast in den letzten 5 Tagen insgesamt 25 h mit Constellatio gelernt', 'general-dedication.svg', 'coming-soon'),
    ('Game Master', 'game-master-50', 'Du hast 50 Gamification-Elemente in den Fällen gelöst und dir dadurch die Inhalte selber erarbeitet', 'general-play-and-learn-50.svg', 'coming-soon'),
    ('BGB AT Profi', 'lexikon-profi-bgb-at', 'Fleißig! Du hast dir alle Lexikon-Artikel im BGB AT angeschaut', 'dictionary-master-of.svg', 'coming-soon'),
    ('Deliktsrecht Profi', 'lexikon-profi-deliktsrecht', 'Fleißig! Du hast dir alle Lexikon-Artikel im Deliktsrecht angeschaut', 'dictionary-master-of.svg', 'coming-soon'),
    ('Sachenrecht Profi', 'lexikon-profi-sachenrecht', 'Fleißig! Du hast dir alle Lexikon-Artikel im Sachenrecht angeschaut', 'dictionary-master-of.svg', 'coming-soon'),
    ('Bereicherungsrecht Profi', 'lexikon-profi-bereicherungsrecht', 'Fleißig! Du hast dir alle Lexikon-Artikel im Bereicherungsrecht angeschaut', 'dictionary-master-of.svg', 'coming-soon'),
    ('Favorit', 'favorit', 'Du hast deinen ersten Fall oder Lexikon-Artikel als Favorit gespeichert', 'general-favourites-1.svg', 'published'),
    ('Power Nutzer', 'power-user-allgemein', 'Du bist als einer der aktivsten Nutzer auf Constellatio verifiziert', 'general-power-user.svg', 'coming-soon'),
    ('Aktiver Nutzer', 'forum-1', 'Du warst zum ersten Mal im Constellatio-Forum aktiv und hast etwas Neues gelernt oder anderen Nutzern geholfen', 'forum-active-member-1.svg', 'coming-soon'),
    ('Feedback Champion', 'feedback-1', 'Vielen Dank! Du hast uns erstmalig Feedback gegeben, um das Design oder den Content von Constellatio zu verbessern', 'general-feedback-1.svg', 'coming-soon'),
    ('Organisationstalent', 'ugc-1', 'Top organisiert! Du hast deine ersten Materialien in Constellatio hochgeladen, um alles an einem Ort zu sammeln', 'ugc-upload-1.svg', 'published'),
    ('Aktiver Nutzer', 'forum-10', 'Du warst schon 10x im Constellatio-Forum aktiv und hast etwas Neues gelernt oder anderen Nutzern geholfen', 'forum-active-member-10.svg', 'coming-soon'),
    ('Feedback Champion', 'feedback-10', 'Vielen Dank! Du hast uns 10x Feedback gegeben, um das Design oder den Content von Constellatio zu verbessern', 'general-feedback-10.svg', 'coming-soon'),
    ('Profi Organisator', 'ugc-10', 'Top organisiert! Du hast bereits 10 Dateien in Constellatio hochgeladen, um alles an einem Ort zu sammeln', 'ugc-upload-10.svg', 'coming-soon'),
    ('Aktiver Nutzer', 'forum-5', 'Du warst schon 5x im Constellatio-Forum aktiv und hast etwas Neues gelernt oder anderen Nutzern geholfen', 'forum-active-member-5.svg', 'coming-soon'),
    ('Feedback Champion', 'feedback-5', 'Vielen Dank! Du hast uns 5x Feedback gegeben, um das Design oder den Content von Constellatio zu verbessern', 'general-feedback-5.svg', 'coming-soon'),
    ('Organisator', 'ugc-5', 'Top organisiert! Du hast bereits 5 Dateien in Constellatio hochgeladen, um alles an einem Ort zu sammeln', 'ugc-upload-5.svg', 'coming-soon');

INSERT INTO "ForumQuestion" ("UserId", "Title", "Slug", "Text") VALUES
    (:UserId, 'Landlord-Tenant Dispute', 'landlord-tenant-dispute', 'Can a landlord increase rent without notice?'),
    (:UserId, 'Intellectual Property Rights', 'intellectual-property-rights', 'How do I protect my software idea?'),
    (:UserId, 'Criminal Defense', 'criminal-defense', 'What are the legal consequences for a first-time DUI offense?');

INSERT INTO "UserRole" ("Identifier", "Name", "Description") VALUES
    ('admin', 'Administrator', 'Full access to all features and data'),
    ('forumMod', 'Forum Moderator', 'User with elevated access to moderate forum content and features');

INSERT INTO "NotificationType" ("NotificationType", "Name", "Description") VALUES
     ('answerToForumQuestionPosted', 'Answer to Forum Question Posted', 'Notification for user when an answer to a forum question is posted'),
     ('forumAnswerAccepted', 'Forum Answer Accepted', 'Notification for user when their answer to a forum question is accepted'),
     ('replyToForumAnswerPosted', 'Reply to Forum Answer Posted', 'Notification for user when a reply to their answer is posted')
ON CONFLICT DO NOTHING;
