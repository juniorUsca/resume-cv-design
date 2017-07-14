#include <iostream>
#include <fstream>
#include <string>
using namespace std;

int main() {
    ifstream file("test.txt");
    string buffer;
    while (!file.fail()) {
        //file >> buffer;
        getline(file,buffer);
        cout <<"--"<<buffer << endl;
    }
    return 0;
}