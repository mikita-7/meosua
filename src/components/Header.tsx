import Ornament from './Ornament';

export default function Header() {
  return (
    <header className="site-header">
      <p className="site-header__kicker">Nox Stellata · Đêm đầy sao</p>
      <h1 className="site-header__title">Thư Viện Thẻ Học</h1>
      <p className="site-header__sub">
        Chép ghi chú của bạn, ánh sao sẽ soi thành từng tấm thẻ để bạn ôn luyện.
      </p>
      <Ornament />
    </header>
  );
}
