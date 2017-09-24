var MongoClient = require('mongodb').MongoClient;

class DB
{
	constructor() {
		console.log("DB.constructor");
		this.connect();
	}

	connect() {
		var self = this;

		if (self.connection != null) {
			return;
		};
		
		var url = "mongodb://mongoDB:mongoDB@cluster0-shard-00-00-y58jg.mongodb.net:27017,cluster0-shard-00-01-y58jg.mongodb.net:27017,cluster0-shard-00-02-y58jg.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin";
		
		return new Promise(function(resolve, reject) {
			MongoClient.connect(url, function(err, db) {
			  if (err != null) {
			  	return reject(err);
			  };
			  
			  self.connection = db;
			});
		});
	}

	close() {
		if (this.connection != null) {
			// this.connection.close();
		};
	}

	async find(collection, query, callback) {

		var self = this;
		await self.connect();

		self.connection
			.collection(collection)
			.find(query)
			.toArray(function(err, results) {
				callback(err, results);

				self.close();
			});
	}

	async insert(collection, data, callback) {
		var self = this;
		await self.connect();
		self.connection
			.collection(collection)
			.insertOne(data, function(err, result) {
				if (err != null) {
					console.error(err); 
				} else {
					console.log("Inserted a document into the restaurants collection.");
				}
				callback(err, result);

				self.close();
			})
	}

	async update(collection, query, set, callback) {
		var self = this;
		await self.connect();
		self.connection
			.collection(collection)
			.updateOne( 
				query,
				{
					$set: set,
					$currentDate: { "lastModified": true }
				}, function(err, results) {
      				console.log(results);
      				callback(err, results);

      				self.close();
   			});
	}

	async delete(collection, query, callback) {
		self.connection
			.collection(collection)
			.deleteMany(
      			query,
				function(err, results) {
					console.log(results);
					callback(err, results);

					self.close();
				}
			);
	}
}

module.exports = new DB();