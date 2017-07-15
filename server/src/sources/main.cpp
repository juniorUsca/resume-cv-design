#include "headers.h"
#include "config.h"

int main() {
    Config* config = new Config();
    cout << config->getConfig("language")<<endl;
    
    return 0;
}