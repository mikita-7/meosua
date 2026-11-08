import {useCallback, useEffect, useState} from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import Starfield from './components/Starfield';
import InputPanel from './components/InputPanel';
import ResultView from './components/ResultView';
import StudyView from './components/StudyView';
import {parseCards, SAMPLE_TEXT, shuffle} from './lib/parseCards';
import type {Card, Mark, View} from './types';

const STORAGE_KEY = 'renaissance-flashcards:text';

function loadText(): string {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? '';
  } catch {
    return '';
  }
}

export default function App() {
  const [text, setText] = useState(loadText);
  const [cards, setCards] = useState<Card[]>([]);
  const [view, setView] = useState<View>('input');
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [marks, setMarks] = useState<Record<number, Mark>>({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, text);
    } catch {
      /* bỏ qua nếu trình duyệt chặn lưu trữ */
    }
  }, [text]);

  const startStudy = (list: Card[]) => {
    setCards(list);
    setIndex(0);
    setFlipped(false);
    setMarks({});
    setView('study');
  };

  const handleGenerate = () => {
    const {cards: parsed, skipped} = parseCards(text);
    if (parsed.length === 0) {
      setMessage('Chưa tìm thấy thẻ nào. Hãy viết mỗi dòng theo dạng "Thuật ngữ : Định nghĩa".');
      return;
    }
    setMessage(skipped ? `Đã bỏ qua ${skipped} dòng thiếu dấu phân tách.` : '');
    startStudy(parsed);
  };

  const goNext = useCallback(() => {
    setFlipped(false);
    if (index >= cards.length - 1) setView('done');
    else setIndex((i) => i + 1);
  }, [index, cards.length]);

  const goPrev = useCallback(() => {
    setFlipped(false);
    setIndex((i) => Math.max(0, i - 1));
  }, []);

  const mark = useCallback(
    (m: Mark) => {
      const card = cards[index];
      if (!card) return;
      setMarks((prev) => ({...prev, [card.id]: m}));
      goNext();
    },
    [cards, index, goNext],
  );

  // Phím tắt khi đang ôn tập
  useEffect(() => {
    if (view !== 'study') return;
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === 'TEXTAREA' || tag === 'INPUT') return;
      if (e.key === ' ' && tag !== 'BUTTON') {
        e.preventDefault();
        setFlipped((f) => !f);
      } else if (e.key === 'Enter' && (e.target as HTMLElement).classList.contains('flashcard')) {
        setFlipped((f) => !f);
      } else if (e.key === 'ArrowRight') goNext();
      else if (e.key === 'ArrowLeft') goPrev();
      else if (e.key === '1') mark('again');
      else if (e.key === '2') mark('known');
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [view, goNext, goPrev, mark]);

  return (
    <div className="app">
      <Starfield />
      <Header />

      {view === 'input' && (
        <InputPanel
          value={text}
          onChange={setText}
          onGenerate={handleGenerate}
          onSample={() => setText(SAMPLE_TEXT)}
          message={message}
        />
      )}

      {view === 'study' && cards.length > 0 && (
        <StudyView
          cards={cards}
          index={index}
          flipped={flipped}
          marks={marks}
          onFlip={() => setFlipped((f) => !f)}
          onPrev={goPrev}
          onNext={goNext}
          onMark={mark}
          onShuffle={() => startStudy(shuffle(cards))}
          onBack={() => setView('input')}
        />
      )}

      {view === 'done' && (
        <ResultView
          cards={cards}
          marks={marks}
          onRetryAgain={() => startStudy(cards.filter((c) => marks[c.id] !== 'known'))}
          onRestart={() => startStudy(cards)}
          onBack={() => setView('input')}
        />
      )}

      <Footer />
    </div>
  );
}
