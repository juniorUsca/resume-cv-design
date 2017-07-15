#ifndef CONFIG_H
#define CONFIG_H

#include "headers.h"

class Config
{
private:
    map<string,string> _config_map;
public:
    Config();
    void readConfig();

    string getConfig(string);
};

#endif