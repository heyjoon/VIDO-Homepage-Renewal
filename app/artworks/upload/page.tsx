import Link from "next/link";

export default function ArtworkUploadPage() {
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
          <span>VIDO Upload</span>
        </Link>
        <nav className="nav" aria-label="Upload navigation">
          <Link href="/">Home</Link>
          <Link href="/awards">Awards</Link>
          <Link href="/mypage">My Page</Link>
        </nav>
      </header>

      <section className="hero" aria-label="Artwork upload">
        <div className="container hero-inner">
          <div className="hero-copy">
            <p className="eyebrow">Artwork Upload</p>
            <h1>작품을 먼저 올리면, 이후 공모전 제출이 쉬워집니다.</h1>
            <p>
              이 화면은 기존 VIDO 업로드 기능과 연결될 자리입니다. 업로드가
              완료된 작품은 My Page에 저장되고 Awards 접수에서 다시 선택할 수
              있습니다.
            </p>
            <div className="actions">
              <Link className="btn primary" href="/mypage">
                내 작품 보관함 보기
              </Link>
              <Link className="btn line" href="/awards">
                진행중 공모전 보기
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
