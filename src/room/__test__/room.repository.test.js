const { createRoom, findRoom, findRoomWithCode, getAllRoom, updateGuestUser, updateRoom } = require("../room.repo");
const { faker } = require("@faker-js/faker");
const { Room } = require("../../database/models");

Room.findAll = jest.fn();
Room.findByPk = jest.fn();
let roomTest1;
let roomTest2;

beforeAll(async () => {
    let roomName = faker.address.cityName() + faker.datatype.number();
    let hostUserId = faker.datatype.number();
    roomTest1 = await createRoom({roomName, hostUserId});

    roomName = faker.address.cityName() + faker.datatype.number();
    hostUserId = faker.datatype.number();
    roomTest2 = await createRoom({roomName, hostUserId});
});

describe('roomRepository', () => {
    describe('createRoom', () => {
        it('should return new room', async () => {
            const roomName = faker.address.cityName() + faker.datatype.number();
            const hostUserId = faker.datatype.number();
            const result = await createRoom({roomName, hostUserId});
            expect(result.dataValues).toEqual(
              expect.objectContaining({
                roomName: roomName,
                hostUserId: hostUserId
              })
            );
        });
    });

    //Masih error
    describe('findRoom', () => {
        it('should return requested room by id', async () => {   
            let roomName = faker.address.cityName() + faker.datatype.number();
            let hostUserId = faker.datatype.number();
            const room = await createRoom({roomName, hostUserId});

            const result = await findRoom(room.id);
            expect(result).toEqual(
                expect.objectContaining({
                    roomName: room.roomName,
                    hostUserId: room.hostUserId
                  })
            );
        });
    });

    //masih error
    describe('findRoomWithCode', () => {
        it('should return requested room by code', async () => {
            const result = await findRoomWithCode(roomTest1.roomCode);
            expect(result).toEqual(
                expect.objectContaining({
                    id: roomTest1.id,
                    roomName: roomTest1.roomName,
                    hostUserId: roomTest1.hostUserId,
                })
            );
        });
    });

    describe('getAllRoom', () => {
        it('should return all room', async () => {
            const room = {
                roomName : faker.address.cityName() + faker.datatype.number(),
                hostUserId : faker.datatype.number()
            };
            const room2 = {
                roomName : faker.address.cityName() + faker.datatype.number(),
                hostUserId : faker.datatype.number()
            };

            Room.findAll.mockReturnValue({room, room2});

            const result = await getAllRoom();
            expect(result).toEqual(
                expect.objectContaining({room, room2})
            );
        });
    });
    
    describe('updateGuestUser', () => {
        it('should update guest user room', async () => {
            const guestUserId = faker.datatype.number();

            const result = await updateGuestUser({id: roomTest2.id, guestUserId});
            expect(result[0]).toBe(1);
            expect(result[1][0].id).toBe(roomTest2.id);
            expect(result[1][0].guestUserId).toBe(guestUserId);
        });
    });

    describe('updateRoom', () => {
        it('should update room', async () => {
            let guestUserId = faker.datatype.number();
            let hostScore = 3;
            let guestScore = 2;
            let hostSelection = 1;
            let guestSelection = 1;
            let turn = 1;
            let isFinished = 1;

            const result = await updateRoom(roomTest2.id,
                guestUserId,
                hostScore,
                guestScore,
                hostSelection,
                guestSelection,
                turn,
                isFinished);

            expect(result[0]).toEqual(1);
            expect(result[1][0]).toEqual(
                expect.objectContaining({
                    guestUserId : guestUserId,
                    hostScore : hostScore,
                    guestScore: guestScore,
                    hostSelection: hostSelection,
                    guestSelection: guestSelection,
                    turn: turn,
                    isFinished: true
                  })
            );
        });
    });

});