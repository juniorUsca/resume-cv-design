#include "layout.h"

Layout::Layout() {}

Layout::Layout(string _template)
    :_template_route(_template) {}

string Layout::processLine(string line) {
    bool flag_var = false;
    bool flag_instruction = false;

    Heap<char>* heap = new Heap<char>();

    for (int i = 0; i<line.size(); ++i) {
        if( line[i] == '{' &&
            i+1<line.size() &&
            line[i+1] == '{' ) {
            //flag
        }
    }
    return "";
}

string Layout::loadLayout() {
    ifstream file(_template_route);
    string buffer;
    string html = "";
    while (getline(file, buffer)) {
        html += processLine(buffer);
    }
    file.close();
    return html;
}

string Layout::getVar(string key) {
    return _vars_map[key];
}

void Layout::setVar(string key, string val) {
    _vars_map[key] = val;
}
