/**
 * Created by simonshapiro on 03/07/2014.
 */


s4 = function () {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
};

var
  test = {
    "name":"simon",
    "age": 54,
    "address":{ "pcode":"bee",
      "address_lines":["one","two",{"x":'X',"y":23,"z":"zed"}]
    },
    "telephones":["01234-","09877-"]
  };

/*

 Target string based on test above

 create (jdocroot:JDoc {value:'uuid'})

 If it is two steps then we would need to match on something in order to get started
 create(jdocroot)-[:name]->(name:JDoc {value:'simon'})
 create (jdocroot)-[:age]->(age:JDoc {value:50})
 create (jdocroot)-[:address]->(address:JDoc {value:'[object Object]'})
 create(address)-[:pcode]->(pcode:JDoc {value:'wd234xa'})
 create (address)-[:addresslines]->(addresslines:JDoc {value:'[object Array]'})
 create (addresslines)-[:adresslines_0]->(addresslines_0:JDoc {value:'one'})
 create (addresslines)-[:addresslines_1]->(addresslines_1:JDoc {value:'two'})
 return jdocroot
 */

var
  json2neoContainer = function(jdoc,data,collection){

    var
      self = this;

    var
      walker = function(obj,col) {
        var
          i, j;
        for (i in obj) {
          var s = "__" + i + "_" + s4();
          col._FN_(i,s,obj[i]);
          if ( typeof(obj[i]) == 'object') {
            col.stack.push(s)
            walker(obj[i],col)
          }
        }
        col.stack.pop();
      };

    var _init_ = function(jdoc,data) {  //ties this jDoc to the collection
      self.collector += "create (collection)-[:_" + jdoc + "]-> (JDocRoot:JDoc {" +
        "name:\'" + jdoc + "\'})\n"
      self.stack.push("JDocRoot");
      self.data = data;
    }

    self.collector = "create (collection:JDoc {collection:\'"+ collection +"\'})\n";
    if (collection) {
      self.collection = collection;
    }
    self.stack = [];
    self.data = {};
    _init_(jdoc,data)

    self._FN_ = function(i,s,obj){
      var
        value,    rel;
      var p = self.stack.slice(-1);
      rel = "_" + i;
      if (Object.prototype.toString.call(obj) == "[object Number]") {
        value = obj
      }
      else {
        value = "'"+ obj + "'"
      }
      self.collector += " create (" + p +")" +
        "-[:" + rel +"]->" +
        "(" + s + ":JDoc {" +
        "name:" + "'" + i + "'" +
        ", value:" + value +
        ", type:'" + Object.prototype.toString.call(obj) + "'})\n"
    }

    self.neo4j_create_string = function() {
      walker(self.data,this);
      return self.collector;
    }
  }

l= new json2neoContainer("SimonsRecord",test,"PersonRecords");
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