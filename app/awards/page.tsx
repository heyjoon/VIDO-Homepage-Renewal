import Link from "next/link";

const contests = [
  {
    title: "VIDO Media Art Awards 2026",
    status: "OPEN",
    deadline: "D-18",
    fit: "내 작품 2개 적합",
    description: "업로드 완료된 미디어아트 작품으로 바로 지원할 수 있습니다.",
  },
  {
    title: "Archive Remix Open Call",
    status: "OPEN",
    deadline: "D-31",
    fit: "내 작품 1개 적합",
    description: "READY 상태의 VIDO 작품을 선택해 제출할 수 있습니다.",
  },
  {
    title: "Public Screen Program",
    status: "OPEN",
    deadline: "D-5",
    fit: "규격 확인 필요",
    description: "공공 스크린 상영을 위한 미디어아트 공모전입니다.",
  },
];

export default function AwardsPage() {
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
          <span>VIDO Awards</span>
        </Link>
        <nav className="nav" aria-label="Awards navigation">
          <Link href="/">Home</Link>
          <Link href="/artworks/upload">Upload</Link>
          <Link href="/mypage">My Page</Link>
        </nav>
      </header>

      <section className="hero" aria-label="VIDO awards hero">
        <div className="container hero-inner">
          <div className="hero-copy">
            <p className="eyebrow">VIDO AWARDS</p>
            <h1>내 작품으로 지원 가능한 공모전을 확인하세요.</h1>
            <p>
              VIDO에 업로드한 작품을 기준으로 지원 가능한 공모전을 보여주고,
              접수 단계에서는 같은 파일을 다시 올리지 않고 작품을 선택해
              제출합니다.
            </p>
            <div className="actions">
              <Link className="btn primary" href="#contests">
                공모전 탐색
              </Link>
              <Link className="btn line" href="/artworks/upload">
                먼저 작품 업로드
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="contests" className="band bridge" aria-label="Open contests">
        <div className="container">
          <div className="section-head">
            <h2>진행중 공모전</h2>
            <p>
              기본 제출 방식은 내 VIDO 작품 선택입니다. 직접 ZIP 업로드는
              아직 VIDO에 올리지 않은 작품을 위한 보조 경로입니다.
            </p>
          </div>

          <div className="grid-3">
            {contests.map((contest) => (
              <article className="card" key={contest.title}>
                <span className="badge blue">{contest.status}</span>
                <h3>{contest.title}</h3>
                <p>{contest.description}</p>
                <p>
                  <strong>{contest.deadline}</strong> · {contest.fit}
                </p>
                <div className="actions">
                  <Link className="btn dark" href="/awards/apply">
                    내 작품으로 접수
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
