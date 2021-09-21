const mysql = require('mysql');

exports.base = (sql,data,callback) => {
	const connection = mysql.createConnection({
		host : 'localhost',
		user : 'root',
		password : 'root',
		database : 'educational_management_system'
	});

	connection.connect();

	connection.query(sql,data,(err,results,fields) => {
		if(err) throw err
		callback(results)
	});

	connection.end()
}