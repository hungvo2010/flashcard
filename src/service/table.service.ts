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
    let flag = 0;
    let tables = (await getDocs(collection(db, 'table'))).docs;
    tables.forEach((doc) => {
      if (doc.data().name == body.name) {
        flag = 1;
      }
    });
    // Truong hop chua co text
    if (flag == 0) {
      body['size'] = 0;
      if (!body.description) body['description'] = '';
      await setDoc(doc(db, 'table', uuid()), body);
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
    let ref = doc(db, 'table', id);
    let data = await getDoc(ref);
    if (!data.exists) {
      return 0;
    } else {
      let q = query(collection(db, 'card'), where('table', '==', data.id));
      let cards = (await getDocs(q)).docs;
      for (let i = 0; i < cards.length; i++) {
        deleteDoc(doc(db, 'card', cards[i].id));
      }
      await deleteDoc(ref);
      return 1;
    }
  }
}
