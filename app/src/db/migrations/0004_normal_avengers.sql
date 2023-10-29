-- Custom SQL migration file, put you code below! --

DELETE FROM "Badge";
INSERT INTO "Badge" ("Name", "Slug", "Description", "ImageFilename", "PublicationState")
VALUES
    ('Great Achiever', 'great-achiever', 'Earned for outstanding performance', 'cases-great-job-1.svg', 'coming-soon'),
    ('Power User', 'power-user', 'Active and engaged forum member', 'forum-power-user.svg', 'published'),
    ('Longevity Champion', 'longevity-champion', 'For long-term dedication', 'general-longevity.svg', 'not-listed'),
    ('Master of Cases', 'master-of-cases', 'Achieved mastery in case solving', 'cases-master-of.svg', 'coming-soon'),
    ('Forum Pro', 'forum-pro', 'Active and helpful in the forum', 'forum-pro.svg', 'coming-soon'),
    ('Perfect Week Achiever', 'perfect-week-achiever', 'Consistency is the key', 'general-perfect-week.svg', 'coming-soon'),
    ('Smart Guy 10', 'smart-guy-10', 'Reached a score of 10', 'cases-smart-guy-10.svg', 'published'),
    ('One of 100', 'one-of-100', 'Among the top 100 participants', 'general-1-of-100.svg', 'coming-soon'),
    ('Play and Learn 25', 'play-and-learn-25', 'Learned through playing 25 times', 'general-play-and-learn-25.svg', 'coming-soon'),
    ('Smart Guy 25', 'smart-guy-25', 'Achieved a score of 25', 'cases-smart-guy-25.svg', 'coming-soon'),
    ('Three-Day Streak', 'three-day-streak', 'Consistently active for 3 days', 'general-3-days.svg', 'coming-soon'),
    ('Play and Learn 3', 'play-and-learn-3', 'Learned through playing 3 times', 'general-play-and-learn-3.svg', 'published'),
    ('Smart Guy 5', 'smart-guy-5', 'Reached a score of 5', 'cases-smart-guy-5.svg', 'published'),
    ('Dedication Awardee', 'dedication-awardee', 'Recognizing your dedication', 'general-dedication.svg', 'coming-soon'),
    ('Play and Learn 50', 'play-and-learn-50', 'Learned through playing 50 times', 'general-play-and-learn-50.svg', 'coming-soon'),
    ('Master of Dictionary', 'master-of-dictionary', 'A master of words', 'dictionary-master-of.svg', 'coming-soon'),
    ('Favorites Collector', 'favorites-collector', 'You love our content', 'general-favourites-1.svg', 'coming-soon'),
    ('Power User', 'power-user-1', 'An influential power user', 'general-power-user.svg', 'coming-soon'),
    ('Active Member 1', 'active-member-1', 'Actively contributing since day 1', 'forum-active-member-1.svg', 'coming-soon'),
    ('Feedback Guru', 'feedback-guru', 'Providing valuable feedback', 'general-feedback-1.svg', 'not-listed'),
    ('UGC Uploader 1', 'ugc-uploader-1', 'First to share user-generated content', 'ugc-upload-1.svg', 'coming-soon'),
    ('Active Member 10', 'active-member-10', 'A dedicated member for 10 days', 'forum-active-member-10.svg', 'coming-soon'),
    ('Feedback Master', 'feedback-master', 'Master of providing feedback', 'general-feedback-10.svg', 'published'),
    ('UGC Uploader 10', 'ugc-uploader-10', 'Sharing user-generated content for 10 days', 'ugc-upload-10.svg', 'coming-soon'),
    ('Active Member 5', 'active-member-5', 'Consistently active for 5 days', 'forum-active-member-5.svg', 'coming-soon'),
    ('Feedback Enthusiast', 'feedback-enthusiast', 'Enthusiastic about giving feedback', 'general-feedback-5.svg', 'not-listed'),
    ('UGC Uploader 5', 'ugc-uploader-5', 'Sharing user-generated content for 5 days', 'ugc-upload-5.svg', 'coming-soon');

