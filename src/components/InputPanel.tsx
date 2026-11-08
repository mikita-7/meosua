interface Props {
  value: string;
  onChange: (v: string) => void;
  onGenerate: () => void;
  onSample: () => void;
  message: string;
}

export default function InputPanel({value, onChange, onGenerate, onSample, message}: Props) {
  return (
    <section className="panel" aria-labelledby="input-title">
      <h2 id="input-title">Ghi Lại Ánh Sao</h2>
      <p className="input__hint">
        Mỗi dòng một thẻ, theo dạng <code>Thuật ngữ : Định nghĩa</code>. Bạn cũng có thể dùng{' '}
        <code>-</code> hoặc phím Tab để ngăn cách.
      </p>

      <textarea
        className="input__area"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={'Ví dụ:\nMitochondria : Bào quan sản xuất năng lượng ATP\nDerivative : Đạo hàm, tốc độ thay đổi của hàm số'}
        rows={10}
        aria-label="Nội dung ghi chú"
      />

      {message && <p className="input__message" role="status">{message}</p>}

      <div className="input__actions">
        <button className="btn" type="button" onClick={onSample}>Dùng bài mẫu</button>
        <button className="btn btn--primary" type="button" onClick={onGenerate} disabled={!value.trim()}>
          Thắp thành thẻ
        </button>
      </div>
    </section>
  );
}
