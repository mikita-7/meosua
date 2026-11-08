import type {Card} from '../types';

interface Props {
  card: Card;
  flipped: boolean;
  onFlip: () => void;
}

export default function Flashcard({card, flipped, onFlip}: Props) {
  return (
    <div
      className={`flashcard${flipped ? ' is-flipped' : ''}`}
      role="button"
      tabIndex={0}
      aria-label={flipped ? 'Mặt sau của thẻ. Bấm để lật lại' : 'Mặt trước của thẻ. Bấm để lật'}
      onClick={onFlip}
    >
      <div className="flashcard__inner">
        <div className="flashcard__face flashcard__face--front">
          <span className="flashcard__tag">Thuật ngữ</span>
          <p className="flashcard__text flashcard__text--term">{card.front}</p>
          <span className="flashcard__tip">Bấm để lật thẻ</span>
        </div>
        <div className="flashcard__face flashcard__face--back">
          <span className="flashcard__tag">Định nghĩa</span>
          <p className="flashcard__text">{card.back}</p>
        </div>
      </div>
    </div>
  );
}
