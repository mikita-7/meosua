# Thư Viện Thẻ Học

Web flashcards cho sinh viên năm nhất, phong cách châu âu thời Phục hưng: giấy da, viền vàng, đỏ burgundy.
Người dùng dán ghi chú (mỗi dòng `Thuật ngữ : Định nghĩa`), web tự tạo thẻ lật để ôn tập.

## Chạy thử

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # xuất ra thư mục dist/
```

## Cấu trúc

```
src/
  App.tsx                 # ghép các màn hình, phím tắt, lưu bản thảo
  types.ts                # kiểu Card, Mark, View
  lib/parseCards.ts       # tách văn bản thành thẻ, xáo thẻ, bài mẫu
  components/             # Header, Footer, Ornament, InputPanel,
                          # Flashcard, StudyView, ResultView
  styles/                 # theme (màu, phông) · layout · input · card
```

## Đổi giao diện

Mọi màu và phông nằm ở `:root` trong `src/styles/theme.css`.

## Kết nối với web/backend riêng

Phần giao diện không gọi API nào. Khi có backend, thay hàm `parseCards` trong `handleGenerate` (`App.tsx`)
bằng lời gọi API trả về mảng `Card[]` (`{id, front, back}`).

## Deploy GitHub Pages

Đổi `base` trong `vite.config.ts` thành `'/<tên-repo>/'`, chạy `npm run build`, đăng thư mục `dist/`.
