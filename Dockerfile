FROM python:alpine

COPY . /usr/src/journal
COPY ./entrypoint.sh /usr/src/journal/entrypoint.sh
WORKDIR /usr/src/journal

RUN apk add build-base python3-dev py-pip jpeg-dev zlib-dev
ENV LIBRARY_PATH=/lib:/usr/lib

# install psycopg2
RUN apk update \
    && apk add --virtual build-deps \
    && apk add postgresql-dev gcc musl-dev python3-dev libffi-dev openssl-dev \
    && pip install psycopg2 \
    && apk del build-deps

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN pip install -U pip
RUN pip install -r requirements.txt
# RUN python manage.py migrate

EXPOSE 8000

ENTRYPOINT ["/usr/src/journal/entrypoint.sh"]
