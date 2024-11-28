-- Custom SQL migration file, put you code below! --

UPDATE "Badge"
SET "PublicationState" = 'published'
WHERE "Identifier" IN (
  'disziplin',
  'game-master-3',
  'game-master-25',
  'game-master-50',
  'favorit',
  'fall-1',
  'fall-5',
  'fall-10',
  'fall-25',
  'forum-1',
  'forum-5',
  'forum-10',
  'forum-profi',
  '1-100',
  '1-1000',
  'streak-14',
  'streak-42',
  'streak-84',
  'ugc-1',
  'ugc-5',
  'ugc-10'
);