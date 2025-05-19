# Mandoo Shop

## 기술 개발

1. Next.js Page Router 프로젝트 초기화
2. 제품 리스트 페이지 구현
3. 제품 상세 페이지 - 동적 라우팅 구현
4. 리뷰 작성 기능 및 폼 처리
5. getStaticProps / getServerSideProps 활용
6. 레이아웃 구성 (\_app.js,\_document.js)
7. 검색 기능 + 필터 기능 추가
8. SEO 및 메타 태그 적용
9. 배포 전 최적화 및 마무리

### 제품 페이지

1. 제품리스트 페이지
2. 제품리스트 페이지 - 검색
3. 제품 상세페이지
4. 제품 상세페이지 - 댓글 리뷰

### 장바구니 페이지

> 실제 이커머스 서비스에서는 사용자 경험을 위해 “장바구니”는 필수 기능입니다.
> 장바구니는 로그인 없이도 사용할 수 있어야 하며, 페이지를 이동해도 유지되어야 합니다.
> 이 기능을 직접 구현하면 **상태 관리, 로컬 스토리지, 라우팅, UI/UX 흐름**을 자연스럽게 연습할 수 있습니다.

1. “장바구니에 담기” 버튼 추가
   - 제품 상세 페이지에 장바구니 담기 버튼 추가
   - 클릭 시 해당 제품이 장바구니에 저장됨
2. 장바구니 페이지 (`/cart`) 구현
   - 장바구니에 담은 상품 목록 렌더링
   - 수량 변경, 삭제 기능 포함
   - 총 합계 금액 표시
3. 장바구니 데이터 유지

   - 새로고침 또는 페이지 이동 시에도 데이터 유지되어야 함
   - `Context API` 를 통해 상태를 공유해야 함
   - 장바구니 데이터 예시

   ```javascript
   [
      {
        id: "p1", // 상품 ID
        name: "무선 키보드",
        price: 45000,
        quantity: 2, // 수량
        image: "/keyboard.png",
      },
   ...
   ]
   ```

4. 헤더에 장바구니 `nav` 추가
   - 장바구니에 담긴 상품 수 표시 (ex: `Cart(3)`)
     예) 헤드폰2개, 키보드1개 = 표시 상품 수 2
   - 클릭 시 `/cart` 페이지로 이동

### 관리자 로그인페이지

- 로그인 했을 경우 : `/admin` 접근 가능
- 로그인 하지 않을 경우 : `/admin` 접근 시, 바로 `/admin/login`으로 `redirect`

```javascript
// 관리자 계정은 아래 사용 (실제 서비스에서는 DB + 암호화 사용합니다)
const ADMIN_ID = "admin";
const ADMIN_PW = "password123";

// 로그인 여부는 로컬스토리지에 아래 값으로 판단합니다.
localStorage.setItem("adminLoggedIn", "true");
```

### 관리자 대시보드 페이지

- 주문 목록 조회 및 주문 상태 변경 구현
  - 조회 : `GET`
  - 상태 변경 : `PATCH`

### 인증 방식을 쿠키 기반 개선 : 쿠키 + `getServerSideProps`

- `admin_token`이란 **쿠키가 존재**하면 인증된 것으로 간주
- 인증이 안 된 경우 → `/admin/login`으로 서버 리다이렉트
- 인증된 경우 → 서버에서 주문 목록을 `fetch`하여 `props`로 넘김

## 스터디 공부 내용

- 라우팅/동적 라우팅
- `next/image`, `next/link`, `next/head`
- `getStaticProps`, `getStaticPaths`

## `Next.js Page Router`

### 기본 원리

- `pages/` 디렉토리 기반 자동 라우팅.
- 파일 이름이 곧 URL 경로<br/>(`/pages/about.js` → `/about`).
- `pages/index.js`는 루트 경로(`/`)와 매칭됨.
- 폴더 구조를 통해 동적 라우팅 지원<br/>(`pages/products/[id].js` → `/products/123`).
- `getStaticProps`, `getServerSideProps`, `getStaticPaths`로 **데이터 패칭** 처리.

### 주요 특징

- **파일 기반 라우팅** (직관적이고 쉬움)
- **서버 사이드 렌더링(SSR)**, **정적 생성(SSG)**, **클라이언트 렌더링** 모두 지원
- **API Routes 지원** (pages/api/ 안에 파일 생성)
- **중첩 라우팅, 레이아웃 공유 불편** → App Router와의 차이점
