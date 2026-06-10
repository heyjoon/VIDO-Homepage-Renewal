import Link from "next/link";

const works = [
  { title: "Signal Archive 01", meta: "4K video · 03:12" },
  { title: "Urban Light Study", meta: "projection · 01:48" },
  { title: "Data Field Draft", meta: "generative media · 02:24" },
];

export default function MediaArtPage() {
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
          <span>VIDO Gallery</span>
        </Link>
        <nav className="nav" aria-label="Gallery navigation">
          <Link href="/">Home</Link>
          <Link href="/awards">Awards</Link>
          <Link href="/artworks/upload">Upload</Link>
        </nav>
      </header>

      <section className="band bridge" aria-label="Media art gallery">
        <div className="container">
          <div className="section-head">
            <h2>VIDO 갤러리는 업로드된 미디어아트가 쌓이는 기반입니다.</h2>
            <p>
              이 페이지는 기존 VIDO 갤러리 기능과 연결될 영역입니다. 작품은
              갤러리에서 보이고, My Page에서 관리되며, Awards에 재사용됩니다.
            </p>
          </div>

          <div className="artwork-grid">
            {works.map((work, index) => (
              <article className="artwork" key={work.title}>
                <div className={index % 2 === 0 ? "thumb one" : "thumb two"} aria-hidden="true" />
                <div className="artwork-content">
                  <strong>{work.title}</strong>
                  <span>{work.meta}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
