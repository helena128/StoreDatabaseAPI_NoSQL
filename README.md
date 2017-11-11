# StoreDatabaseAPI_NoSQL
## Setup
Used:
- MongoDB 3.2.17
- Angular v1.6.6
- All other things used in this project are stated in package.json file, so be sure you have npm installed

## Database setup
Create collections in database, use:
```
use storedb

db.createCollection("client")
db.createCollection("staff")
db.createCollection("store")
db.createCollection("purchase")
db.createCollection("product")

```


## Run
To run the application use `node app.js` command (in the root project folder). Application uses port 3000.