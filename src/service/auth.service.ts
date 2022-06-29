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

@Injectable()
export class AuthService {
    private readonly ACCOUNT_COLLECTION_NAME: string = 'user';
    private readonly accountCollection = collection(db, this.ACCOUNT_COLLECTION_NAME);
    async signup(email: string, fullname: string, password: string) {
        const accountRf = doc(db, this.ACCOUNT_COLLECTION_NAME, email);
        let oldAccount = await getDoc(accountRf);
        if (oldAccount.exists) {
            return RCode.FAIL;
        }

        const newAccount = doc(db, this.ACCOUNT_COLLECTION_NAME, uuid());
        const hashedPassword = await hash(password, 12);
        const signupAccountRes = await setDoc(newAccount, {
            email,
            fullname,
            password: hashedPassword
        });
        return RCode.SUCCESS;
    }

    async sigin(email: string, password: string) {
        const accountRf = doc(db, this.ACCOUNT_COLLECTION_NAME, email);
        const oldAccount = await getDoc(accountRf);
        if (!oldAccount.exists) {
            return RCode.FAIL;
        }

        const checkPasswordRes: boolean = await compare(password, oldAccount.data().password);
        if (checkPasswordRes === false){
            return RCode.FAIL;
        }
        return RCode.SUCCESS;
    }

}