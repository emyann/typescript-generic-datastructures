import { ToStringCallback } from '../../utilities/types';

export class LinkedListNode<T> {
  value: T;
  next: LinkedListNode<T> | null;
  constructor(value: T, next: LinkedListNode<T> | null = null) {
    this.value = value;
    this.next = next;
  }

  toString(callback: ToStringCallback<T>) {
    return callback ? callback(this.value) : `${this.value}`;
  }
}
