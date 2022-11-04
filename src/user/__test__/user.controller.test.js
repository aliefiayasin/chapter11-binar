const { faker } = require("@faker-js/faker");
const httpMock = require("node-mocks-http");
const { createUser, getUserProfile, resetPassword, updateUser } = require("../user.controller");
const userService = require("../user.service");

let req = httpMock.createRequest();
let res = httpMock.createResponse();
beforeEach(() => {
    req = httpMock.createRequest();
    res = httpMock.createResponse();    
    req.auth = { id: faker.datatype.number()};
  });

  userService.createUser = jest.fn();
  userService.getUserProfile = jest.fn();

describe("userController", () => {
    describe("createUser", () => {
        it("should return created user", async () => {
            const newUser = {
                fullname: faker.name.fullName(),
                email: faker.internet.email(),   
                password: faker.internet.password()
            }
            req.body = newUser;
            userService.createUser.mockReturnValue({newUser});

            const result = await createUser(req, res);
            expect(userService.createUser).toBeCalled();

            expect(result.statusCode).toBe(200);
            expect(result._getJSONData()).toEqual(                
                expect.objectContaining({
                    newUser: {
                        fullname: newUser.fullname,
                        email: newUser.email,
                        password: newUser.password
                    }                    
                })
            );            
        })

        it("should return error", async () => {
            const errorMessage = { message: "Internal server error!" }
            userService.createUser.mockImplementation(() => {
                throw new Error();
              });

            const result = await createUser(req, res);
            expect(userService.createUser).toBeCalled();

            expect(result.statusCode).toBe(500);
            expect(result._getJSONData()).toEqual(errorMessage);
        })
    })

    describe("getUserProfile", () => {
        it("should return user profile", async () => {
            const currentUser = {
                fullname: faker.name.fullName(),
                email: faker.internet.email(),   
                password: faker.internet.password()
            }
            req.body = currentUser;
            userService.getUserProfile.mockReturnValue({currentUser});

            const result = await getUserProfile(req, res);
            expect(userService.getUserProfile).toBeCalled();

            expect(result.statusCode).toBe(200);
            expect(result._getJSONData()).toEqual(                
                expect.objectContaining({
                    currentUser: {
                        fullname: currentUser.fullname,
                        email: currentUser.email,
                        password: currentUser.password
                    }                    
                })
            );            
        })

        it("should return error", async () => {        
            const errorMessage = { message: "Internal server error!" }
            userService.getUserProfile.mockImplementation(() => {
                throw new Error();
              });

            const result = await getUserProfile(req, res);
            expect(userService.getUserProfile).toBeCalled();

            expect(result.statusCode).toBe(500);
            expect(result._getJSONData()).toEqual(errorMessage);
        })
    })
})
