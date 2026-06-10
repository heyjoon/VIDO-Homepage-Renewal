import Link from "next/link";

const artworks = [
  { title: "Signal Archive 01", status: "READY", detail: "4K video · 03:12" },
  { title: "Urban Light Study", status: "READY", detail: "projection · 01:48" },
  { title: "Data Field Draft", status: "PROCESSING", detail: "rendering preview" },
];

const submissions = [
  {
    contest: "VIDO Media Art Awards 2026",
    artwork: "Signal Archive 01",
    status: "SUBMITTED",
    number: "VIDO-2026-0018",
  },
  {
    contest: "Archive Remix Open Call",
    artwork: "Urban Light Study",
    status: "UNDER_REVIEW",
    number: "VIDO-2026-0021",
  },
];

export default function MyPage() {
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
          <span>VIDO My Page</span>
        </Link>
        <nav className="nav" aria-label="My Page navigation">
          <Link href="/">Home</Link>
          <Link href="/artworks/upload">Upload</Link>
          <Link href="/awards">Awards</Link>
        </nav>
      </header>

      <section className="band bridge" aria-label="My Page dashboard">
        <div className="container">
          <div className="section-head">
            <h2>내 작품과 공모전 접수 내역을 한 곳에서 관리하세요.</h2>
            <p>
              업로드한 작품의 처리 상태, 제출 가능한 작품, 공모전 접수 상태를
              사용자 기준으로 모아 보여줍니다.
            </p>
          </div>

          <div className="grid-3">
            <article className="card">
              <span className="badge">ARTWORKS</span>
              <h3>전체 작품 3개</h3>
              <p>READY 2개, PROCESSING 1개</p>
            </article>
            <article className="card">
              <span className="badge blue">SUBMISSIONS</span>
              <h3>접수한 공모전 2개</h3>
              <p>제출 완료와 심사중 상태를 추적합니다.</p>
            </article>
            <article className="card">
              <span className="badge">NEXT</span>
              <h3>진행중 공모전 4개</h3>
              <p>READY 작품으로 바로 접수할 수 있습니다.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="band" aria-label="My artworks and submissions">
        <div className="container bridge-layout">
          <div className="panel">
            <div className="panel-head">
              <strong>내 VIDO 작품</strong>
              <Link className="badge blue" href="/artworks/upload">
                새 작품 업로드
              </Link>
            </div>
            <div className="panel-body">
              {artworks.map((artwork) => (
                <div className="status-card" key={artwork.title}>
                  <div>
                    <strong>{artwork.title}</strong>
                    <span>{artwork.detail}</span>
                  </div>
                  <span className="badge">{artwork.status}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="panel">
            <div className="panel-head">
              <strong>공모전 접수 내역</strong>
              <Link className="badge" href="/awards">
                공모전 보기
              </Link>
            </div>
            <div className="panel-body">
              {submissions.map((submission) => (
                <div className="status-card" key={submission.number}>
                  <div>
                    <strong>{submission.contest}</strong>
                    <span>
                      {submission.artwork} · {submission.number}
                    </span>
                  </div>
                  <span className="badge blue">{submission.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
