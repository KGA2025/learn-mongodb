import express from "express";
import dotenv from "dotenv";
import { MongoClient, ObjectId } from "mongodb";

const app = express();

// 환경변수 로드
dotenv.config();

// JSON형태의 데이터를 객체로 반환
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.DB_NAME;

// MongoDB 연결
// MongoDB 객체 생성(mongodb와의 연결을 관리하고 상호작용에 사용)
const client = new MongoClient(MONGODB_URI);
const db = client.db(DB_NAME); // 데이터베이스 선택
const collection = db.collection("users"); // 컬랙션 선택

// 데이터 읽기 - FIND
app.get("/users", async (req, res) => {
  try {
    // Cursor 객체 : 데이터를 한개씩 순차적으로 가져와 document를 반환, 한번에 다 가져오지 않고 순차적으로 반환
    // find의 return 형식 = cursor 객체
    // toArray는 다 받아올때까지 기다림
    const users = await collection.find().toArray();
    console.log("🚀 ~ app.get ~ users:", users.length);
    console.log("🚀 ~ app.get ~ users:", users);
    // 응답
    res.status(200).json(users);
  } catch (error) {
    console.log(`fetch error: ${error}`);
    // 응답
    res.status(500).json({
      message: "Error Fetching users",
      error: error.message,
    });
  }
});

// 데이터 추가 - INSERT
app.post("/users", async (req, res) => {
  try {
    // req.body의 형태는 object
    // 기존 작성법
    // const name = req.body.name;
    // const age = req.body.age;
    // const email = req.body.email;
    // 구조분해할당(ES6)
    const { name: userName, age, email } = req.body;
    console.log("🚀 ~ app.post ~ userName:", userName);
    // {
    //     _id : ObjectId("t34tqrge"),
    //     name : "kga",
    //     age : 25,
    //     email : "aaa@gamil.com",
    //     createdAt : 현재시각
    // }
    // [...users, 추가할 배열 요소 ]
    // { ...객체, 추가할 객체 요소}

    const result = await collection.insertOne({
      ...req.body,
      createdAt: new Date(),
    });
    console.log("🚀 ~ app.post ~ result:", result);
    res.status(201).json(result);
  } catch (error) {
    console.log(`Error creating users : ${error}`);
    res.status(500).json({
      message: "Error creating users",
      error: error.message,
    });
  }
});

// 데이터 수정 - UPDATE
app.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params; // string타입
    const data = req.body;
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...data, updatedAt: new Date() } }
    );
    if (result.matchedCount) {
      // 수정된 문서가 있는 경우
      res.status(200).json(result);
      return;
    }
    // 수정된 문서가 없는 경우
    res.status(404).json({
      message: "User Not Found or No changes made",
    });
  } catch (error) {
    console.log(`Error updating users : ${error}`);
    res.status(500).json({
      message: "Error updating users",
      error: error.message,
    });
  }
});

// 데이터 삭제 - DELETE 메소드 사용
app.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount) {
      // 삭제된 document가 있는 경우
      res.status(200).json({
        message: "User deleted",
        id,
      });
      return;
    }
    // 삭제된 document가 없는 경우
    res.status(404).json({
      message: "User Not Found or No changes made",
    });
  } catch (error) {
    console.log(`Error deleting users : ${error}`);
    res.status(500).json({
      message: "Error deleting users",
      error: error.message,
    });
  }
});

// get 메소드를 통해 특정 id의 document 중 id와 name 필드만 반환
app.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const users = await collection.findOne({ _id: new ObjectId(id) });
    console.log("🚀 ~ app.get ~ users:", users);
    if (users) {
      // 응답
      res.status(200).json({
        id,
        name: users.name,
      });
      return;
    }
    res.status(404).json({
      message: "User Not Found",
    });
  } catch (error) {
    console.log(`fetch error: ${error}`);
    // 응답
    res.status(500).json({
      message: "Error Fetching users",
      error: error.message,
    });
  }
});

const connectDB = async () => {
  try {
    // DB와의 연결 시도
    await client.connect();
    console.log("📌MongoDB Connected");
  } catch (error) {
    console.log(`❗❗ MongoDB Error : ${error}`);
  }
};

app.listen(8080, () => {
  console.log("server running at", PORT);
  console.log(process.env.MONGODB_URI);
  connectDB();
});
