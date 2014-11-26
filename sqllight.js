function SQLLight(databaseName) {
    //STORED FUNCTIONS
    SQLLight.prototype.db = openDatabase(databaseName, '1.0', 'SQL Light JS Database', 2 * 1024 * 1024);

    SQLLight.prototype.DBRunSQL = function (sql, params, success, error) {
        this.db.transaction(function (tx) {
            tx.executeSql(sql, params, success, error);
        });
    }

    SQLLight.prototype.CreateTable = function (tableName, params) {
        var CreateSQL = params.join(" TEXT NULL, ");
        CreateSQL = "CREATE TABLE IF NOT EXISTS " + tableName + " (" + CreateSQL + " TEXT NULL)";
        this.DBRunSQL(CreateSQL, [], function () {
            console.log("Creation of table '" + tableName + "' was successful.");
        }, function () {
            console.log("Creation of table '" + tableName + "' failed. Please verify the data you are passing to 'CreateTable'.");
        });
    }

    SQLLight.prototype.DropTable = function (tableName) {
        this.DBRunSQL("DROP TABLE " + tableName, [], function () {
            console.log("Dropping table '" + tableName + "' was successful.");
        }, function () {
            console.log("Dropping table '" + tableName + "' failed, this can occur if the table already doesn't exist.");
        });
    }

    SQLLight.prototype.GetData = function (select, table, where, success) {
        instanceCallback = success;
        this.DBRunSQL("SELECT " + select + " FROM " + table + " WHERE " + where, [], ReturnData, null);
    }

    //INSTANCE FUNCTIONS
    var instanceCallback;
    function ReturnData(tx, results) {
        instanceCallback(results);
    }
}