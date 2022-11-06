const { faker } = require("@faker-js/faker");
const httpMock = require("node-mocks-http");
const { send } = require("../email.controller");
const emailService = require("../email.service");

let req = httpMock.createRequest();
let res = httpMock.createResponse();
beforeEach(() => {
    req = httpMock.createRequest();
    res = httpMock.createResponse();    
    req.auth = { id: faker.datatype.number()};
  });

  emailService.send = jest.fn();

describe("emailController", () => {
    describe("send", () => {
        it("should return success", async () => {
            let url = faker.internet.url();
            let email = faker.internet.email();
            req.body = { url: url, email: email};
            emailService.send.mockReturnValue(true);

            const result = await send(req, res);
            expect(emailService.send).toBeCalled();

            expect(result.statusCode).toBe(200);
            expect(result._getData()).toEqual("success");
        });

        it("should return error", async () => {
            let url = faker.internet.url();
            let email = faker.internet.email();
            req.body = { url: url, email: email};

            const errorMessage = { message: "Internal server error!" };
            emailService.send.mockImplementation(() => {
                throw new Error("Internal server error!");
              });

            const result = await send(req, res);

            expect(emailService.send).toBeCalled();
            expect(result.statusCode).not.toBe(200);
            expect(result._getData()).not.toEqual("success");
        });
    });
});