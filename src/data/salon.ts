import type { ImageMetadata } from "astro";
import img1 from "../assets/1.jpg";
import img2 from "../assets/2.jpg";
import img3 from "../assets/3.jpg";
import img4 from "../assets/4.jpg";
import img5 from "../assets/5.jpg";

export const salon = {
  legalName: "エステティックサロンKrone【クローネ】",
  tel: "0565-41-6696",
  telHref: "tel:0565-41-6696",
  address: "愛知県豊田市永覚新町3-7-1カレント101",
  street: "永覚新町3-7-1",
  building: "カレント101",
  locality: "豊田市",
  region: "愛知県",
  postalCode: "470-1206",
  station: "愛知環状鉄道 末野原駅 徒歩15分",
  instagram: {
    handle: "krone.beauty",
    url: "https://www.instagram.com/krone.beauty/",
  },
  line: {
    id: "@aig8692e",
    url: "https://line.me/R/ti/p/@aig8692e",
  },
} as const;

export const mapEmbedSrc = `https://maps.google.com/maps?q=${encodeURIComponent(salon.address)}&hl=ja&z=16&output=embed`;
export const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(salon.address)}`;

export function yen(value: number) {
  return `¥${value.toLocaleString("ja-JP")}`;
}

export type CourseId = "01" | "02" | "03" | "04" | "05";

export interface Course {
  id: CourseId;
  title: string;
  catch: string;
  lines?: string[];
  steps?: string[];
  duration?: string;
  note?: string;
  price: number;
  compareAt?: number;
  image: ImageMetadata;
  alt: string;
}

export const courses: Course[] = [
  {
    id: "01",
    title: "最新痩身マシーン",
    catch: "これで落ちないわけない",
    lines: ["キャビテーション", "オンダスリム", "冷却4カップ"],
    price: 29800,
    image: img1,
    alt: "キャビテーション、オンダスリム、冷却4カップのフルコース",
  },
  {
    id: "02",
    title: "背中美人",
    catch: "後ろ姿に、自信を。",
    duration: "全80分",
    steps: ["マイクロ波", "クワッドキャビ", "ハンドマッサージ"],
    price: 16500,
    image: img2,
    alt: "背中のビフォーアフターと、マイクロ波・キャビテーションの機器",
  },
  {
    id: "03",
    title: "セルライト",
    catch: "太ももやお腹の、しつこいセルライトに。",
    lines: ["オンダスリム", "クワッドキャビ"],
    price: 16500,
    image: img3,
    alt: "オンダスリムとクワッドキャビによるセルライトケア",
  },
  {
    id: "04",
    title: "1ヶ月集中コース",
    catch: "短期痩せに挑む",
    lines: ["オンダスリム・キャビテーション", "80分 × 4回", "1週間に1回のご来店"],
    note: "毎月1名様限定",
    price: 55000,
    image: img4,
    alt: "1ヶ月集中コース。80分を4回",
  },
  {
    id: "05",
    title: "脂肪冷却6カップ",
    catch: "キャビ40分",
    price: 44000,
    compareAt: 110000,
    image: img5,
    alt: "脂肪冷却6カップにキャビ40分",
  },
];
