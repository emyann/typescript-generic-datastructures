export type CompareFunction<T> = (a: T, b: T) => 0 | 1 | -1;
export type ComparatorKeyExtractor<T> = (a: T) => any;
export interface ComparatorOptions<T> {
  compareFunction?: CompareFunction<T>;
  keyExtractor?: ComparatorKeyExtractor<T>;
}
export class Comparator<T> {
  compare: CompareFunction<T>;
  constructor({ compareFunction, keyExtractor }: ComparatorOptions<T>) {
    if (compareFunction) {
      this.compare = compareFunction;
    } else if (keyExtractor) {
      this.compare = Comparator.defaultCompareFunction<T>(keyExtractor);
    } else {
      throw new Error('Either compareFunction or keyExtractor parameter should be defined');
    }
  }

  static defaultCompareFunction<T>(keyExtractor: ComparatorKeyExtractor<T>) {
    return (a: T, b: T) => {
      const valueA = keyExtractor(a);
      const valueB = keyExtractor(b);
      if (valueA === valueB) {
        return 0;
      }

      return valueA < valueB ? -1 : 1;
    };
  }

  equal(a: T, b: T) {
    return this.compare(a, b) === 0;
  }

  lessThan(a: T, b: T) {
    return this.compare(a, b) < 0;
  }

  greaterThan(a: T, b: T) {
    return this.compare(a, b) > 0;
  }

  lessThanOrEqual(a: T, b: T) {
    return this.lessThan(a, b) || this.equal(a, b);
  }

  greaterThanOrEqual(a: T, b: T) {
    return this.greaterThan(a, b) || this.equal(a, b);
  }

  reverse() {
    const compareOriginal = this.compare;
    this.compare = (a: T, b: T) => compareOriginal(b, a);
  }
}
