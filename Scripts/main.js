nova.commands.register("novov.searchdocs.search", (editor) => {
    var query = editor.getTextInRange(editor.selectedRanges[0]).trim(),
        url = null;
    
    if(query == "" || query == null) {
        nova.workspace.showErrorMessage("Not a valid search query.");
        return;
    }
        
    switch(nova.workspace.activeTextEditor.document.syntax) {
        case "javascript":
        case "html":
        case "css":
        case "sass":
        case "scss":
        case "less":
        case "xml":
        case "vue":
        case "typescript":
            url = "https://developer.mozilla.org/en-US/search?q="; break;
        case "python":
            switch(nova.config.get("novov.searchdocs.python")) {
                case "3.x": url = "https://docs.python.org/3/search.html?q="; break;
                case "2.x": url = "https://docs.python.org/2/search.html?q="; break;
            }
        case "php":
            url = "https://www.php.net/manual-lookup.php?pattern="; break;
        case "ruby":
            url = "https://cse.google.com/cse?cx=013598269713424429640%3Ag5orptiw95w&ie=UTF-8&q="; break;
        case "perl":
            url = "https://perldoc.pl/search?q="; break;
        case "shell":
            url = "x-man-page://"; break;
        case "sql":
            switch(nova.config.get("novov.searchdocs.sql")) {
                case "MySQL": url = "https://dev.mysql.com/doc/search/?q="; break;
                case "MariaDB": url = "https://mariadb.com/kb/en/+search/?mapping=nodes&q="; break;
                case "Microsoft SQL": url = "https://docs.microsoft.com/en-us/search/?scope=sql&terms="; break;
            }
    }
    
    if(url == null) {
        nova.workspace.showErrorMessage("Documentation is not supported for the currently selected syntactical mode.");
        return;
    }

    nova.openURL(url + encodeURIComponent(query));
});
    

