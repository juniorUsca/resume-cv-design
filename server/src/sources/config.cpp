#include "config.h"

Config::Config()
{
    readConfig();
}

void Config::readConfig() {
    ifstream file(ENV_CONFIG);
    string buffer;
    string name, value;
    int i = 0;
    while (getline(file, buffer)) {
        stringstream s_buffer(buffer);
        getline(s_buffer, name, ' ');
        getline(s_buffer, buffer, '"');
        getline(s_buffer, value, '"');
        getline(s_buffer, buffer);

        _config_map.insert(pair<string,string>(name, value));
    }
    file.close();
}

string Config::getConfig(string key) {
    return _config_map[key];
}