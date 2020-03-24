FROM postgres:latest

ENV POSTGRES_USER areaapi
ENV POSTGRES_PASSWORD toor
ENV POSTGRES_DB area

ADD CreateDB.sql /docker-entrypoint-initdb.d/CreateDB.sql

