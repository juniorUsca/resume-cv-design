#ifndef LAYOUT_H
#define LAYOUT_H

//#include "headers.h"
#include "libs/heap.h"

class Layout
{
private:
    string _tokens_chars;
    map<string,pair<string,string>> _dictionary_map;
    map<string,string> _vars_map;
    string _template_route;

    string processLine(string);
public:
    Layout();
    Layout(string _template);

    string loadLayout();

    string getVar(string);
    void setVar(string key, string val);

};

#endif