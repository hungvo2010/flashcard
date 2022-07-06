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

@Injectable()
export class TableService {
  async create(body) {
    let existData = await (
      await getDocs(
        query(collection(db, 'table'), where('name', '==', body.name)),
      )
    ).size;
    if (existData == 0) {
      let newTable = {};
      newTable['name'] = body.name;
      newTable['description'] = body.description ? body.description : '';
      newTable['size'] = 0;
      newTable['userID'] = body.userID;

      await setDoc(doc(db, 'table', uuid()), newTable);
      return 1;
    } else {
      return 0;
    }
  }

  async get(id: string) {
    let ref = doc(db, 'table', id);
    let data = await getDoc(ref);
    if (!data.exists()) {
      return 0;
    } else {
      let table = {};
      table['id'] = data.id;
      table['name'] = data.data().name;
      table['description'] = data.data().description;
      table['size'] = data.data().size;
      return table;
    }
  }

  async getAll(userID) {
    let currentUser = await getDoc(doc(db, 'user', userID));
    if (!currentUser.exists) {
      return null;
    } else {
      let result = [];
      let list = await (
        await getDocs(
          query(collection(db, 'table'), where('userID', '==', userID)),
        )
      ).docs;
      list.forEach((ele) => {
        let table = {};
        table['id'] = ele.id;
        table['name'] = ele.data().name;
        table['description'] = ele.data().description;
        table['size'] = ele.data().size;
        result.push(table);
      });
      return result;
    }
  }

  async update(id: string, body) {
    let ref = doc(db, 'table', id);
    let table = await getDoc(ref);
    if (!table.exists) {
      return 0;
    } else {
      await updateDoc(ref, body);
      return 1;
    }
  }

  async delete(id: string) {
    let table = await getDoc(doc(db, 'table', id));
    if (!table.exists) {
      return 0;
    } else {
      let cards = (await getDocs(query(collection(db, 'card'), where('table', '==', table.id)))).docs;
      for (let i = 0; i < cards.length; i++) {
        deleteDoc(doc(db, 'card', cards[i].id));
      }
      await deleteDoc(doc(db, 'table', id));
      return 1;
    }
  }
}
