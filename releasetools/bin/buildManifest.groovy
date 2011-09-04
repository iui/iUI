#!/usr/bin/env groovy
//
// Should be run from project root directory (uses relative paths)
//
import java.io.*

def outputFile = null;

def iUIThemes = ['default', 'defaultgrad', 'ipdc']
def iUISandboxThemes = ['android', 'webos']
def mfest = new HTMLManifest("web-app/samples/music/music.manifest")

def iuiPath = "../../iui";

def filenameFilter = ~/[^\.]+\.(png|gif|css|js)/;
def jsFilter = ~/[^\.]+\.js/;

mfest.addDir(jsFilter, ".");  // one more .js file

mfest.addDir(filenameFilter, iuiPath);  // iui dir
iUIThemes.each{ mfest.addDir(filenameFilter, iuiPath + "/t/" + it) } // all iui themes
iUISandboxThemes.each{ mfest.addDir(filenameFilter, iuiPath + "/ext-sandbox/t/" + it) } // all iui themes

mfest.addDir(['iui-theme-switcher.js'], "../../iui/js");  // one more .js file
mfest.addDir(['iui-cache-manager.js'], "../../iui/ext-sandbox/cache-manager");  // one more .js file

mfest.network = ['search.gtpl', 'stats.gtpl' ]
mfest.fallback = ['search.gtpl':'search.html', 'stats.gtpl':'stats.html']

//mfest.addDir(filenameFilter, ".");  // same directory as manifest file

outputFile = mfest.file

if (outputFile)
{
    outputFile.withWriter(HTMLManifest.charSet, mfest.output);
}
else
{
    System.out.withWriter(HTMLManifest.charSet, mfest.output);
}


class HTMLManifest
{
    static String charSet           = "UTF-8"
    static String firstLine         = "CACHE MANIFEST\n"
    static String cacheSection      = "CACHE:\n"
    static String networkSection    = "NETWORK:\n"
    static String fallbackSection   = "FALLBACK:\n"
    
    File    file
    File    base
    String  header = "# header goes here\n";
    Date    modDate = new Date();
    def     cache = []
    def     network = []
    def     fallback = [:]
    // TBD fallback
    
    HTMLManifest(String fileName)
    {
        this(new File(fileName));
    }
    
    HTMLManifest(File file)
    {
        this.file = file
        this.base = file.parentFile
    }
    
    // 'dir' is a path relative to the base directory
    void addDir(Object filter, String dir)
    {
        if (dir == ".")
        {
            addDir(filter, base);
        }
        else
        {
            addDir(filter, new File(this.base, dir))
        }
    }

    void addDir(Object filter, File dir)
    {
        dir.eachFileMatch(filter, {
         if (it.isFile())
         {
            cache.add(it)
         }
        })
    }
        
    def output = { java.io.Writer writer ->
        writer << HTMLManifest.firstLine
        writer << '# Date ' + this.modDate << "\n"
        writer << this.header
        this.cache.each{ filePath ->
            writer << filePath.path.substring(base.path.length()+1) << "\n"
        }
        if (network.size() > 0)
        {
            writer << HTMLManifest.networkSection
            this.network.each{ filePath ->
                writer << filePath << "\n"
            }
        }
        if (fallback.size() > 0)
        {
            writer << HTMLManifest.fallbackSection
            this.fallback.each{ net, fallback ->
                writer << net + " " + fallback << "\n"
            }
        }
    }
}
