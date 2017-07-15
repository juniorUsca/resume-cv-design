#ifndef HEAP_H
#define HEAP_H

#include "headers.h"

template <class T>
struct HeapNode {
    T _data;
    HeapNode* _lower;
};

template <class T>
class Heap
{
private:
    HeapNode<T>* _root;
    HeapNode<T>* _top;
public:
    Heap();

    bool isEmpty();
    //bool push();
    //bool pop();
};

#endif