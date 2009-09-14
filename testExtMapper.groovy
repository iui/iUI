#!/usr/bin/env groovy

String myPath = '/knowledgeBase/question/show.php?id=33'
String regex = '(\\w*/)*((\\w*)(\\.php)?)(\\?.*)?'
String replacement = '$1$3.gtpl'

String result = myPath.replaceFirst(regex, replacement);

println "result = ${result}"
// use replaceFirst() when the init param "resource.name.replace.all"
// is set to false, replaceAll() otherwise
assert  result == 'question/show.gtpl'