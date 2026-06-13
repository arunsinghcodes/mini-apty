import { User } from "@mini-apty/shared";

const user: User = {
  id: "1",
  email: "test@example.com",
  passwordHash: "hashed-password",
  createdAt: new Date(),
  updatedAt: new Date(),
};

console.log("Mini Apty Backend Services Started...🚀");
console.log(user);