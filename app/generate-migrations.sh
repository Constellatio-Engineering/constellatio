# 1) Run migrations as normal
pnpm run migrations:generate


file_name=$(pnpm run migrations:generate:custom | grep -o '\b\S\+\.sql\b') && cat ./src/db/custom-sql/enable-row-level-security.sql >> "$file_name"
