#!/bin/bash -e

readonly SCRIPT_DIR=${0%/*}

readonly DATABASE=sample
readonly DATABASE_USER=sample
readonly DATABASE_PASS="!QAZxsw2"
readonly DATABASE_HOST="127.0.0.1"
readonly DATABASE_PORT=5432

helps() {
	case $1 in
		all|*) allhelps ;;
	esac
}

allhelps() {
cat <<EOF
<...>: optional
[...]: required

help     : Show this text

[Containers]
start          : Run docker-compose as daemon
stop           : Terminate all docker containers run by docker-compose
restart        : Restart docker-compose containers
status         : Print out status for docker containers
logs           : Print out the logs of specified docker containers
ssh            : Get inside of service container

[Interactive]
db|psql  : Run pgcli in docker container (falls back to psql if pgcli is not installed)

EOF
}

start() {
	docker-compose up -d
}
stop() {
	docker-compose down
}
restart() {
	docker-compose restart
}
status() {
	docker-compose ps
}
rebuild() {
	docker-compose build
}
log() {
	docker-compose logs
}
tailf() {
	docker-compose logs -f
}
dockerssh() {
	docker-compose exec --user postgres pg /bin/bash
}
dockerpsql() {
	local username=${1:-${DATABASE_USER}}
	local password=${2:-${DATABASE_PASS}}
	local database=${3:-${DATABASE}}
	local port=${4:-${DATABASE_PORT}}
	local dsn=postgres://${username}:${password}@localhost:${port}/${database}

	if which pgcli >/dev/null; then
		pgcli $dsn
	else
		docker-compose exec --user postgres pg psql -U${username} -d${database}
	fi
}
run_migrate() {
	migrate -database postgres://${DATABASE_USER}:${DATABASE_PASS}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE}?sslmode=disable -source file://migrations $@
}

case $1 in
	# Control docker containers
	start|up) start ;;
	stop|down) stop ;;
	restart|reboot) restart ;;
	status|ps) status ;;
	rebuild) rebuild ;;
	log|logs) log ;;
	tailf|logf) tailf ;;

	# Accessing individual containers
	ssh) dockerssh ${2:-pg} ;;
	db|psql) dockerpsql ;;
	migrate) shift 1; run_migrate $@ ;;

	# Usage (may not well maintained :P)
	help) helps ${2:-all} ;;
	*) helps ;;
esac
