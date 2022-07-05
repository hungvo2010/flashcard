import { Injectable } from '@nestjs/common';
import { db } from '../database/firebase.config';
import {
  collection,
  getDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
  setDoc,
} from 'firebase/firestore';

@Injectable()
export class CardService {
  async create(body) {
    let docs = await getDocs(collection(db, 'card'));
    let cards = docs.docs;
    let flag = 0;
    cards.forEach((ele) => {
      if (ele.data().highlight == body.highlight) {
        flag = 1;
      }
    });

    // Truong hop chua co highlight
    if (flag == 0) {
      if (!body.table) body['table'] = '';
      if (!body.isFavorite) body['isFavorite'] = false;
      await setDoc(doc(db, 'card', (cards.length + 1).toString()), body);

      if (body.table != '') {
        let updateTable = doc(db, 'table', body.table);
        let data = (await getDoc(updateTable)).data();
        await updateDoc(updateTable, {
          size: data.size + 1,
        });
      }
      return 1;
    } else {
      return 0;
    }
  }
  // Function get card take highlight highlight as input and return a list of document have highlight highlight equal to input
  async get(id: string) {
    let ref = doc(db, 'card', id);
    let data = await getDoc(ref);
    if (data.exists()) {
      let card = {};
      card['id'] = data.id;
      card['highlight'] = data.data().highlight;
      card['expand'] = data.data().expand;
      card['table'] = data.data().table;
      card['isFavorite'] = data.data().isFavorite;
      return card;
    } else {
      return null;
    }
  }
  // Function getAll return all document of cards
  async getAll() {
    let doc = await getDocs(collection(db, 'card'));
    let list = doc.docs;
    let result = [];
    list.forEach((ele) => {
      let card = {};
      card['id'] = ele.id;
      card['highlight'] = ele.data().highlight;
      card['expand'] = ele.data().expand;
      card['table'] = ele.data().table;
      card['isFavorite'] = ele.data().isFavorite;
      result.push(card);
    });
    return result;
  }

  async update(id: string, body) {
    let ref = doc(db, 'card', id);
    let check = await getDoc(ref);
    if (!check.exists()) {
      return 0;
    } else {
      let card = check.data();
      if (!body.table) {
        await updateDoc(ref, body);
        return 1;
      } else {
        if (card.table != '') {
          let oldTable = doc(db, 'table', card.table);
          let data = (await getDoc(oldTable)).data();
          await updateDoc(oldTable, {
            size: data.size - 1,
          });
        }
        await updateDoc(ref, body);

        let newTable = doc(db, 'table', body.table);
        let data = (await getDoc(newTable)).data();
        await updateDoc(newTable, {
          size: data.size + 1,
        });
        return 1;
      }
    }
  }

  async delete(id: string) {
    let ref = doc(db, 'card', id);

    let check = await getDoc(ref);
    if (!check.exists()) {
      return 0;
    } else {
      let card = check.data();
      if (card.table != '') {
        let table = doc(db, 'table', card.table);
        let data = (await getDoc(table)).data();
        await updateDoc(table, {
          size: data.size - 1,
        });
      }
      await deleteDoc(ref);
      return 1;
    }
  }
}