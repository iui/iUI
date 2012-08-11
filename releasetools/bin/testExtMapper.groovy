#!/usr/bin/env groovy

String myPath = '/samples/music/search.php?parms=none'
String regex = '((\\w*/)*)((\\w*)(\\.php)?)(\\?.*)?'
String replacement = '$1$4.gtpl'

String result = myPath.replaceFirst(regex, replacement);

println "myPath = ${myPath}"
println "result = ${result}"
// use replaceFirst() when the init param "resource.name.replace.all"
// is set to false, replaceAll() otherwise
assert  result == '/samples/music/search.gtpl'