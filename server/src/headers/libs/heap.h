#ifndef HEAP_H
#define HEAP_H

#include "headers.h"

template <class T>
struct HeapNode {
    T _data;
    HeapNode<T>* _lower;
};

template <class T>
class Heap
{
private:
    HeapNode<T>* _root;
    HeapNode<T>* _top;
    bool _error;
public:
    Heap();
    ~Heap();

    bool isEmpty();
    bool hasError();
    void push(T);
    T pop();
    T top();

    void print();
};

#endif