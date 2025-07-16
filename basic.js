// 자바스크립트 기초

// 배열 : 순서가 있는 데이터의 집합
const dayOfWeeks = ["월", "화", "수", "목", "금", "토", "일"];
console.log(dayOfWeeks[dayOfWeeks.length - 1]); // 마지막 데이터

// 객체 : key와 value로 구성된 속성들의 묶음
const person = {
  name: "KGA",
  mbti: "ESTJ",
};
// 객체 안의 값을 불러오는 방법
// mbti만 고정적으로 불러올 때
console.log(person.mbti);
// key값이 동적으로 제어되어야 할 때, key 변수 정의 후 사용
const key = "mbti";
console.log(person[key]);

// 반복문 : 특정 조건에 따라 똑같은 기능을 반복해서 수행하는 것
// for문 구성 요소 : 초기값, 반복 조건식, 증감식
// for (let i = 0; i < 10; i++) {
//   console.log(`${i}번째 반복`);
// }

// 배열과 반복문
const animals = ["cat", "dog", "pig"];
// for (let i = 0; i < animals.length; i++) {
//   console.log(`${i}번째 실행`);
//   console.log(animals[i]);
// }

// foreach
animals.forEach((item, index, array) => {
  console.log("🚀 ~ animals.forEach ~ index:", index);
  console.log("🚀 ~ animals.forEach ~ array:", array);
  console.log("🚀 ~ animals.forEach ~ item:", item);
  console.log("------------------------------------");
});

// 자주쓰는 배열 함수 : Map(베열), Filter(배열), Find(요소 / undefined), Some/Every(boolean) : 반환하는 데이터 형태
const newAnimals = animals.map((item) => `${item}`);
console.log(newAnimals);

// filter : 배열로 return
const filteredAnimals = animals.filter((item) => item.startsWith("c"));
console.log("🚀 ~ filteredAnimals:", filteredAnimals);

// find : 조건식 작성( 요소 or ㅕundefined)
const findAnimals = animals.find((item) => item.length === 3);
console.log("🚀 ~ findAnimals:", findAnimals);

// some : item이라는 배열 속 요소 중 하나라도 g로 끝나면 true
const someAnimal = animals.some((item) => item.endsWith("g"));
console.log("🚀 ~ someAnimal:", someAnimal);

// every : item이라는 배열 속 요소가 모두 g로 끝나야지만 true를 반환
const everyAnimal = animals.every((item) => item.endsWith("g"));
console.log("🚀 ~ everyAnimal:", everyAnimal);

console.log("원본 배열", animals);

// React에서 자주 사용하는 ES6 문법
// logical operators
const user = {
  isLoggedIn: true, // 사용자의 로그인 여부
  role: "admin", // "admin", "user", "guest" : 해당 유저의 역할
};

// admin페이지에 접근 가능 여부를 boolean타입으로 나타냄
// true && html
const isAccessAdminPage = user.isLoggedIn && user.role === "admin";
console.log("🚀 ~ isAccessAdminPage:", isAccessAdminPage);
if (isAccessAdminPage) {
  console.log("⭕⭕관리자 페이지에 접근하실 수 있습니다.");
} else {
  console.log("❌❌관리자 페이지에 접근하실 수 없습니다.");
}

// 로그인된 사용자"이거나" role이 admin인 사용자이면 true를 반환
const isAccessUserPage = user.isLoggedIn || user.role === "admin";
console.log("🚀 ~ isAccessUserPage:", isAccessUserPage);

// default parameter : side effect를 막아주기위해, parameter에 default값을 준다
const double = (num = 1) => {
  console.log("🚀 ~ double ~ num:", num);
  return num * 2;
};

console.log("double", double()); // default값인 1의 2배인 값이 나옴
console.log("double", double(2));

// 삼항 연산자 : 조건식 ? TTrue실행값 : False실행값 (조건식이 true/false일때 실행되는 값)
// 조건식 ? "  " : "  "
console.log(
  isAccessAdminPage
    ? "⭕⭕관리자 페이지에 접근하실 수 있습니다."
    : "❌❌관리자 페이지에 접근하실 수 없습니다."
);
// score값이 60점 이상이면 "합격", 60점 미만이면 "탈락"
const score = 50;
const result = score >= 60 ? "합격" : "탈락";
console.log("🚀 ~ result:", result);

// spread syntax : 배열이나 객체를 개별요소로 분해하거나 결합할 때 사용하는 문법
// animals 배열에 항목 추가할 때(원본 배열 수정하면서)
animals.push("value1");
// 원본 배열 안건드리면서 배열 복사 및 항목 추가
const copyArr = [...animals, "value2"];
console.log("animals", animals);
console.log("copyArr", copyArr);

const todoItem = {
  id: 1,
  content: "React 공부하기",
};

const newItem = {
  ...todoItem,
  isComplete: false, // 기존에 존재하지 않은 키값 : 추가
  content: "mongoDB 공부하기", // 기존에 존재하는 키값 : 수정
};

console.log("🚀 ~ todoItem:", todoItem);
console.log("🚀 ~ newItem:", newItem);

// javascript에서 false로 간주되는 것들 4가지
// 숫자 0 : 0 이외의 모든 숫자는 true임
// "" 빈 문자열 (빈 배열은 true임)
// null
// undefined
