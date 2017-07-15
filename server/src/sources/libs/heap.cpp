#include "libs/heap.h"

template <class T>
Heap<T>::Heap() {
  _root = nullptr;
  _top = nullptr;
  _error = false;
}

template <class T>
Heap<T>::~Heap() {
  cout <<"Adios Heap"<< endl;
}

template <class T>
bool Heap<T>::isEmpty () {
  return (_top == nullptr)? true : false;
}

template <class T>
bool Heap<T>::hasError () {
  return _error;
}

template <class T>
void Heap<T>::push (T data) {
  if (_root==nullptr) {
    _root = new HeapNode<T>();
    _root->_data = data;
    _root->_lower = nullptr;
    _top = _root;
  } else {
    HeapNode<T>* _new = new HeapNode<T>();
    _new->_data = data;
    _new->_lower = _top;
    _top = _new;
  }
}
template <class T>
T Heap<T>::pop () {
  if (_top != nullptr) {
    HeapNode<T>* _tmp = _top;
    _top = _tmp->_lower;
    delete _tmp;
    if (_top == nullptr) _root = nullptr;
  } else
    _error = true;
}

template <class T>
T Heap<T>::top () {
  if (_top != nullptr)
    return _top->_data;
  else
    return NULL;
}

template <class T>
void Heap<T>::print () {
  cout << "--- HEAP ---" << endl;
  HeapNode<T>* _tmp = _top;
  while (_tmp != nullptr) {
    cout << _tmp->_data << endl;
    _tmp = _tmp->_lower;
  }
  cout << "------------" << endl;
}


template class Heap<char>;