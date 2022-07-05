import { Injectable } from "@nestjs/common";
import { db } from '../database/firebase.config';
import { compare, hash } from 'bcryptjs';
import { v4 as uuid } from 'uuid';
import {
    collection,
    getDoc,
    getDocs,
    updateDoc,
    doc,
    deleteDoc,
    setDoc,
    CollectionReference,
    where,
    query,
} from 'firebase/firestore';
import { RCode } from "src/constant/RCode";
import { sign } from "jsonwebtoken";
import { Config } from "src/constant/Config";

@Injectable()
export class AuthService {
    private readonly USER_COLLECTION_NAME: string = 'user';
    private readonly userCollection = collection(db, this.USER_COLLECTION_NAME);
    async signup(email: string, fullname: string, password: string) {
        // const accountRf = doc(db, this.ACCOUNT_COLLECTION_NAME);
        // console.log(arguments);
        
        const userQuery = query(this.userCollection, where('email', '==', email));
        let oldUser = (await getDocs(userQuery)).docs;
        
        if (oldUser.length !== 0) {
            return RCode.FAIL;
        }

        const newUser = doc(db, this.USER_COLLECTION_NAME, uuid());
        const hashedPassword = await hash(password, 12);
        const signupUserRes = await setDoc(newUser, {
            email,
            fullname: fullname || "Vo Chanh Hung",
            password: hashedPassword
        });
        return RCode.SUCCESS;
    }

    async signin(email: string, password: string) {
        const userQuery = query(this.userCollection, where('email', '==', email));
        let users = (await getDocs(userQuery)).docs;

        // console.log(oldAccount[0].data().password);


        if (users.length == 0) {
            return RCode.FAIL;
        }

        const checkPasswordRes: boolean = await compare(password, users[0].data().password);
        if (checkPasswordRes === false) {
            return RCode.FAIL;
        }
        return RCode.SUCCESS;
    }

    genJwtToken(payload: object): string | PromiseLike<string> {
        // console.log(payload);
        const dev = process.env.NODE_ENV !== 'production';
        const JWT_SECRET = dev ? Config.JWT_SECRET_DEV : Config.JWT_SECRET_LIVE;
        const token = sign(payload, JWT_SECRET, {
            expiresIn: Config.JWT_EXPIRE_IN,
        });
        return token;
    }

}