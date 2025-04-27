django_service_name = django

build: 
	docker-compose build

down:
	docker-compose down

up: build
	docker-compose up

# Open a bash shell inside the running Django container.
# If the container is not running, start it in detached mode first, then open the shell.
shell:
	@if docker ps --format '{{.Names}}' | grep -q '^$(django_service_name)$$'; then \
		docker-compose exec $(django_service_name) bash; \
	else \
		docker-compose up -d; \
		docker-compose exec $(django_service_name) bash; \
	fi