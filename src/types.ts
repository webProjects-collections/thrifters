export interface Z2UProduct {
  id: string;
  imgurl: string;
  game_id: number;
  name: string;
  price: string | number;
  pro_num: number;
  pro_price: number;
  currency: string;
  off_url: string;
  high: string;
  discount: string | number;
  url: string;
  currency_l: string;
}

export interface Z2UHtml {
  total: number;
  totalPage: number;
  data: Z2UProduct[];
}

export interface Data {
  html: Z2UHtml;
  total: number | string;
  totalPage: number;
}

export interface Z2UQuerySearchResponse {
  code: number;
  msg: string;
  url: string;
  wait: number;
  data: Data;
}
