export interface Card {
  id: number;
  front: string; // mặt trước: thuật ngữ / câu hỏi
  back: string;  // mặt sau: định nghĩa / đáp án
}

export type Mark = 'known' | 'again';
export type View = 'input' | 'study' | 'done';
