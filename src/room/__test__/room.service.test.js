const { faker } = require("@faker-js/faker");
const { createRoom, findRoom, getAllRoom, getRoomId, updateRoom, updateGuestUser } = require("../room.service");
const roomRepository = require("../room.repo");

roomRepository.createRoom = jest.fn();
roomRepository.findRoom = jest.fn();
roomRepository.updateRoom = jest.fn();
roomRepository.getAllRoom = jest.fn();
roomRepository.updateGuestUser = jest.fn();
roomRepository.findRoomWithCode = jest.fn();

describe("roomService", () => {
    describe("createRoom", () => {
        it("should return created room", async () => {
            const newRoom = {
                roomName: faker.address.cityName() + faker.datatype.number(),
                hostUserId: faker.datatype.number()
            };
            
            roomRepository.createRoom.mockReturnValue({newRoom});

            const result = await createRoom(newRoom.roomName, newRoom.hostUserId);
            expect(roomRepository.createRoom).toBeCalled();

            expect(result).toEqual(expect.objectContaining({newRoom}));            
        });

        it("should return error", async () => {
            roomRepository.createRoom.mockImplementation(() => {
                throw new Error();
              });
            try {
                await createRoom(faker.name.firstName, faker.datatype.number);
            } catch (error) {
                expect(roomRepository.createRoom).toBeCalled();
                expect(error.code).toBe(401); 
                expect(error.message).toBe("Failed while create a new room"); 
            }
        });
    });

    describe("findRoom", () => {
        it("should return a room", async () => {
            const newRoom = {
                roomName: faker.address.cityName() + faker.datatype.number(),
                hostUserId: faker.datatype.number()
            };
            
            roomRepository.findRoom.mockReturnValue({newRoom});

            const result = await findRoom(newRoom.hostUserId);
            expect(roomRepository.findRoom).toBeCalled();

            expect(result).toEqual(expect.objectContaining({newRoom}));            
        });

        it("should return an error", async () => {
            roomRepository.findRoom.mockImplementation(() => {
                throw new Error();
              });

            try {
                await findRoom(faker.datatype.number);
            } catch (error) {
                expect(roomRepository.findRoom).toBeCalled();
                expect(error.code).toBe(404); 
                expect(error.message).toBe("Room not exist"); 
            }
        });
    });

    describe("updateRoom", () => {
        it("should update a room", async () => {
            const newRoom = {
                roomName: faker.address.cityName() + faker.datatype.number(),
                hostUserId: faker.datatype.number(),
                id : faker.datatype.number(),
                guestUserId: faker.datatype.number(),
                hostScore: faker.datatype.number(),
                guestScore: faker.datatype.number(),
                hostSelection: faker.datatype.number(),
                guestSelection: faker.datatype.number(),
                turn : faker.datatype.number(),
                isFinished : faker.datatype.boolean()
            };
            
            roomRepository.updateRoom.mockReturnValue({newRoom});

            const result = await updateRoom(newRoom.id, newRoom.guestUserId, newRoom.hostScore, 
                                    newRoom.guestScore, newRoom.hostSelection, newRoom.guestSelection, 
                                    newRoom.turn, newRoom.isFinished);
            expect(roomRepository.updateRoom).toBeCalled();

            expect(result).toEqual(expect.objectContaining({newRoom}));            
        });

        it("should return an error", async () => {
            const newRoom = {
                hostUserId: faker.datatype.number(),
                id : faker.datatype.number()
            };
            roomRepository.updateRoom.mockReturnValue(null);

            try {
                await updateRoom(newRoom.id, newRoom.guestUserId);
            } catch (error) {
                expect(roomRepository.updateRoom).toBeCalled();
                expect(error.code).toBe(404); 
                expect(error.message).toBe("Room not exist"); 
            }
        });

        it("should return an error", async () => {
            roomRepository.updateRoom.mockImplementation(() => {
                throw new Error();
              });

            try {
                await updateRoom(1,1,1,1,1,1,1,1);
            } catch (error) {
                expect(roomRepository.updateRoom).toBeCalled();
                expect(error.code).toBe(401); 
                expect(error.message).toBe("Failed while update the room"); 
            }
        });
    });

    describe("updateGuestUser", () => {
        it("should update a room", async () => {
            const newRoom = {
                hostUserId: faker.datatype.number(),
                id : faker.datatype.number()
            };
            
            roomRepository.updateGuestUser.mockReturnValue({newRoom});

            const result = await updateGuestUser(newRoom.id, newRoom.guestUserId);
            expect(roomRepository.updateGuestUser).toBeCalled();

            expect(result).toEqual(expect.objectContaining({newRoom}));            
        });

        it("should return an error", async () => {
            const newRoom = {
                hostUserId: faker.datatype.number(),
                id : faker.datatype.number()
            };
            roomRepository.updateGuestUser.mockReturnValue(null);

            try {
                await updateGuestUser(newRoom.id, newRoom.guestUserId);
            } catch (error) {
                expect(roomRepository.updateGuestUser).toBeCalled();
                expect(error.code).toBe(404); 
                expect(error.message).toBe("Room not exist"); 
            }
        });

        it("should return an error", async () => {
            roomRepository.updateGuestUser.mockImplementation(() => {
                throw new Error();
              });

            try {
                await updateGuestUser(1,1);
            } catch (error) {
                expect(roomRepository.updateGuestUser).toBeCalled();
                expect(error.code).toBe(401); 
                expect(error.message).toBe("Failed while update the room"); 
            }
        });
    });

    describe("getRoomId", () => {
        it("should return a room id", async () => {            
            roomRepository.findRoomWithCode.mockReturnValue({id: 1});

            const result = await getRoomId(faker.address.cityName());

            expect(roomRepository.findRoomWithCode).toBeCalled();
            expect(result).toEqual(expect.objectContaining({id: 1}));            
        });

        it("should return an error", async () => {
            roomRepository.findRoomWithCode.mockImplementation(() => {
                throw new Error();
              });

            try {
                await getRoomId(faker.datatype.number);
            } catch (error) {
                expect(roomRepository.findRoomWithCode).toBeCalled();
                expect(error.code).toBe(404); 
                expect(error.message).toBe("Room not exist"); 
            }
        });
    });

    describe("getAllRoom", () => {
        it("should return all room", async () => {
            const newRoom = {
                roomName: faker.address.cityName() + faker.datatype.number(),
                hostUserId: faker.datatype.number()
            };
            const newRoom2 = {
                roomName: faker.address.cityName() + faker.datatype.number(),
                hostUserId: faker.datatype.number()
            };
            
            roomRepository.getAllRoom.mockReturnValue({newRoom, newRoom2});

            const result = await getAllRoom(newRoom.hostUserId);
            expect(roomRepository.getAllRoom).toBeCalled();

            expect(result).toEqual(expect.objectContaining({newRoom, newRoom2}));            
        });

        it("should return an error", async () => {
            roomRepository.getAllRoom.mockImplementation(() => {
                throw new Error();
              });

            try {
                await getAllRoom();
            } catch (error) {
                expect(roomRepository.getAllRoom).toBeCalled();
                expect(error.code).toBe(500); 
                expect(error.message).toBe("Unknown Error"); 
            }
        });
    });
});