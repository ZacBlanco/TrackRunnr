
# First Make sure the server is fully shutdown/not already running before starting the application
ID=$(pgrep mongo)
echo $ID
sudo kill $ID

# Start MongoDB with the logpath @ var/log/mongo-trackrunnr with data stored under /data/trackrunnr
# NOTE: May need to first create the /data/trackrunnr directory
sudo mongod --fork --logpath /var/log/mongo-trackrunnr.log --dbpath /data/trackrunnr

# Start the node server
npm start

ID=$(pgrep mongo)
echo 'Mongo Process ID: $ID'
sudo kill $ID
