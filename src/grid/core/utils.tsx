import { Accessor, createMemo, on } from "solid-js";

export const classesList = (...list: (string | null | undefined)[]): string => {
  const filtered = list.filter((s) => s != null && s !== "");

  return filtered.join(" ");
};

export class CssClasses {
  private classesMap: { [name: string]: boolean } = {};

  constructor(...initialClasses: string[]) {
    initialClasses.forEach((className) => {
      this.classesMap[className] = true;
    });
  }

  public setClass(className: string, on: boolean): CssClasses {
    // important to not make a copy if nothing has changed, so react
    // won't trigger a render cycle on new object instance
    const nothingHasChanged = !!this.classesMap[className] == on;
    if (nothingHasChanged) {
      return this;
    }

    const res = new CssClasses();
    res.classesMap = { ...this.classesMap };
    res.classesMap[className] = on;
    return res;
  }

  public toString(): string {
    const res = Object.keys(this.classesMap)
      .filter((key) => this.classesMap[key])
      .join(" ");
    return res;
  }
}

export const isComponentStateless = (Component: any) => {
  const hasSymbol = () => typeof Symbol === "function" && Symbol.for;
  const getMemoType = () => (hasSymbol() ? Symbol.for("react.memo") : 0xead3);

  return (
    (typeof Component === "function" &&
      !(Component.prototype && Component.prototype.isReactComponent)) ||
    (typeof Component === "object" && Component.$$typeof === getMemoType())
  );
};

/**
 * Memoizes the props of an object
 * @param obj The object to memoize
 * @returns A reactive {@link Accessor} that gets updated when properties get added/removed from {@link obj}
 */
export const memoObj = <T extends object>(obj: T): Accessor<T> => {
  const keys = createMemo(() => Object.keys(obj) as (string & keyof T)[], undefined, {
    equals: compareList,
  });
  return createMemo(
    on(keys, (list) => {
      const out: T = {} as any;
      for (const key of list) {
        Object.defineProperty(out, key, {
          enumerable: true,
          configurable: true,
          get: createMemo(() => obj[key]),
        });
      }
      return out;
    }),
  );
};

/**
 * Checks whether two lists are equals
 * @param prev The previous list
 * @param next The next list
 */
const compareList = <T,>(prev: T[], next: T[]) => {
  return prev.length === next.length && prev.every((x, i) => x === next[i]);
};

export interface RefPointer<T> {
  instance?: T;
  afterSet?: (ref: T) => void;
}
