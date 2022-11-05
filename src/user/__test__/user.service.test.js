const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");
const { createUser, getUserProfile, updateUser, resetPassword } = require("../user.service");
const userRepository = require("../user.repository");

userRepository.createUser = jest.fn();
userRepository.getUserProfile = jest.fn();
userRepository.updateUser = jest.fn();
userRepository.updatePassword = jest.fn();
bcrypt.hash = jest.fn();

describe("userService", () => {
    describe("createUser", () => {
        it("should return created user", async () => {
            const newUser = {
                fullname: faker.name.fullName(),
                email: faker.internet.email(),   
                password: faker.internet.password()
            };
            
            userRepository.createUser.mockReturnValue({newUser});
            bcrypt.hash.mockReturnValue(faker.internet.password());

            const result = await createUser(newUser.fullname, newUser.email, newUser.password);
            expect(userRepository.createUser).toBeCalled();

            expect(result).toEqual(expect.objectContaining({newUser}));            
        });
    });

    describe("getUserProfile", () => {
        it("should return user profile", async () => {
            const currentUser = {
                fullname: faker.name.fullName(),
                email: faker.internet.email(),   
                password: faker.internet.password()
            }
            userRepository.getUserProfile.mockReturnValue({currentUser});

            const result = await getUserProfile(faker.datatype.number());
            expect(userRepository.getUserProfile).toBeCalled();

            expect(result).toEqual(expect.objectContaining({currentUser}));            
        });
    });

    describe("updateUser", () => {
        it("should update user", async () => {
            const user = {
                fullname: faker.name.fullName(),
                email: faker.internet.email(),   
                password: faker.internet.password()
            }
            userRepository.updateUser.mockReturnValue({user});

            const result = await updateUser(faker.datatype.number(), user.fullname, user.email, user.password);
            expect(userRepository.updateUser).toBeCalled();

            expect(result).toEqual(expect.objectContaining({user}));            
        });
    });

    describe("resetPassword", () => {
        it("should reset password", async () => {
            const password = faker.internet.password();
            const confirmpassword = password;

            const user = {
                password: password,
                confirmpassword: confirmpassword,
            };
            userRepository.updatePassword.mockReturnValue({user});

            const result = await resetPassword(faker.datatype.number(), user.password, user.password);
            expect(userRepository.updatePassword).toBeCalled();

            expect(result).toEqual(expect.objectContaining({user}));            
        });
    });
});