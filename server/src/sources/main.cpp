#include "headers.h"
#include "config.h"
#include "layout.h"

int main() {
    Config* config = new Config();
    cout << config->getConfig("language")<<endl;

    Layout* layout = new Layout("files/default-theme/_layouts/default.html");
    cout << layout->loadLayout() << endl;;
    
    //Heap<char>* heap = new Heap<char>();
    //Heap<int>* heapa = new Heap<int>();
    return 0;
}