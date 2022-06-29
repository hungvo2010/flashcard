import { Injectable } from '@nestjs/common';
import { db } from '../firebase.config';
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
  async create(highlight: string, expand: string, table: string) {
    let docs = await getDocs(collection(db, 'card'));
    let cards = docs.docs;
    let flag = 0;
    cards.forEach((ele) => {
      if (ele.data().highlight === highlight) {
        flag = 1;
      }
    });

    // Truong hop chua co highlight
    if (flag == 0) {
      await setDoc(doc(db, 'card', (cards.length + 1).toString()), {
        highlight,
        expand,
        table,
      });

      if (table != '') {
        let cate = doc(db, 'table', table);
        let data = (await getDoc(cate)).data();
        await updateDoc(cate, {
          size: data.size + 1,
        });
      }
      return 1;
    } else {
      return 0;
    }
  }
  // Function get card take highlight highlight as input and return a list of document have highlight highlight equal to input
  async get(id: number) {
    let ref = doc(db, 'card', id.toString());
    let data = await getDoc(ref);
    let card = {};
    card['id'] = data.id;
    card['highlight'] = data.data().highlight;
    card['expand'] = data.data().expand;
    card['table'] = data.data().table;
    return card;
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
      result.push(card);
    });
    return result;
  }

  async update(id: string, body) {
    if (body == {}) {
      return 0;
    } else {
      let ref = doc(db, 'card', id);
      let card = (await getDoc(ref)).data();
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
        let table = body.table;
        await updateDoc(ref, body);

        let newTable = doc(db, 'table', table);
        let data = (await getDoc(newTable)).data();
        await updateDoc(newTable, {
          size: data.size + 1,
        });
        return 1;
      }
    }
  }

  async delete(id: number) {
    let ref = doc(db, 'card', id.toString());
    await deleteDoc(ref);
    return 1;
  }
}
