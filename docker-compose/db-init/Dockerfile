FROM mongo

COPY db.json /db.json
CMD mongoimport --host db --port "27017" --db "mydb" --collection "mycollection" --type json --file /db.json --jsonArray