#include <iostream>
#include <fstream>
#include <string>

#include "miclase.h"

using namespace std;



void compile() {}

int main() {
    miclase* c = new miclase();

    ifstream file("test.txt");
    string buffer;
    while (!file.fail()) {
        //file >> buffer;
        getline(file,buffer);
        cout <<"--"<<buffer << endl;
    }
    return 0;
}