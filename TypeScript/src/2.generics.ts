// knowledge checkpoint: TS tuple, generics, Closure
function simpleState<T>(initial: T): [() => T, (v: T) => void] {
  let val: T = initial;
  return [
    () => val,
    (v: T) => {
      val = v;
    },
  ];
}

const [strgetter, strsetter] = simpleState<string | null>(null);
const [numgetter, numsetter] = simpleState(1);
console.log(strgetter());
console.log(numgetter());
strsetter("goodbye");
console.log(strgetter());
console.log(numgetter());


// knowledge checkpoint: generics
interface Rank<T> {
  item: T,
  rank: number;
}

function ranker<T>(
  items: Array<T>,
  rankAlgo: ((v: T) => number)
): Array<T> {
  const itemsWithrank: Array<Rank<T>> = items.map((item) => ({
    item,
    rank: rankAlgo(item),
  }));

  itemsWithrank.sort((a, b) => a.rank - b.rank);

  return itemsWithrank.map(itemsWithrank => itemsWithrank.item);
}

const strsToTest = ["XxxxxxxxxX", "hello", "world!", "xjy",];

const ranks = ranker(strsToTest, (str) => str.length);
console.log(ranks);


//  knowledge checkpoint: TS generics, keyof
// 1
function pluck<DataType, KeyType extends keyof DataType>(
  items: DataType[],
  key: KeyType
): DataType[KeyType][] {
  return items.map((item) => item[key]);
}

const dogs = [
  { name: "Mimi", age: 12 },
  { name: "LG", age: 13 },
];

console.log(pluck(dogs, "age"));
console.log(pluck(dogs, "name"));

// 2
interface BaseEvent {
  time: number;
  user: string;
}

interface EventMap {
  addToCart: BaseEvent & { quantity: number; productID: string; };
  checkout: BaseEvent;
}

function sendEvent<Name extends keyof EventMap>(
  name: Name,
  data: EventMap[Name]
): void {
  console.log([name, data]);
}

sendEvent("addToCart", {
  time: 10,
  user: 'xjy',
  quantity: 12,
  productID: "e32d2d2e23"
});


// 3 generic function types vs generic types of function
interface Person {
  id: string; // unique identifier
  name: string;
  age: number;
}
const isInstanceOfPerson = (obj: any): obj is Person =>
  typeof (obj as Person).id === "string";

// 3.1 generic type of functions
type FC<Props> = (props: Props) => any; // declare

const myFunc: FC<Person> = ({ age, name }: Person) => { // implement (id, name) are destructed from passed person
  console.log(age);
  console.log(name);

};

myFunc({ // use
  id: "1wec3212",
  name: "xjy",
  age: 22
});


// 3.2 generic function types
type FC1 = <Props>(props: Props) => any; // declare

const myFunc1: FC1 = <Props>(props: Props) => { // implement
  if (isInstanceOfPerson(props)) {
    const { age, name, } = props;
    console.log(age);
    console.log(name);
  }
};

myFunc1<Person>({ // use
  id: "1wec3212",
  name: "xjy",
  age: 22
}); 