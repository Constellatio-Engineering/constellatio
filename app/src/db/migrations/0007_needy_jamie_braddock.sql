ALTER TABLE "ArticleView" ADD COLUMN "UpdatedAt" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "CaseView" ADD COLUMN "UpdatedAt" timestamp DEFAULT now();