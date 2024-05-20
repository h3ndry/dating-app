import { Photo } from "./photo";

export interface Member {
  id: number;
  userName: string;
  age: number;
  knownAs: string;
  created: Date;
  lastActive: Date;
  gender: string;
  photoUrl: string;
  introduction: string;
  lookingFor: string;
  intrest: string;
  city: string;
  country: string;
  photos: Photo[];
}


