#!/usr/bin/env groovy
//
// Thanks to: http://pleac.sourceforge.net/pleac_groovy/fileaccess.html
//
import java.io.*

if (args.length == 0)
{
    println "usage: touchManifest path-to-manifest-file"
    System.exit(-1)
}

def file = new File(args[0]);

processFileInplace(file) { text ->
    text.replaceAll(/(?m)^# Date:.*$/, '# Date: ' + new Date().toString())
}

def processFileInplace(file, Closure processText) {
    def text = file.text
    file.write(processText(text))
}
