import type {Card, Mark} from '../types';

interface Props {
  cards: Card[];
  marks: Record<number, Mark>;
  onRetryAgain: () => void;
  onRestart: () => void;
  onBack: () => void;
}

export default function ResultView({cards, marks, onRetryAgain, onRestart, onBack}: Props) {
  const known = cards.filter((c) => marks[c.id] === 'known').length;
  const again = cards.length - known;

  return (
    <section className="panel result" aria-labelledby="result-title">
      <h2 id="result-title">Kết Quả Buổi Học</h2>
      <div className="result__score">
        <div>
          <span className="result__num result__num--known">{known}</span>
          <span className="result__label">thẻ đã thuộc</span>
        </div>
        <div>
          <span className="result__num result__num--again">{again}</span>
          <span className="result__label">thẻ cần ôn lại</span>
        </div>
      </div>
      <div className="result__actions">
        <button className="btn btn--primary" type="button" onClick={onRetryAgain} disabled={again === 0}>
          Ôn các thẻ chưa thuộc
        </button>
        <button className="btn" type="button" onClick={onRestart}>Học lại từ đầu</button>
        <button className="btn" type="button" onClick={onBack}>Sửa bản thảo</button>
      </div>
    </section>
  );
}
