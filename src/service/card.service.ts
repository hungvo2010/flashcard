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
  query,
  where,
} from 'firebase/firestore';
import { CartDto } from 'src/dto/card.dto';
import { RCode } from 'src/constant/RCode';
import { v4 as uuid } from 'uuid';

@Injectable()
export class CardService {
  private readonly CARD_COLLECTION_NAME: string = 'card';
  private readonly cardCollection = collection(db, this.CARD_COLLECTION_NAME);
  async create(body) {
    try {
      let cards = (
        await getDocs(
          query(this.cardCollection, where('highlight', '==', body.highlight)),
        )
      ).docs;

      if (cards.length !== 0) {
        return RCode.CARD_ALREADY_EXISTS;
      } else {
        await setDoc(doc(db, this.CARD_COLLECTION_NAME, uuid()), body);

        let currentTable = await getDoc(doc(db, 'table', body.table));
        if (!currentTable.exists) return RCode.FAIL;
        else {
          let ref = doc(db, 'table', body.table);
          await updateDoc(ref, {
            size: currentTable.data().size + 1,
          });
          return RCode.SUCCESS;
        }
      }
    } catch (err) {
      console.log(err);
      return RCode.FAIL;
    }
  }
  // Function getAll return all document of cards belong to percific table
  async getAll(table) {
    let currentTable = await getDoc(doc(db, 'table', table));
    if (!currentTable.exists) {
      return null;
    } else {
      let result = [];
      let list = await (
        await getDocs(
          query(collection(db, 'card'), where('table', '==', table)),
        )
      ).docs;
      list.forEach((ele) => {
        let card = {};
        card['id'] = ele.id;
        card['highlight'] = ele.data().highlight;
        card['expand'] = ele.data().expand;
        result.push(card);
      });
      return result;
    }
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
      if (card.table !== '') {
        let table = doc(db, 'table', card.table);
        let data = await getDoc(table);
        if (data.exists) {
          await updateDoc(table, {
            size: data.data().size - 1,
          });
        }
      }
      await deleteDoc(ref);
      return 1;
    }
  }
}