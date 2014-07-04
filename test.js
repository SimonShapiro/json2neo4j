/**
 * Created by simonshapiro on 03/07/2014.
 */

var
  l,    test,     json2neo;

test = {
  "name":"simon",
  "age": 104,
  "address":{ "pcode":"bee",
    "address_lines":["one","two",{"x":'X',"y":23,"z":"zed"}]
  },
  "telephones":["01234-","09877-"]
};

json2neo = require("json2neo4j/json2neo4j.js")
l= new json2neo.json2neoContainer("SimonsRecord",test,"PersonRecords");
console.log(JSON.stringify(l.data));
console.log("----------->\n" + l.neo4j_create_string())