import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Interests } from '../../models/interests/interests.model';
@Injectable({
  providedIn: 'root'
})
export class InterestsService {
	private dbPath = '/interests';
interestsRef: AngularFirestoreCollection<Interests>;

  constructor(private db: AngularFirestore) {
    this.interestsRef = db.collection(this.dbPath);
  }

  getInterests(): AngularFirestoreCollection<Interests> {
    return this.interestsRef;
  }

  createInterests(myJob: Interests): any {
    return this.interestsRef.add({ ...myJob });
}
deleteInterests(id? : string): Promise<void> {
return this.interestsRef.doc(id).delete();
}
  updateInterests(myInterests: Interests, ids?: string,): Promise<void> {
    const { id, ...interestsNoId } = myInterests;
    return this.interestsRef.doc(ids).update(interestsNoId);
  }
}

