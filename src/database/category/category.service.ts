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
export class CategoryService {
    
}