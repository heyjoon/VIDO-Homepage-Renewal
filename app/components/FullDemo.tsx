"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  createSubmission,
  getArtwork,
  getContest,
  getCurrentUser,
  initialState,
  loadMockState,
  loginAs,
  logout,
  resetMockState,
  reviewArtwork,
  reviewSubmission,
  type MockState,
} from "../lib/mockStore";
import styles from "./FullDemo.module.css";

type TabId =
  | "gallery"
  | "media"
  | "exhibition"
  | "artist"
  | "collector"
  | "account"
  | "mypage"
  | "awards"
  | "admin"
  | "faq";

const tabs: Array<{ id: TabId; label: string }> = [
  { id: "gallery", label: "VIDO Gallery" },
  { id: "media", label: "Media Art" },
  { id: "exhibition", label: "Exhibition" },
  { id: "artist", label: "Artist" },
  { id: "collector", label: "Collector" },
  { id: "account", label: "Login / Signup" },
  { id: "mypage", label: "My Page" },
  { id: "awards", label: "Awards" },
  { id: "admin", label: "Admin" },
  { id: "faq", label: "FAQ / Report" },
];

const featureCards = [
  { title: "Gallery Process", body: "기존 VIDO Gallery 소개, 전시 공간, 프로세스 섹션을 유지합니다." },
  { title: "Media Art OTT", body: "작품 리스트, 상세, 영상 재생, 조회, 좋아요, 다운로드 흐름을 포함합니다." },
  { title: "Collector", body: "구독자/컬렉터가 작품을 구독하고 전시 가능한 상태를 확인합니다." },
];

const faqItems = [
  { q: "VIDO는 무엇인가요?", a: "미디어아트 작품을 구독하고 전시할 수 있는 OTT형 플랫폼입니다." },
  { q: "작품은 어떻게 제출하나요?", a: "기존 VIDO 업로드 작품을 선택하거나, 공모전 fallback으로 직접 파일을 제출합니다." },
  { q: "Collector 기능은 무엇인가요?", a: "컬렉터가 구독 중인 작품과 전시 가능한 컬렉션 상태를 확인하는 영역입니다." },
];

