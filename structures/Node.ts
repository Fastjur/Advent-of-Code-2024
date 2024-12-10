export interface INode<T> {
  value: T;
  next: INode<T> | null;
}

export class Node<T> implements INode<T> {
  value: T;
  next: INode<T> | null;

  constructor(value: T, next: INode<T> | null = null) {
    this.value = value;
    this.next = next;
  }
}

export interface ILinkedList<T> {
  head: INode<T> | null;
  tail: INode<T> | null;
  length: number;
}
