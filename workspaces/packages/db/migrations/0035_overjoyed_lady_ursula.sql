INSERT INTO "ContentView" ("UserId", "ContentItemId", "CreatedAt", "ContentItemType")
SELECT
    "UserId",
    "ContentItemId",
    "CreatedAt",
    "ContentItemType"
FROM (
     SELECT
         "UserId",
         "CaseId" AS "ContentItemId",
         "CreatedAt" AS "CreatedAt",
         'case'::"ContentItemViewType" AS "ContentItemType"
     FROM "CaseView"

     UNION ALL

     SELECT
         "UserId",
         "ArticleId" AS "ContentItemId",
         "CreatedAt" AS "CreatedAt",
         'article'::"ContentItemViewType" AS "ContentItemType"
     FROM "ArticleView"
) AS combined_views
ORDER BY "CreatedAt";
