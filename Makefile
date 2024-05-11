.PHONY: api-watch client-server

api-watch:
	cd api && dotnet watch

api-build:
	cd api && dotnet build

client-serve:
	cd client && ng serve

dev: api-watch client-server
