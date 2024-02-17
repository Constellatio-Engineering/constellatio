-- Custom SQL migration file, put you code below! --

INSERT INTO "UserRole" ("Identifier", "Name", "Description")
VALUES ('admin', 'Administrator', 'Full access to all features and data'),
       ('forumMod', 'Forum Moderator', 'User with elevated access to moderate forum content')
ON CONFLICT DO NOTHING;
