import type {Card} from '../types';

// Thứ tự ưu tiên của dấu phân tách trên mỗi dòng
const SEPARATORS = ['\t', '::', ' - ', ' – ', ' — ', ':'];

export interface ParseResult {
  cards: Card[];
  skipped: number; // số dòng không có dấu phân tách
}

/** Mỗi dòng dạng "Thuật ngữ : Định nghĩa" thành một thẻ. */
export function parseCards(raw: string): ParseResult {
  const cards: Card[] = [];
  let skipped = 0;

  for (const line of raw.split(/\r?\n/)) {
    const text = line.trim();
    if (!text) continue;

    let front = '';
    let back = '';
    for (const sep of SEPARATORS) {
      const i = text.indexOf(sep);
      if (i > 0) {
        front = text.slice(0, i).trim();
        back = text.slice(i + sep.length).trim();
        break;
      }
    }

    if (front && back) cards.push({id: cards.length, front, back});
    else skipped++;
  }
  return {cards, skipped};
}

/** Xáo trộn Fisher–Yates, không đổi mảng gốc. */
export function shuffle<T>(items: T[]): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export const SAMPLE_TEXT = `Renaissance : Phong trào văn hóa châu Âu thế kỷ 14–17, "tái sinh" tri thức cổ điển
Humanism : Chủ nghĩa nhân văn, đề cao giá trị và khả năng của con người
Leonardo da Vinci : Họa sĩ, nhà phát minh, tác giả bức Mona Lisa
Gutenberg : Phát minh máy in chữ rời khoảng năm 1450
Perspective : Phép phối cảnh, tạo chiều sâu trong hội họa`;
