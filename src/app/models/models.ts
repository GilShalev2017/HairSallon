export enum JobType {
  ManHairCut = 'Man Hair Cut',
  ChildHairCut = 'Child Hair Cut',
  WomanHairCutShort = 'W Hair Cut - Short',
  WomanHairCutLong = 'W Hair Cut - Long',
  HairDyeing = 'Hair Dyeing',
  HighlightsFull = 'Highlights - Full',
  HighlightsHalf = 'Highlights - Half',
  HairStraighteningFull = 'Hair Relax - Full',//Straightening
  HairStraighteningRoot = 'Hair Relax - Root'
}

export interface Treatment {
  date: string;
  remark: string;
  totalPrice: number;
  jobs: Job[];
}

export interface Job {
  price: number;
  jobType: string;
  colors?: Color[];
}

export interface Color {
  //colorBrand: string;
  colorNumber: string;
  colorAmount: number;
}

export interface Client {
  _id?: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  treatments: Treatment[];
}