export default function FullDemo() {
  const [state, setState] = useState<MockState>(initialState);
  const [activeTab, setActiveTab] = useState<TabId>("gallery");
  const [selectedContest, setSelectedContest] = useState("contest-public-screen");
  const [selectedArtwork, setSelectedArtwork] = useState("art-signal");
  const [message, setMessage] = useState("풀 목업이 준비되었습니다.");

  useEffect(() => {
    setState(loadMockState());
  }, []);

  const user = getCurrentUser(state);
  const artistArtworks = state.artworks.filter((artwork) => artwork.ownerId === "user-artist");
  const readyArtworks = artistArtworks.filter((artwork) => artwork.status === "READY");
  const userSubmissions = state.submissions.filter((submission) => submission.userId === "user-artist");
  const reviewQueue = state.submissions.filter((submission) => submission.status === "UNDER_REVIEW");
  const processingQueue = state.artworks.filter((artwork) => artwork.status === "PROCESSING");
  const selectedContestObject = state.contests.find((contest) => contest.id === selectedContest);
  const selectedArtworkObject = state.artworks.find((artwork) => artwork.id === selectedArtwork);

  const stats = useMemo(
    () => [
      { label: "작품", value: `${state.artworks.length}`, detail: "READY / PROCESSING / REJECTED" },
      { label: "접수", value: `${state.submissions.length}`, detail: "공모전 제출 및 심사 상태" },
      { label: "어드민 대기", value: `${reviewQueue.length + processingQueue.length}`, detail: "작품 검수 + 접수 검토" },
    ],
    [processingQueue.length, reviewQueue.length, state.artworks.length, state.submissions.length],
  );

  function refresh(next: MockState, nextMessage: string) {
    setState(next);
    setMessage(nextMessage);
  }

  function handleLogin(role: "artist" | "admin") {
    const next = loginAs(role);
    refresh(next, role === "artist" ? "아티스트로 로그인했습니다." : "어드민으로 로그인했습니다.");
  }

  function handleSubmit() {
    try {
      const next = createSubmission(selectedContest, selectedArtwork);
      refresh(next, `${selectedArtworkObject?.title ?? "작품"}을 ${selectedContestObject?.title ?? "공모전"}에 제출했습니다.`);
      setActiveTab("mypage");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "제출에 실패했습니다.");
    }
  }

  function handleReviewSubmission(id: string, status: "APPROVED" | "REJECTED") {
    const next = reviewSubmission(id, status);
    refresh(next, `접수를 ${status === "APPROVED" ? "승인" : "반려"}했습니다.`);
  }

  function handleReviewArtwork(id: string, status: "READY" | "REJECTED") {
    const next = reviewArtwork(id, status);
    refresh(next, `작품 상태를 ${status}(으)로 변경했습니다.`);
  }

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
          <span>VIDO Full Mock</span>
        </Link>
        <nav className="nav" aria-label="Full mock navigation">
          <Link href="/">Home</Link>
          <Link href="/media-art">Media Art</Link>
          <Link href="/awards">Awards</Link>
          <Link href="/admin">Admin</Link>
        </nav>
      </header>

      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroGrid}>
            <div>
              <p className="eyebrow">VIDO.gallery Renewal Full Mock</p>
              <h1>기존 VIDO.gallery 기능을 유지하고, 공모전과 어드민을 연결합니다.</h1>
              <p>
                Media Art, VIDO Gallery, Exhibition, Artist, Collector, FAQ, My Page, Payment,
                Upload, Search, Subscription, Awards, Admin review까지 한 흐름에서 확인합니다.
              </p>
            </div>
            <div className={styles.sessionPanel}>
              <strong>{user ? `${user.name} 로그인 중` : "로그인 전"}</strong>
              <span>{message}</span>
              <div className={styles.actionRow}>
                <button type="button" onClick={() => handleLogin("artist")}>Artist Login</button>
                <button type="button" onClick={() => handleLogin("admin")}>Admin Login</button>
                <button className={styles.secondary} type="button" onClick={() => refresh(logout(), "로그아웃했습니다.")}>Logout</button>
                <button className={styles.secondary} type="button" onClick={() => refresh(resetMockState(), "데모 데이터를 초기화했습니다.")}>Reset</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.tabs}>
        <div className="container">
          <div className={styles.tabScroller}>
            {tabs.map((tab) => (
              <button
                className={activeTab === tab.id ? styles.active : ""}
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className={styles.section}>
        <div className="container">
          {activeTab === "gallery" && (
            <>
              <SectionHead title="VIDO Gallery" body="기존 /vido-gallery, gallery process, gallery spaces, OTT 소개 흐름을 유지합니다." />
              <div className={styles.grid3}>
                {featureCards.map((card) => (
                  <article className={styles.card} key={card.title}>
                    <span className={styles.badge}>GALLERY</span>
                    <h3>{card.title}</h3>
                    <p>{card.body}</p>
                  </article>
                ))}
              </div>
            </>
          )}

          {activeTab === "media" && (
            <>
              <SectionHead title="Media Art" body="검색, 태그, 카테고리, top/new 정렬, 좋아요, 조회, 다운로드, 상세 감상 상태를 포함합니다." />
              <div className={styles.controls}>
                <input aria-label="search" placeholder="작품/작가 검색" />
                <select aria-label="sort"><option>최신순</option><option>TOP 10</option><option>Editor Pick</option></select>
                <select aria-label="tag"><option>Genre</option><option>Mood</option><option>Collection</option></select>
                <button type="button">검색</button>
              </div>
              <div className={styles.grid3} style={{ marginTop: 16 }}>
                {state.artworks.map((artwork, index) => (
                  <article className={styles.card} key={artwork.id}>
                    <div className={`${styles.mockVisual} ${index % 2 ? styles.alt : ""}`} />
                    <h3>{artwork.title}</h3>
                    <p>{artwork.detail}</p>
                    <div className={styles.controls}>
                      <span className={styles.badge}>조회 1.2k</span>
                      <span className={`${styles.badge} ${styles.badgePink}`}>좋아요 84</span>
                      <span className={`${styles.badge} ${styles.badgeBlue}`}>다운로드</span>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}

          {activeTab === "exhibition" && (
            <>
              <SectionHead title="Exhibition / Edition" body="전시 상세, 참여작가, 기간, 장소, 작품목록, 에디션, 현장사진, 라이트박스 흐름을 포함합니다." />
              <div className={styles.grid2}>
                <article className={styles.panel}>
                  <span className={styles.badge}>EXHIBITION</span>
                  <h3>Media Facade Archive</h3>
                  <p>기간 2026.06.01 - 2026.08.31 · 장소 VIDO Gallery Jeju · 기획/큐레이션 VIDO Lab</p>
                  <div className={styles.list} style={{ marginTop: 14 }}>
                    {readyArtworks.map((artwork) => <ListItem key={artwork.id} title={artwork.title} meta="작품목록 · 전시 가능" badge="WORK" />)}
                  </div>
                </article>
                <article className={styles.panel}>
                  <span className={`${styles.badge} ${styles.badgeBlue}`}>EDITION</span>
                  <h3>Edition Detail</h3>
                  <p>영상 프리뷰, 작품 정보, 설명, 갤러리 사진, 라이트박스 미리보기를 표시합니다.</p>
                  <div className={`${styles.mockVisual} ${styles.photo}`} style={{ marginTop: 16 }} />
                </article>
              </div>
            </>
          )}

          {activeTab === "artist" && (
            <>
              <SectionHead title="Artist / Author" body="작가 목록, 작가 상세, 프로필 이미지, 작가별 작품 목록을 유지합니다." />
              <div className={styles.grid3}>
                {state.users.map((mockUser) => (
                  <article className={styles.card} key={mockUser.id}>
                    <span className={styles.badge}>{mockUser.role.toUpperCase()}</span>
                    <h3>{mockUser.name}</h3>
                    <p>{mockUser.email}</p>
                  </article>
                ))}
                <article className={styles.card}>
                  <span className={`${styles.badge} ${styles.badgeBlue}`}>AUTHOR DETAIL</span>
                  <h3>작가별 작품</h3>
                  <p>작가 프로필에서 작품 목록, 조회수, 다운로드, 연관 작품을 확인합니다.</p>
                </article>
              </div>
            </>
          )}

          {activeTab === "collector" && (
            <>
              <SectionHead title="Collector / Subscription" body="/collector와 /subscription의 구독, 컬렉션, 전시 가능한 작품 상태를 포함합니다." />
              <div className={styles.grid3}>
                <article className={styles.card}><span className={styles.badge}>SUBSCRIBE</span><h3>구독 중 작품 12개</h3><p>구독자는 작품을 보관하고 전시 가능한 컬렉션으로 관리합니다.</p></article>
                <article className={styles.card}><span className={`${styles.badge} ${styles.badgeBlue}`}>COLLECT</span><h3>Collector Gallery</h3><p>collector.collect_gallery 흐름을 목업에 유지합니다.</p></article>
                <article className={styles.card}><span className={`${styles.badge} ${styles.badgePink}`}>DISPLAY</span><h3>Screen-ready</h3><p>전시 화면, 스크린, 영상 플레이 상태를 확인합니다.</p></article>
              </div>
            </>
          )}

          {activeTab === "account" && (
            <>
              <SectionHead title="Login / Signup" body="로그인, 아이디/비밀번호 찾기, 개인/기업 약관, 회원정보 등록, 가입 완료 흐름을 유지합니다." />
              <div className={styles.grid2}>
                <article className={styles.panel}><h3>Account Login</h3><p>Artist/Admin mock login으로 전체 목업 상태를 전환합니다.</p><div className={styles.controls}><button type="button" onClick={() => handleLogin("artist")}>Artist Login</button><button type="button" onClick={() => handleLogin("admin")}>Admin Login</button></div></article>
                <article className={styles.panel}><h3>Signup / Recovery</h3><p>find-id, find-pw, terms, infoRegister, registerDone 화면은 renewal에서 유지되어야 합니다.</p><div className={styles.controls}><button className={styles.light} type="button">Find ID</button><button className={styles.light} type="button">Terms</button></div></article>
              </div>
            </>
          )}

          {activeTab === "mypage" && (
            <>
              <SectionHead title="My Page / My Art / Dashboard / Payment" body="기존 myPage, myart, crop, dashboard, payment 흐름과 신규 공모전 접수 상태를 함께 보여줍니다." />
              <div className={styles.grid3}>{stats.map((stat) => <article className={styles.card} key={stat.label}><span className={styles.badge}>{stat.label}</span><h3>{stat.value}</h3><p>{stat.detail}</p></article>)}</div>
              <div className={styles.grid2} style={{ marginTop: 16 }}>
                <PanelList title="내 작품" items={artistArtworks.map((artwork) => ({ title: artwork.title, meta: artwork.detail, badge: artwork.status }))} />
                <PanelList title="접수 내역" items={userSubmissions.map((submission) => ({ title: getContest(state, submission.contestId)?.title ?? "공모전", meta: `${getArtwork(state, submission.artworkId)?.title ?? "작품"} · ${submission.number}`, badge: submission.status }))} />
              </div>
            </>
          )}

          {activeTab === "awards" && (
            <>
              <SectionHead title="Awards / Contest Submission" body="VIDO 기존 업로드 작품을 재사용해 공모전에 제출하고, 접수 상태를 My Page와 Admin에 공유합니다." />
              <div className={styles.grid2}>
                <article className={styles.panel}>
                  <h3>공모전 선택</h3>
                  <div className={styles.controls}>
                    <select value={selectedContest} onChange={(event) => setSelectedContest(event.target.value)}>
                      {state.contests.map((contest) => <option value={contest.id} key={contest.id}>{contest.title}</option>)}
                    </select>
                    <select value={selectedArtwork} onChange={(event) => setSelectedArtwork(event.target.value)}>
                      {readyArtworks.map((artwork) => <option value={artwork.id} key={artwork.id}>{artwork.title}</option>)}
                    </select>
                    <button type="button" onClick={handleSubmit}>내 작품으로 접수</button>
                  </div>
                  <p style={{ marginTop: 16 }}>{selectedContestObject?.description}</p>
                </article>
                <article className={styles.panel}>
                  <h3>ZIP fallback</h3>
                  <p>기존 VIDO 작품 선택이 기본 경로이고, ZIP 직접 업로드는 보조 제출 방식입니다.</p>
                  <div className={styles.controls}><button className={styles.light} type="button">ZIP 업로드 mock</button></div>
                </article>
              </div>
            </>
          )}

          {activeTab === "admin" && (
            <>
              <SectionHead title="Admin Review" body="작품 검수, 접수 검토, 공모전 상태를 운영자 관점에서 확인하고 승인/반려합니다." />
              <div className={styles.grid2}>
                <article className={styles.panel}>
                  <h3>접수 검토</h3>
                  <div className={styles.list}>
                    {reviewQueue.length ? reviewQueue.map((submission) => <ReviewSubmissionItem key={submission.id} state={state} submissionId={submission.id} onReview={handleReviewSubmission} />) : <p>심사 대기 접수가 없습니다.</p>}
                  </div>
                </article>
                <article className={styles.panel}>
                  <h3>작품 검수</h3>
                  <div className={styles.list}>
                    {processingQueue.length ? processingQueue.map((artwork) => <div className={styles.listItem} key={artwork.id}><div><strong>{artwork.title}</strong><span>{artwork.detail}</span></div><div className={styles.controls}><button type="button" onClick={() => handleReviewArtwork(artwork.id, "READY")}>승인</button><button className={styles.light} type="button" onClick={() => handleReviewArtwork(artwork.id, "REJECTED")}>반려</button></div></div>) : <p>검수 대기 작품이 없습니다.</p>}
                  </div>
                </article>
              </div>
            </>
          )}

          {activeTab === "faq" && (
            <>
              <SectionHead title="FAQ / Report / Contact" body="/FaQ와 /report, 공지/뉴스/문의 기능군을 renewal에서 유지합니다." />
              <div className={styles.grid2}>
                <article className={styles.panel}><h3>FAQ</h3><div className={styles.list}>{faqItems.map((item) => <ListItem key={item.q} title={item.q} meta={item.a} badge="FAQ" />)}</div></article>
                <article className={styles.panel}><h3>Report / Notice</h3><p>공지, 뉴스, 문의, 다운로드 리포트, Kakao 채널 상담 같은 운영성 기능을 보존합니다.</p><div className={styles.controls}><button type="button">문의 접수 mock</button><button className={styles.light} type="button">공지 검색</button></div></article>
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}

function SectionHead({ title, body }: { title: string; body: string }) {
  return <div className={styles.sectionHead}><h2>{title}</h2><p>{body}</p></div>;
}

function ListItem({ title, meta, badge }: { title: string; meta: string; badge: string }) {
  return <div className={styles.listItem}><div><strong>{title}</strong><span>{meta}</span></div><span className={styles.badge}>{badge}</span></div>;
}

function PanelList({ title, items }: { title: string; items: Array<{ title: string; meta: string; badge: string }> }) {
  return <article className={styles.panel}><h3>{title}</h3><div className={styles.list}>{items.map((item) => <ListItem key={`${item.title}-${item.badge}`} {...item} />)}</div></article>;
}

function ReviewSubmissionItem({ state, submissionId, onReview }: { state: MockState; submissionId: string; onReview: (id: string, status: "APPROVED" | "REJECTED") => void }) {
  const submission = state.submissions.find((item) => item.id === submissionId);

  if (!submission) {
    return null;
  }

  const contest = getContest(state, submission.contestId);
  const artwork = getArtwork(state, submission.artworkId);

  return (
    <div className={styles.listItem}>
      <div>
        <strong>{contest?.title ?? "공모전"}</strong>
        <span>{artwork?.title ?? "작품"} · {submission.number}</span>
      </div>
      <div className={styles.controls}>
        <button type="button" onClick={() => onReview(submission.id, "APPROVED")}>승인</button>
        <button className={styles.light} type="button" onClick={() => onReview(submission.id, "REJECTED")}>반려</button>
      </div>
    </div>
  );
}
