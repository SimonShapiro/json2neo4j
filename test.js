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
//l._neo4j_create_string_("SimonsRecord",test);  //todo return the neo4j create string
//console.log("=======" + l.collection)
//console.log(JSON.stringify(l))
console.log("setup jDocRoot {contains doc level info}\n" +
  "............This is normal node from the meta modelling capability\n" +
  "............Which would merge meta model (object) semantics with attribute semantics via json\n" +
  "............But it would have a big impact on meta model/schema functionality\n" +
  "............Try for a single create statement, need to be careful with array elements  2->x vs 2->y elsewhere")
//walker("123",test, l);  //todo internalise walker
//l.run();
console.log("----------->\n" + l.neo4j_create_string())