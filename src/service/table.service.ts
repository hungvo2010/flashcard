import { Injectable, Post, Req, Res } from '@nestjs/common';
import { db } from '../database/firebase.config';
import { v4 as uuid } from 'uuid';
import {
  collection,
  getDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
  setDoc,
  query,
  where,
} from 'firebase/firestore';
import { RCode } from 'src/constant/RCode';

@Injectable()
export class TableService {
  async create(body, userId) {
    let existData = (
      await getDocs(
        query(collection(db, 'table'), where('name', '==', body.table), where('userId', '==', userId)),
      )
    ).size;
    if (existData == 0) {
      let newTable = {
        "name": body.table,
        "description": '',
        size: 0,
        userId,
      };
      await setDoc(doc(db, 'table', uuid()), newTable);
      return RCode.SUCCESS;
    } else {
      return RCode.FAIL;
    }
  }

  async getCards(tableId: string) {
    let tableRef = query(collection(db, 'table'), where('tableId', '==', tableId));
    let cardDocs = (await getDocs(tableRef)).docs;
    let cardsRes = [];
    for (let cardDoc of cardDocs) {
      cardsRes.push({
        ...cardDoc,
        id: cardDoc.id,
      })
    }
    return cardsRes;
  }

  async getAll(userId: string) {
    let currentUser = await getDoc(doc(db, 'user', userId));

    if (!currentUser.exists) {
      return [];
    }
    else {
      let listTableRes = [];
      let listDocs = (
        await getDocs(
          query(collection(db, 'table'), where('userId', '==', userId)),
        )
      ).docs;
      listDocs.forEach((doc) => {
        let table = {
          ...doc.data(),
          id: doc.id
        }
        listTableRes.push(table);
      });
      return listTableRes;
    }
  }

  // async update(id: string, body) {
  //   let ref = doc(db, 'table', id);
  //   let table = await getDoc(ref);
  //   if (!table.exists) {
  //     return 0;
  //   } else {
  //     await updateDoc(ref, body);
  //     return 1;
  //   }
  // }

  async delete(tableId: string) {
    let table = await getDoc(doc(db, 'table', tableId));
    if (!table.exists) {
      return 0;
    } else {
      let cards = (await getDocs(query(collection(db, 'card'), where('table', '==', table.id)))).docs;
      for (let i = 0; i < cards.length; i++) {
        deleteDoc(doc(db, 'card', cards[i].id));
      }
      await deleteDoc(doc(db, 'table', tableId));
      return 1;
    }
  }
}
