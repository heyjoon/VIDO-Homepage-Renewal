import Link from "next/link";
import HomeBridge from "./components/HomeBridge";

const stats = [
  {
    title: "작품 업로드",
    body: "미디어아트를 VIDO에 등록하고 보관합니다.",
  },
  {
    title: "내 작품 선택",
    body: "공모전 접수 단계에서 업로드된 작품을 다시 사용합니다.",
  },
  {
    title: "접수 내역 관리",
    body: "마이페이지에서 작품과 공모전 상태를 함께 확인합니다.",
  },
];

export default function HomePage() {
  return (
    <main>
      <header className="topbar">
        <Link className="brand" href="/" aria-label="VIDO home">
          <span className="mark" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </span>
          <span>VIDO</span>
        </Link>
        <nav className="nav" aria-label="Main navigation">
          <Link href="/media-art">Media Art</Link>
          <Link href="/awards">Awards</Link>
          <Link href="/mypage">My Page</Link>
          <Link href="/admin">Admin</Link>
        </nav>
      </header>

      <section className="hero" aria-label="VIDO media art platform">
        <div className="container hero-inner">
          <div className="hero-copy">
            <p className="eyebrow">VIDO Media Art Platform</p>
            <h1>미디어아트를 올리고, 전시하고, 공모전에 출품하세요.</h1>
            <p>
              VIDO는 미디어아트 작품을 업로드하고 관리하며, 진행중인 공모전에
              같은 파일을 다시 업로드하지 않고 바로 제출할 수 있는 플랫폼입니다.
            </p>
            <div className="actions">
              <Link className="btn primary" href="/artworks/upload">
                작품 업로드하기
              </Link>
              <Link className="btn line" href="/awards">
                진행중 공모전 보기
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="band" aria-label="VIDO product loop">
        <div className="container">
          <div className="section-head">
            <h2>공모전 페이지를 붙이는 게 아니라, 업로드 이유를 만듭니다.</h2>
            <p>
              홈페이지는 VIDO 방문자를 작품 업로드로 이끌고, 업로드한 작품을
              공모전 제출과 마이페이지 관리로 연결해야 합니다.
            </p>
          </div>
          <div className="grid-3">
            {stats.map((item, index) => (
              <article className="card" key={item.title}>
                <span className="badge blue">0{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <HomeBridge />

      <section className="band dark-band" aria-label="Next phases">
        <div className="container">
          <div className="section-head">
            <h2>다음 개발은 공모전과 마이페이지를 분리 브랜치에서 진행합니다.</h2>
            <p>
              공모전 제출 생성은 branch1, 사용자 대시보드와 접수 내역 조회는
              branch2에서 개발하고 integration 브랜치에서 검증합니다.
            </p>
          </div>
          <div className="grid-3">
            <article className="card">
              <span className="badge">branch1</span>
              <h3>Awards / Contests</h3>
              <p>진행중 공모전, 상세, 내 작품 선택 제출, ZIP fallback.</p>
            </article>
            <article className="card">
              <span className="badge">branch2</span>
              <h3>User My Page</h3>
              <p>내 작품, 접수 내역, 최근 활동, 프로필을 사용자 기준으로 통합.</p>
            </article>
            <article className="card">
              <span className="badge">integration</span>
              <h3>End-to-end QA</h3>
              <p>업로드에서 공모전 접수, 마이페이지 확인까지 전체 흐름 검증.</p>
            </article>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          VIDO Homepage Renewal · Upload - Artwork Library - Awards Submission
        </div>
      </footer>
    </main>
  );
}
