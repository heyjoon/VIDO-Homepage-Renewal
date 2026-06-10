import Link from "next/link";
import styles from "./AwardsHome.module.css";

const contests = [
  {
    title: "K-Heritage Media Art Shinsegae Square Awards",
    status: "접수중",
    deadline: "마감 D-21",
    category: "미디어아트",
    period: "2026.06.15 (월) - 08.07 (금)",
    description: "신세계 스퀘어 전광판에 어울리는 미디어아트 작품을 모집합니다.",
    open: true,
  },
  {
    title: "VIDO Creator Challenge",
    status: "접수마감",
    deadline: "결과 발표 준비중",
    category: "미디어아트",
    period: "2026.05.01 (금) - 05.31 (일)",
    description: "VIDO 업로드 작품을 기반으로 진행한 크리에이터 공모전입니다.",
    open: false,
  },
  {
    title: "Digital Archive Showcase",
    status: "예정",
    deadline: "2026.08.15 오픈",
    category: "아카이브",
    period: "2026.08.15 (토) - 09.30 (수)",
    description: "디지털 아카이브와 전시 상영을 연결하는 쇼케이스 프로그램입니다.",
    open: false,
  },
];

const notices = [
  "[전시소식] 강동 라바르 미디어아트 전시",
  "접수 마감 안내",
  "제출 양식 업데이트",
];

const faqs = [
  "여러 공모전에 동시에 접수할 수 있나요?",
  "공모전에 제출한 공모 파일을 수정할 수 있나요?",
  "접수 내역은 어떻게 확인하나요?",
];

export default function AwardsPage() {
  return (
    <main className={styles.page}>
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
          <Link href="/">공모전홈</Link>
          <Link href="#contests">공모전 목록</Link>
          <Link href="#notice">공지사항</Link>
          <Link href="#faq">FAQ</Link>
          <Link className={styles.navApply} href="/awards/apply">접수하기</Link>
        </nav>
      </header>

      <section className={styles.hero} aria-label="VIDO awards hero">
        <div className="container">
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>공모전 통합 플랫폼</p>
              <h1>
                좋은 공모전을 발견하고,
                <br />내 작품을 더 쉽게 제출하세요.
              </h1>
              <p>
                공모전 탐색부터 작품 제출, 접수 내역 관리까지 VIDO에서 간편하게 진행할 수 있습니다.
                접수는 VIDO.gallery에 업로드된 READY 작품 선택으로만 진행합니다.
              </p>
              <div className={styles.actions}>
                <Link className={styles.applyButton} href="/awards/apply">
                  지금 접수하기
                </Link>
                <Link className={styles.primaryButton} href="#contests">
                  진행중 공모전 보기
                </Link>
                <Link className={styles.secondaryButton} href="/mypage">
                  내 접수 내역 확인
                </Link>
              </div>
            </div>

            <aside className={styles.submitPanel} aria-label="VIDO artwork submission path">
              <span className={styles.panelLabel}>접수 시작 위치</span>
              <h2>접수는 공모전 카드의 `접수하기` 또는 이 버튼에서 시작합니다.</h2>
              <p>
                ZIP 직접 업로드는 사용하지 않습니다. 먼저 VIDO.gallery에 작품을 올리고, READY 상태 작품을 선택해 접수합니다.
              </p>
              <Link className={styles.panelLink} href="/awards/apply">
                접수 페이지로 이동
              </Link>
            </aside>
          </div>
        </div>
      </section>

      <section className={styles.featured} aria-label="Featured contest">
        <div className="container">
          <div className={styles.sectionHead}>
            <div>
              <p className={styles.kicker}>인기 공모전</p>
              <h2>SHINSEGAE SQUARE AWARDS</h2>
            </div>
            <Link className={styles.featureApply} href="/awards/apply">접수하기</Link>
          </div>

          <article className={styles.featuredCard}>
            <div className={styles.banner} role="img" aria-label="신세계 스퀘어 미디어아트 공모전 배너">
              <span>SHINSEGAE SQUARE</span>
            </div>
            <div className={styles.featuredBody}>
              <p className={styles.kicker}>신세계 스퀘어 미디어아트 공모전</p>
              <h3>K-Heritage Media Art Shinsegae Square Awards</h3>
              <p>2026. 06. 15 (월) - 08.07 (금)</p>
              <div className={styles.actionsCompact}>
                <Link className={styles.lineButton} href="#contests">
                  상세보기
                </Link>
                <Link className={styles.darkButton} href="/awards/apply">
                  접수하기
                </Link>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section id="contests" className={styles.contests} aria-label="Contest list">
        <div className="container">
          <div className={styles.sectionHead}>
            <div>
              <p className={styles.kicker}>모든 공모전</p>
              <h2>모집 중인 공모전을 확인하세요.</h2>
            </div>
            <p className={styles.sectionDescription}>
              진행중 공모전 카드에서 바로 접수를 시작할 수 있습니다.
            </p>
          </div>

          <div className={styles.contestGrid}>
            {contests.map((contest) => (
              <article className={contest.open ? styles.contestCardOpen : styles.contestCard} key={contest.title}>
                <div className={styles.cardTopline}>
                  <span className={contest.open ? styles.openBadge : styles.mutedBadge}>{contest.status}</span>
                  <span>{contest.deadline}</span>
                </div>
                <h3>{contest.title}</h3>
                <p>{contest.description}</p>
                <dl className={styles.metaList}>
                  <div>
                    <dt>분야</dt>
                    <dd>{contest.category}</dd>
                  </div>
                  <div>
                    <dt>기간</dt>
                    <dd>{contest.period}</dd>
                  </div>
                </dl>
                <div className={styles.actionsCompact}>
                  <Link className={styles.lineButton} href="#notice">
                    상세보기
                  </Link>
                  {contest.open ? (
                    <Link className={styles.darkButton} href="/awards/apply">
                      접수하기
                    </Link>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.guide} aria-label="Notice and FAQ">
        <div className="container">
          <div className={styles.guideGrid}>
            <article id="notice" className={styles.guidePanel}>
              <div className={styles.panelHeader}>
                <p className={styles.kicker}>공지사항</p>
                <Link href="#contests">전체보기</Link>
              </div>
              <ul>
                {notices.map((notice) => (
                  <li key={notice}>{notice}</li>
                ))}
              </ul>
            </article>

            <article id="faq" className={styles.guidePanel}>
              <div className={styles.panelHeader}>
                <p className={styles.kicker}>통합 FAQ</p>
                <Link href="/FaQ">VIDO FAQ</Link>
              </div>
              <ul>
                {faqs.map((faq) => (
                  <li key={faq}>{faq}</li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <div className={styles.stickyApply}>
        <span>K-Heritage Media Art Shinsegae Square Awards 접수중</span>
        <Link href="/awards/apply">접수하기</Link>
      </div>
    </main>
  );
}
