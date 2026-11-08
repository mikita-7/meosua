import type {Card, Mark} from '../types';
import Flashcard from './Flashcard';

interface Props {
  cards: Card[];
  index: number;
  flipped: boolean;
  marks: Record<number, Mark>;
  onFlip: () => void;
  onPrev: () => void;
  onNext: () => void;
  onMark: (m: Mark) => void;
  onShuffle: () => void;
  onBack: () => void;
}

export default function StudyView(p: Props) {
  const card = p.cards[p.index];
  const percent = ((p.index + 1) / p.cards.length) * 100;
  const mark = p.marks[card.id];

  return (
    <section className="panel study" aria-label="Ôn tập thẻ">
      <div className="study__top">
        <button className="btn" type="button" onClick={p.onBack}>← Sửa bản thảo</button>
        <button className="btn" type="button" onClick={p.onShuffle}>⚜ Xáo thẻ</button>
      </div>

      <p className="study__count">
        Thẻ {p.index + 1} / {p.cards.length}
      </p>
      <div className="progress" role="progressbar" aria-valuemin={0} aria-valuemax={p.cards.length} aria-valuenow={p.index + 1}>
        <div className="progress__bar" style={{width: `${percent}%`}} />
      </div>

      <Flashcard card={card} flipped={p.flipped} onFlip={p.onFlip} />

      {mark && (
        <p className="study__mark" role="status">
          {mark === 'known' ? '✓ Đã thuộc' : '↻ Cần ôn lại'}
        </p>
      )}

      <div className="study__nav">
        <button className="btn" type="button" onClick={p.onPrev} disabled={p.index === 0}>← Trước</button>
        <button className="btn btn--primary" type="button" onClick={() => p.onMark('again')}>Ôn lại</button>
        <button className="btn btn--olive" type="button" onClick={() => p.onMark('known')}>Đã thuộc</button>
        <button className="btn" type="button" onClick={p.onNext}>
          {p.index === p.cards.length - 1 ? 'Hoàn thành' : 'Sau →'}
        </button>
      </div>

      <p className="study__keys">Phím tắt: Space lật · ← → chuyển thẻ · 1 ôn lại · 2 đã thuộc</p>
    </section>
  );
}
