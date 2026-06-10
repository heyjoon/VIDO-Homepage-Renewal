import Link from "next/link";

const queues = [
  { title: "작품 검수 대기", count: "12", detail: "업로드 후 REVIEW 상태" },
  { title: "진행중 공모전", count: "4", detail: "OPEN 상태 공모전" },
  { title: "접수 검토", count: "28", detail: "UNDER_REVIEW 제출" },
];

export default function AdminPage() {
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
          <span>VIDO Admin</span>
        </Link>
        <nav className="nav" aria-label="Admin navigation">
          <Link href="/">Home</Link>
          <Link href="/media-art">Gallery</Link>
          <Link href="/awards">Awards</Link>
        </nav>
      </header>

      <section className="band bridge" aria-label="Admin dashboard">
        <div className="container">
          <div className="section-head">
            <h2>운영자는 작품, 공모전, 접수를 한 화면에서 검토합니다.</h2>
            <p>
              이 페이지는 어드민 리뉴얼의 시작점입니다. 실제 권한 체크와 CRUD는
              `redesign/admin-foundation`에서 분리 개발합니다.
            </p>
          </div>

          <div className="grid-3">
            {queues.map((queue) => (
              <article className="card" key={queue.title}>
                <span className="badge blue">ADMIN</span>
                <h3>{queue.title}</h3>
                <p>
                  <strong>{queue.count}건</strong> · {queue.detail}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
