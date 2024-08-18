
auto-ubuntu:
	@read -p "Enter migration name: " name; \
	npm run migration:generate -- database/migrations/$$name
auto-windows:
	@call generate-migration.bat

up:
	npm run migration:run
down:
	npm run migration:revert