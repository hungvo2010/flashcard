import { Injectable } from "@nestjs/common";
import { db } from '../database/firebase.config';
import { compare, hash } from 'bcryptjs';
import { v4 as uuid } from 'uuid'
import {
    collection,
    getDoc,
    getDocs,
    updateDoc,
    doc,
    deleteDoc,
    setDoc,
    CollectionReference,
} from 'firebase/firestore';
import { RCode } from "src/constant/RCode";
import { sign } from "jsonwebtoken";
import { Config } from "src/constant/Config";

@Injectable()
export class AuthService {
    private readonly ACCOUNT_COLLECTION_NAME: string = 'accounts';
    private readonly accountCollection = collection(db, this.ACCOUNT_COLLECTION_NAME);
    async signup(email: string, fullname: string, password: string) {
        const accountRf = doc(db, this.ACCOUNT_COLLECTION_NAME);
        let oldAccount = await getDoc(accountRf);
        if (oldAccount.exists()) {
            return RCode.FAIL;
        }

        const newAccount = doc(db, this.ACCOUNT_COLLECTION_NAME, uuid());
        const hashedPassword = await hash(password, 12);
        const signupAccountRes = await setDoc(newAccount, {
            email,
            fullname: "142",
            password: hashedPassword
        });
        return RCode.SUCCESS;
    }

    async signin(email: string, password: string) {
        const accountRf = doc(db, this.ACCOUNT_COLLECTION_NAME, email);
        const oldAccount = await getDoc(accountRf);

        console.log(oldAccount.data().password);
        
        
        if (!oldAccount.exists()) {
            return RCode.FAIL;
        }

        const checkPasswordRes: boolean = await compare(password, oldAccount.data().password);
        if (checkPasswordRes === false) {
            return RCode.FAIL;
        }
        return RCode.SUCCESS;
    }

    genJwtToken(payload: object): string | PromiseLike<string> {
        const dev = process.env.NODE_ENV !== 'production';
        const JWT_SECRET = dev ? process.env.JWT_SECRET_DEV : process.env.JWT_SECRET_LIVE;
        const token = sign(payload, JWT_SECRET, {
            expiresIn: Config.JWT_EXPIRE_IN,
        });
        return token;
    }

}