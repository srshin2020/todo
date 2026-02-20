# React에서 자주 사용하는 JavaScript 문법 가이드

React 개발에 필수적인 JavaScript 문법들을 주제별로 정리한 가이드입니다.

## 목차

1. [배열/객체 조작](#1-배열객체-조작)
2. [함수 관련](#2-함수-관련)
3. [조건부 렌더링/로직](#3-조건부-렌더링로직)
4. [객체/배열 패턴](#4-객체배열-패턴)
5. [비동기 처리](#5-비동기-처리)
6. [타입 관련 (TypeScript)](#6-타입-관련-typescript)
7. [React 특화 패턴](#7-react-특화-패턴)
8. [모던 JavaScript 패턴](#8-모던-javascript-패턴)
9. [실전 조합 예시](#9-실전-조합-예시)
10. [우선순위별 정리](#10-우선순위별-정리)

---

## 1. 배열/객체 조작

### Spread Operator (`...`)

배열이나 객체를 펼쳐서 복사하거나 확장할 때 사용합니다.

```typescript
// 배열 복사 및 추가
const newTodos = [...todos, newTodo];
const updatedTodos = [newTodo, ...todos];

// 객체 복사 및 업데이트
const newUser = { ...user, name: '새 이름' };
const merged = { ...obj1, ...obj2 };

// React State 업데이트
setTodos(prev => [...prev, newTodo]);
setUser(prev => ({ ...prev, name: '새 이름' }));
```

### Destructuring (구조 분해 할당)

배열이나 객체에서 값을 추출할 때 사용합니다.

```typescript
// 배열 구조 분해
const [first, second, ...rest] = todos;
const [count, setCount] = useState(0);

// 객체 구조 분해
const { name, age } = user;
const { todos, setTodos } = useTodos();

// Props 구조 분해
function TodoItem({ id, text, completed }: TodoProps) {
    // ...
}

// 중첩 구조 분해
const { user: { name, profile: { avatar } } } = data;
```

### Array Methods

배열을 처리하는 메서드들입니다.

```typescript
// map: 렌더링에 필수
{todos.map(todo => <TodoItem key={todo.id} todo={todo} />)}

// filter: 필터링
const completedTodos = todos.filter(todo => todo.completed);

// find: 특정 항목 찾기
const todo = todos.find(t => t.id === id);

// reduce: 집계
const total = todos.reduce((sum, todo) => sum + todo.price, 0);

// some: 조건 만족 여부
const hasCompleted = todos.some(todo => todo.completed);

// every: 모든 항목이 조건 만족
const allCompleted = todos.every(todo => todo.completed);
```

---

## 2. 함수 관련

### Arrow Functions

간결한 함수 표현식입니다.

```typescript
// 이벤트 핸들러
const handleClick = () => {
    // ...
};

// JSX에서 인라인
<button onClick={() => handleClick(id)}>Click</button>

// map, filter 등에서
todos.map(todo => todo.text)

// 매개변수가 하나일 때 괄호 생략 가능
todos.map(todo => todo.text)

// 객체 반환 시 괄호 필요
const getTodo = (id) => ({ id, text: 'Todo' });
```

### Higher-Order Functions

함수를 인자로 받거나 반환하는 함수입니다.

```typescript
// 함수를 인자로 받는 함수
const handleChange = (e: ChangeEvent) => {
    setValue(e.target.value);
};

// 함수를 반환하는 함수
const createHandler = (id: number) => () => {
    handleClick(id);
};

// 사용
<button onClick={createHandler(123)}>Click</button>
```

### Callback Functions

다른 함수에 전달되는 함수입니다.

```typescript
// 이벤트 핸들러
<input onChange={(e) => setValue(e.target.value)} />

// useEffect, useMemo 등
useEffect(() => {
    // ...
}, [deps]);

// 배열 메서드
todos.forEach(todo => console.log(todo));
```

---

## 3. 조건부 렌더링/로직

### Ternary Operator (`? :`)

조건에 따라 다른 값을 반환합니다.

```typescript
// 조건부 렌더링
{isLoading ? <Spinner /> : <Content />}

// 조건부 값
const status = isCompleted ? '완료' : '진행중';

// 중첩 조건
{error 
    ? <ErrorMessage error={error} />
    : isLoading 
        ? <Spinner />
        : <Content />
}
```

### Logical AND (`&&`)

조건이 true일 때만 렌더링합니다.

```typescript
// 조건부 렌더링
{error && <ErrorMessage error={error} />}
{user && <UserProfile user={user} />}

// 여러 조건
{isLoggedIn && user && <Dashboard user={user} />}
```

### Optional Chaining (`?.`)

안전하게 객체 속성에 접근합니다.

```typescript
// 안전한 접근
const name = user?.profile?.name;
const length = todos?.length ?? 0;

// 함수 호출
onSubmit?.();

// 배열 접근
const firstTodo = todos?.[0];

// 옵셔널 체이닝과 함께 사용
const avatar = user?.profile?.avatar ?? '/default-avatar.png';
```

### Nullish Coalescing (`??`)

null이나 undefined일 때만 기본값을 사용합니다.

```typescript
// 기본값 설정
const count = todos?.length ?? 0;
const name = user?.name ?? '익명';

// ||와의 차이
const value1 = 0 || 'default'; // 'default' (0은 falsy)
const value2 = 0 ?? 'default'; // 0 (0은 nullish가 아님)
```

---

## 4. 객체/배열 패턴

### Object Shorthand

속성 이름과 변수 이름이 같을 때 축약할 수 있습니다.

```typescript
// 속성 이름과 변수 이름이 같을 때
const name = 'John';
const age = 30;
const user = { name, age }; // { name: 'John', age: 30 }

// 함수도 가능
const obj = {
    handleClick() {
        // ...
    }
};

// React에서 자주 사용
const todo = { id, text, completed };
```

### Computed Property Names

동적으로 속성 이름을 설정합니다.

```typescript
// 동적 속성 이름
const key = 'completed';
const todo = {
    [key]: true,
    [`${key}At`]: Date.now()
};

// 함수에서 사용
const createTodo = (type: string) => ({
    [`${type}Todo`]: true
});
```

### Template Literals

문자열을 동적으로 생성합니다.

```typescript
// 문자열 연결
const message = `Hello, ${name}!`;
const className = `todo-item ${isCompleted ? 'completed' : ''}`;

// 여러 줄
const html = `
    <div>
        <h1>${title}</h1>
        <p>${content}</p>
    </div>
`;

// 중첩 표현식
const url = `/api/todos/${id}?status=${isCompleted ? 'done' : 'pending'}`;
```

---

## 5. 비동기 처리

### Async/Await

비동기 코드를 동기적으로 작성합니다.

```typescript
// API 호출
const fetchTodos = async () => {
    const response = await fetch('/api/todos');
    const data = await response.json();
    setTodos(data);
};

// useEffect에서
useEffect(() => {
    const loadData = async () => {
        const data = await fetchData();
        setData(data);
    };
    loadData();
}, []);

// 에러 처리
const fetchTodos = async () => {
    try {
        const response = await fetch('/api/todos');
        const data = await response.json();
        setTodos(data);
    } catch (error) {
        console.error('Error:', error);
    }
};
```

### Promise

Promise를 사용한 비동기 처리입니다.

```typescript
// Promise 체이닝
fetch('/api/todos')
    .then(res => res.json())
    .then(data => setTodos(data))
    .catch(err => console.error(err));

// Promise.all
const fetchAll = async () => {
    const [todos, users] = await Promise.all([
        fetch('/api/todos').then(r => r.json()),
        fetch('/api/users').then(r => r.json())
    ]);
};
```

---

## 6. 타입 관련 (TypeScript)

### Type Assertions

타입을 명시적으로 지정합니다.

```typescript
// 타입 단언
const element = document.getElementById('root') as HTMLElement;
const data = response as Todo[];

// Non-null assertion
const user = getUser()!; // null이 아님을 보장
```

### Generics

제네릭을 사용한 타입 정의입니다.

```typescript
// useState
const [todos, setTodos] = useState<Todo[]>([]);

// useMemo
const filtered = useMemo<Todo[]>(() => {
    return todos.filter(/* ... */);
}, [todos]);

// 함수 제네릭
function identity<T>(arg: T): T {
    return arg;
}
```

### Type Guards

타입을 확인하는 함수입니다.

```typescript
// 타입 가드
function isTodo(obj: any): obj is Todo {
    return obj && typeof obj.id === 'number';
}

// 사용
if (isTodo(data)) {
    // data는 Todo 타입으로 추론됨
    console.log(data.text);
}
```

---

## 7. React 특화 패턴

### Immediately Invoked Function Expression (IIFE)

즉시 실행 함수입니다.

```typescript
// 즉시 실행 함수
const initialValue = (() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
})();

// useState 초기값으로 사용
const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
});
```

### Short-Circuit Evaluation

조건부 실행을 간단하게 표현합니다.

```typescript
// 조건부 실행
{isLoggedIn && <Dashboard />}
{error || <DefaultContent />}

// 함수 호출
{shouldCall && handleClick()}
```

### Default Parameters

기본 매개변수를 설정합니다.

```typescript
// 기본 매개변수
function TodoItem({ 
    id, 
    text, 
    completed = false 
}: TodoProps) {
    // ...
}

// 함수 매개변수
function createTodo(text: string, priority: 'high' | 'low' = 'low') {
    // ...
}
```

---

## 8. 모던 JavaScript 패턴

### Optional Parameters

선택적 매개변수입니다.

```typescript
// 선택적 매개변수
function createTodo(text: string, priority?: 'high' | 'low') {
    // ...
}

// 선택적 속성
interface Todo {
    id: number;
    text: string;
    completed?: boolean;
}
```

### Rest Parameters

나머지 매개변수를 받습니다.

```typescript
// 나머지 매개변수
function sum(...numbers: number[]) {
    return numbers.reduce((a, b) => a + b, 0);
}

// 구조 분해와 함께
function handleClick(id: number, ...args: any[]) {
    // ...
}
```

### Object.freeze / Object.seal

객체를 불변으로 만듭니다 (드물게 사용).

```typescript
// 불변 객체 (드물게 사용)
const config = Object.freeze({ apiUrl: 'https://api.com' });
```

---

## 9. 실전 조합 예시

### React에서 자주 보는 패턴

```typescript
// 1. State 업데이트 패턴
setTodos(prev => [...prev, newTodo]);
setUser(prev => ({ ...prev, name: '새 이름' }));

// 2. 조건부 렌더링
{isLoading && <Spinner />}
{error ? <Error /> : <Content />}

// 3. 이벤트 핸들러
const handleClick = (id: number) => () => {
    handleDelete(id);
};

// 4. 필터링 + 매핑
const completedTodos = todos
    .filter(todo => todo.completed)
    .map(todo => todo.text);

// 5. 안전한 접근
const userName = user?.profile?.name ?? '익명';

// 6. 복잡한 조건부 렌더링
{isLoading 
    ? <Spinner />
    : error 
        ? <ErrorMessage error={error} />
        : <TodoList todos={todos} />
}

// 7. 동적 클래스명
const className = `todo-item ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}`;

// 8. 객체 업데이트
const updateTodo = (id: number, updates: Partial<Todo>) => {
    setTodos(prev => prev.map(todo => 
        todo.id === id ? { ...todo, ...updates } : todo
    ));
};
```

---

## 10. 우선순위별 정리

### 필수 (매일 사용) ⭐⭐⭐

| 문법 | 용도 | 예시 |
|------|------|------|
| `...` | 배열/객체 복사, 확장 | `[...todos, newTodo]` |
| `const { a } = obj` | 구조 분해 | `const { name } = user` |
| `() => {}` | 화살표 함수 | `const handleClick = () => {}` |
| `.map()`, `.filter()` | 배열 처리 | `todos.map(t => t.text)` |
| `? :` | 조건부 | `{isLoading ? <Spinner /> : <Content />}` |
| `&&` | 조건부 렌더링 | `{error && <Error />}` |

### 자주 사용 ⭐⭐

| 문법 | 용도 | 예시 |
|------|------|------|
| `?.` | 안전 접근 | `user?.profile?.name` |
| `??` | 기본값 | `name ?? '익명'` |
| `` ` `` | 템플릿 리터럴 | `` `Hello, ${name}!` `` |
| `async/await` | 비동기 | `const data = await fetch()` |

### 가끔 사용 ⭐

| 문법 | 용도 | 예시 |
|------|------|------|
| `[key]` | 동적 속성 | `{[key]: value}` |
| `...args` | 나머지 매개변수 | `function(...args) {}` |
| `(() => {})()` | IIFE | `const value = (() => {})()` |

---

## 학습 순서 추천

1. **기초**: Spread, Destructuring, Arrow Functions
2. **중급**: Array Methods, Conditional Rendering, Optional Chaining
3. **고급**: Async/Await, TypeScript Patterns, Custom Hooks

---

## 참고사항

- React는 불변성(Immutability)을 중요시하므로 `...` 연산자를 자주 사용합니다
- 조건부 렌더링은 `&&`와 `? :`를 상황에 맞게 선택합니다
- TypeScript를 사용한다면 타입 안정성을 위해 제네릭과 타입 가드를 활용하세요
- 비동기 처리는 `async/await`가 `Promise`보다 읽기 쉽습니다

---

**마지막 업데이트**: 2024년

