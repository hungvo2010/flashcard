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
  async create(text: string, meaning: string, category: string) {
    let docs = await getDocs(collection(db, 'card'));
    let cards = docs.docs;
    let flag = 0;
    cards.forEach((ele) => {
      if (ele.data().text === text) {
        flag = 1;
      }
    });

    // Truong hop chua co text
    if (flag == 0) {
      await setDoc(doc(db, 'card', (cards.length + 1).toString()), {
        text,
        meaning,
        category,
      });

      if (category != '') {
        let cate = doc(db, 'category', category);
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
  // Function get card take highlight text as input and return a list of document have highlight text equal to input
  async get(id: number) {
    let ref = doc(db, 'card', id.toString());
    let data = await getDoc(ref);
    let card = {};
    card['id'] = data.id;
    card['text'] = data.data().text;
    card['meaning'] = data.data().meaning;
    card['category'] = data.data().category;
    console.log(card);
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
      card['text'] = ele.data().text;
      card['meaning'] = ele.data().meaning;
      card['category'] = ele.data().category;
      result.push(card);
    });
    return result;
  }

  async updateMeaning(id: number, newMeaning: string) {
    let ref = doc(db, 'card', id.toString());
    await updateDoc(ref, {
      meaning: newMeaning,
    });
    return 1;
  }

  async updateCategory(id: number, newCategory: string) {
    let ref = doc(db, 'card', id.toString());
    let card = (await getDoc(ref)).data();
    if (card.category != '') {
      let oldCate = doc(db, 'category', card.category);
      let data = await getDoc(oldCate);
      let temp = data.data();
      await updateDoc(oldCate, {
        size: temp.size - 1,
      });
    }

    await updateDoc(ref, {
      category: newCategory,
    });

    let newCate = doc(db, 'category', newCategory);
    let data = (await getDoc(newCate)).data();
    await updateDoc(newCate, {
      size: data.size + 1,
    });
  }

  async delete(id: number) {
    let ref = doc(db, 'card', id.toString());
    await deleteDoc(ref);
    return 1;
  }
}
