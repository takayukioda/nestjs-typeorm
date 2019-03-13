import * as request from "supertest";
import { Test } from "@nestjs/testing";
import { AppModule } from "../src/app.module";
import { INestApplication } from "@nestjs/common";
import { getRepositoryToken } from "@nestjs/typeorm";
// import { User } from "../src/user/user.entity";
// import { RawPassword } from "../src/type";

describe("AppController (e2e)", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const now = Date.now();
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    //   providers: [
    //     {
    //       provide: getRepositoryToken(User),
    //       useValue: {
    //         _mock: {
    //           id: 1,
    //           email: "initial-user@test.com",
    //           password: "password" as RawPassword,
    //           name: "initial-user",
    //           createdAt: now,
    //           updatedAt: now
    //         },
    //         find() {
    //           return this._mock;
    //         }
    //       }
    //     }
    //   ]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it("/ (GET)", () => {
    return request(app.getHttpServer())
      .get("/")
      .expect(200)
      .expect("Hello World!");
  });
});
