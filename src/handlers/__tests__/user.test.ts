import * as user from "../user";
import { ICustomRequest } from "../../types/interfaces";
import { Response } from "express";

describe('user handler', () => {
    test('should create a new user', async () => {
        const req = { body: { username: 'hello', password: 'a$$word' } }
        const res = {
            json(token: String) {
                expect(token).toBeTruthy()
            },
            status(code: number) {
                expect(code).toBeTruthy()
            }
        }
        const newUser = await user.createNewUser((req as ICustomRequest), (res as Response), () => { })
    })
})
