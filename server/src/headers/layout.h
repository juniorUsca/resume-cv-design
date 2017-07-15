#ifndef LAYOUT_H
#define LAYOUT_H

#include "headers.h"
#include "libs/heap.h"

class Layout
{
private:
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