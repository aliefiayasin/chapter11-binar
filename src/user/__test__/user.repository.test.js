const { createUser, getUser, getUserEmail, getUserProfile, updatePassword, updateUser } = require("../user.repository");
const { faker } = require("@faker-js/faker");
const { User } = require("../../database/models");

const fakeData = {
    fullname: faker.name.fullName(),
    email: faker.internet.email(),   
    password: faker.internet.password()
};

const testData = {
    fullname: "Adam Malik",
    email: "adammalik@gmail.com",   
    password: "123123"
};

const testUpdatedData = {
    fullname: "Adam Malik2",
    email: "adammalik2@gmail.com",   
    password: "1231232"
};


describe('userRepository', () => {
    describe('createUser', () => {
        it('should return new user', async () => {
            const result = await createUser(testData);
            expect(result).toEqual(
              expect.objectContaining({
                fullname: testData.fullname,
                email: testData.email,
                password: testData.password
              })
            );
        });
        it('should return error', async () => {
            const result = await createUser(testData);
            expect(result.message).toEqual('This email address is already being used');
        });
    });

    describe('getUser by id', () => {
        it('should return requested user', async () => {
            const result = await getUser({userId: 1})
            expect(result).toEqual(
                expect.objectContaining({
                  fullname: testData.fullname,
                  email: testData.email,
                  password: testData.password
                })
            );
        });
    });

    describe('getUserEmail by email', () => {
        it('should return requested user', async () => {
            const result = await getUserEmail({email: "adammalik@gmail.com"})
            expect(result).toEqual(
                expect.objectContaining({
                  fullname: testData.fullname,
                  email: testData.email,
                  password: testData.password
                })
            );
        });
    });

    describe('getUserProfile', () => {
        it('should return requested user', async () => {
            const result = await getUserProfile({userId: 1})
            expect(result).toEqual(
                expect.objectContaining({
                  fullname: testData.fullname,
                  email: testData.email,
                  password: testData.password
                })
            );
        });
    });
    
    describe('updatePassword', () => {
        it('should update user password', async () => {
            let newPassword = "newPassword";
            const result = await updatePassword({userId: 1, password: newPassword})
            expect(result[0]).toBe(1);
            expect(result[1][0].password).toBe(newPassword);
        });
    });

    describe('updateUser', () => {
        it('should update user data', async () => {
            const result = await updateUser({userId: 1, fullname: testUpdatedData.fullname, email: testUpdatedData.email, password: testUpdatedData.password})
            expect(result[0]).toEqual(1);
            expect(result[1][0]).toEqual(
                expect.objectContaining({
                  fullname: testUpdatedData.fullname,
                  email: testUpdatedData.email,
                  password: testUpdatedData.password
                })
            );
        });
    });

});