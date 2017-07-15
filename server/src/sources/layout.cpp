#include "layout.h"

Layout::Layout() {}

Layout::Layout(string _template)
    :_template_route(_template) {
        _tokens_chars = "{}%%";
        _dictionary_map.insert(pair<string,pair<string,string>>(
            "declaration",
            pair<string,string>("{{","}}")
        ));
        _dictionary_map.insert(pair<string,pair<string,string>>(
            "execution",
            pair<string,string>("{%","%}")
        ));
    }

string Layout::processLine(string line) {
    bool flag_var = false;
    bool flag_instruction = false;

    cout <<"------" << line << endl;
    Heap<char>* heap = new Heap<char>();
    vector<int> pos;

    for (int i = 0; i<line.size(); ++i) {
        for (int j = 0; j<_tokens_chars.size(); ++j) {
            if (line[i] == _tokens_chars[j]) {
                if (j % 2 == 0) { // open
                    if (_tokens_chars[j]==_tokens_chars[j+1])
                        if (heap->top() != _tokens_chars[j]) {
                            heap->push(line[i]);
                            pos.push_back(i);
                        } else {
                            heap->pop();
                            pos.push_back(i);
                        }
                    else {
                        heap->push(line[i]);
                        pos.push_back(i);
                    }
                    
                } else { // close
                    if (heap->top() == _tokens_chars[j-1]){
                        heap->pop();
                        pos.push_back(i);
                    }
                }
            }
        }
    }
    //heap->print();
    if (heap->isEmpty() && !heap->hasError() && !pos.empty()){
        string instruction = "";
        map<string,pair<string,string>>::iterator it;
        for (it=_dictionary_map.begin(); it!=_dictionary_map.end(); ++it) {
            pair<string,string> vals = it->second;
            int expression_size = vals.first.size()+vals.second.size();
            if (expression_size <= pos.size()) {
                for (int i = 0; i<pos.size()-expression_size+1;++i) {

                    string tmp = "";
                    string exp_tmp = vals.first+vals.second;
                    for (int j=i;j<i+expression_size;++j)
                        tmp += line[pos[j]];
                    if (tmp==exp_tmp) {
                        cout << "se encontro" << endl ;
                        // begin and end of content
                        int b_var = i + vals.first.size()-1;
                        int e_var = i + vals.first.size();
                        for (int j=pos[b_var]+1;j<pos[e_var];++j)
                            instruction += line[j];
                        cout << instruction << endl;
                        // delete from pos
                    }                    
                }
            }
        }
    }
    pos.clear();
    
    return line;
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
