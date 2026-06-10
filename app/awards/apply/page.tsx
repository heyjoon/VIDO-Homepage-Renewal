import Link from "next/link";

const selectableArtworks = [
  { title: "Signal Archive 01", detail: "READY · 4K video · 03:12" },
  { title: "Urban Light Study", detail: "READY · projection · 01:48" },
];

export default function AwardsApplyPage() {
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
          <span>VIDO Apply</span>
        </Link>
        <nav className="nav" aria-label="Apply navigation">
          <Link href="/awards">Awards</Link>
          <Link href="/mypage">My Page</Link>
          <Link href="/artworks/upload">Upload</Link>
        </nav>
      </header>

      <section className="band bridge" aria-label="Contest application">
        <div className="container">
          <div className="section-head">
            <h2>공모전 접수는 내 VIDO 작품 선택으로 시작됩니다.</h2>
            <p>
              업로드 완료된 작품을 선택하면 같은 미디어 파일을 다시 압축하거나
              업로드하지 않고 접수할 수 있습니다. ZIP 업로드는 보조 경로입니다.
            </p>
          </div>

          <div className="bridge-layout">
            <div className="panel">
              <div className="panel-head">
                <strong>내 VIDO 작품 선택</strong>
                <span className="badge">PRIMARY</span>
              </div>
              <div className="panel-body">
                {selectableArtworks.map((artwork) => (
                  <label className="status-card" key={artwork.title}>
                    <div>
                      <strong>{artwork.title}</strong>
                      <span>{artwork.detail}</span>
                    </div>
                    <input name="artwork" type="radio" />
                  </label>
                ))}
                <div className="actions">
                  <Link className="btn dark" href="/mypage">
                    선택한 작품으로 접수
                  </Link>
                </div>
              </div>
            </div>

            <div className="panel">
              <div className="panel-head">
                <strong>ZIP 직접 업로드</strong>
                <span className="badge blue">FALLBACK</span>
              </div>
              <div className="panel-body">
                <div className="status-card">
                  <div>
                    <strong>작품 ZIP 파일 업로드</strong>
                    <span>
                      VIDO에 아직 업로드하지 않은 작품을 위한 보조 제출 방식입니다.
                    </span>
                  </div>
                  <span className="badge blue">ZIP</span>
                </div>
                <div className="actions">
                  <Link className="btn line" href="/artworks/upload">
                    먼저 VIDO에 업로드
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
