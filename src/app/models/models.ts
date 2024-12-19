export enum JobType {
  ManHairCut = 'Man Hair Cut',
  ChildHairCut = 'Child Hair Cut',
  WomanFaceFrame = 'W Face Frame',
  WomanHairCutShort = 'W Hair Cut - Short',
  WomanHairCutLong = 'W Hair Cut - Long',
  HairDyeing = 'Hair Dyeing',
  HighlightsFull = 'Highlights - Full',
  HighlightsHalf = 'Highlights - Half',
  HairStraighteningFull = 'Hair Relax - Full',//Straightening
  HairStraighteningRoot = 'Hair Relax - Root',
  BlowDry = 'Blow-Dry',
  Hairstyle = 'Hairstyle'
}

export interface JobTypeItem{
  name: string;
  defaultPrice: number
}

export interface Treatment {
  date: string;
  remark: string;
  totalPrice: number;
  jobs: Job[];
}

export interface Job {
  price: number;
  description?: string;
  jobType: string;
  colors?: Color[];
}

export interface Color {
  colorNumber: string;
  colorAmount: number;
}

export interface Client {
  _id?: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  comment?: string;
  address?: string;
  treatments: Treatment[];
}
