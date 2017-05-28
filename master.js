var fs = require('fs');
var Q = require('q');

var readfile_d = function(filename){
  var defer = Q.defer();
  fs.readFile(filename,function(err,rs){
       if(err) defer.reject(err);
       else defer.resolve(rs);
  });
  return defer.promise;
}

var handle1 = readfile_d('users.json').then(function(val) {
  var defer1 = Q.defer();
  console.log(val.toString());
  fs.readFile('users1.json',function(err,rs){
    if(err) defer1.reject(err);
    else {
      var testObj = {
         rs : rs,
         test : 'test'
      }
      defer1.resolve(testObj);
    }
  });
  return defer1.promise;
},function(err) {
  console.log(err);
});

var handle2 = handle1.then(function(val) {
  var defer2 = Q.defer();
  console.log(val.test);
  fs.readFile('users2.json',function(err,rs){
    if(err) defer2.reject(err);
    else defer2.resolve(rs);
  });
  return defer2.promise;
},function(err) {
  console.log(err);
});

var handle3 = handle2.then(function(val) {
  console.log(val.toString());
  fs.readFile('users3.json',function(err,rs){
    if(err) console.log(err);
    else console.log(rs.toString());
  });
},function(err) {
  console.log(err);
});









