"use client";

import Link from "next/link";
import type { FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import styles from "./AwardsApply.module.css";

type ArtworkStatus = "READY" | "PROCESSING";

type Artwork = {
  id: string;
  title: string;
  detail: string;
  status: ArtworkStatus;
  duration: string;
  resolution: string;
  tone: "toneA" | "toneB" | "toneC" | "toneD";
};

type Submission = {
  id: string;
  number: string;
  contestTitle: string;
  artworkTitle: string;
  applicantName: string;
  email: string;
  phone: string;
  statement: string;
  submittedAt: string;
  status: "접수완료";
};

const STORAGE_KEY = "vido.awards.submissions.v1";
const INITIAL_VISIBLE_COUNT = 12;

const contests = [
  { id: "heritage-square", title: "K-Heritage Media Art Shinsegae Square Awards", period: "2026.06.15 - 08.07", status: "접수중" },
  { id: "creator-challenge", title: "VIDO Creator Challenge", period: "2026.05.01 - 05.31", status: "접수마감" },
];

const artworks: Artwork[] = Array.from({ length: 30 }, (_, index) => {
  const titles = ["Signal Archive", "Urban Light Study", "Heritage Wave", "Digital Gate", "City Pulse", "Memory Facade"];
  const status: ArtworkStatus = index % 7 === 3 ? "PROCESSING" : "READY";
  const tone = ["toneA", "toneB", "toneC", "toneD"][index % 4] as Artwork["tone"];
  const sequence = String(index + 1).padStart(2, "0");

  return {
    id: `artwork-${sequence}`,
    title: `${titles[index % titles.length]} ${sequence}`,
    detail: `${status} · media art · ${index % 2 ? "projection" : "4K video"}`,
    status,
    duration: `0${(index % 4) + 1}:${String(18 + index).padStart(2, "0")}`,
    resolution: index % 3 === 0 ? "3840 x 2160" : "1920 x 1080",
    tone,
  };
});

function loadSubmissions(): Submission[] {
  if (typeof window === "undefined") return [];

  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]") as Submission[];
  } catch {
    return [];
  }
}

function saveSubmissions(submissions: Submission[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
}

function createSubmissionNumber() {
  const stamp = new Date().toISOString().replace(/[-:TZ.]/g, "").slice(0, 12);
  return `VIDO-${stamp}`;
}

export default function AwardsApplyPage() {
  const [contestId, setContestId] = useState(contests[0].id);
  const [artworkId, setArtworkId] = useState(artworks[0].id);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | ArtworkStatus>("READY");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);
  const [applicantName, setApplicantName] = useState("VIDO Artist");
  const [email, setEmail] = useState("artist@vido.local");
  const [phone, setPhone] = useState("010-0000-0000");
  const [statement, setStatement] = useState("신세계 스퀘어 전광판 환경에 맞춰 도시의 빛과 움직임을 미디어아트로 재구성한 작품입니다.");
  const [agreeRules, setAgreeRules] = useState(false);
  const [agreeSubmit, setAgreeSubmit] = useState(false);
  const [error, setError] = useState("");
  const [receipt, setReceipt] = useState<Submission | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  useEffect(() => setSubmissions(loadSubmissions()), []);
  useEffect(() => setVisibleCount(INITIAL_VISIBLE_COUNT), [query, statusFilter]);

  const selectedContest = useMemo(() => contests.find((contest) => contest.id === contestId) ?? contests[0], [contestId]);
  const selectedArtwork = useMemo(() => artworks.find((artwork) => artwork.id === artworkId) ?? artworks[0], [artworkId]);
  const canSubmit = selectedContest.status === "접수중";
  const readyCount = artworks.filter((artwork) => artwork.status === "READY").length;

  const filteredArtworks = useMemo(() => {
    const keyword = query.trim().toLowerCase();

    return artworks.filter((artwork) => {
      const matchesStatus = statusFilter === "all" || artwork.status === statusFilter;
      const matchesKeyword = !keyword || artwork.title.toLowerCase().includes(keyword) || artwork.detail.toLowerCase().includes(keyword);
      return matchesStatus && matchesKeyword;
    });
  }, [query, statusFilter]);

  const visibleArtworks = filteredArtworks.slice(0, visibleCount);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!canSubmit) return setError("접수중인 공모전만 제출할 수 있습니다.");
    if (!applicantName.trim() || !email.trim() || !phone.trim()) return setError("신청자 이름, 이메일, 연락처를 모두 입력해주세요.");
    if (selectedArtwork.status !== "READY") return setError("공모전 접수는 VIDO에 업로드되어 READY 상태인 작품만 가능합니다.");
    if (statement.trim().length < 20) return setError("작품 설명은 20자 이상 입력해주세요.");
    if (!agreeRules || !agreeSubmit) return setError("접수 유의사항과 제출 확인에 모두 동의해주세요.");

    const nextSubmission: Submission = {
      id: `${Date.now()}`,
      number: createSubmissionNumber(),
      contestTitle: selectedContest.title,
      artworkTitle: selectedArtwork.title,
      applicantName: applicantName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      statement: statement.trim(),
      submittedAt: new Date().toLocaleString("ko-KR", { dateStyle: "medium", timeStyle: "short" }),
      status: "접수완료",
    };

    const nextSubmissions = [nextSubmission, ...submissions];
    saveSubmissions(nextSubmissions);
    setSubmissions(nextSubmissions);
    setReceipt(nextSubmission);
    setAgreeRules(false);
    setAgreeSubmit(false);
    window.requestAnimationFrame(() => document.getElementById("my-submissions")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }

  function resetDemoSubmissions() {
    saveSubmissions([]);
    setSubmissions([]);
    setReceipt(null);
  }

  return (
    <main className={styles.page}>
      <header className="topbar">
        <Link className="brand" href="/" aria-label="VIDO home">
          <span className="mark" aria-hidden="true"><span /><span /><span /><span /></span>
          <span>VIDO Apply</span>
        </Link>
        <nav className="nav" aria-label="Apply navigation">
          <Link href="/awards">Awards</Link>
          <Link href="#my-submissions">My Submissions</Link>
          <Link href="/artworks/upload">Upload</Link>
        </nav>
      </header>

      <section className={styles.hero} aria-label="Contest application hero">
        <div className="container">
          <p className={styles.eyebrow}>Contest Application</p>
          <h1>접수는 내 VIDO 작품 선택으로만 진행합니다.</h1>
          <p>작품 파일을 따로 ZIP으로 받지 않습니다. VIDO.gallery에 업로드되어 READY 상태가 된 작품만 공모전에 접수할 수 있습니다.</p>
        </div>
      </section>

      <section className={styles.body} aria-label="Application form">
        <div className="container">
          <div className={styles.layout}>
            <form className={styles.formPanel} onSubmit={handleSubmit}>
              <div className={styles.panelHead}>
                <div><p className={styles.eyebrow}>Step 1</p><h2>공모전 선택</h2></div>
                <span className={canSubmit ? styles.openBadge : styles.closedBadge}>{selectedContest.status}</span>
              </div>

              <label className={styles.field}>
                <span>지원 공모전</span>
                <select value={contestId} onChange={(event) => setContestId(event.target.value)}>
                  {contests.map((contest) => <option value={contest.id} key={contest.id}>{contest.title} · {contest.period}</option>)}
                </select>
              </label>

              <section className={styles.artworkPicker} aria-label="VIDO artwork picker">
                <div className={styles.pickerHead}>
                  <div><p className={styles.eyebrow}>Step 2</p><h2>내 VIDO 작품 선택</h2><p>총 {artworks.length}개 작품 중 READY {readyCount}개를 접수에 사용할 수 있습니다.</p></div>
                  <Link className={styles.uploadLink} href="/artworks/upload">새 작품 업로드</Link>
                </div>

                <div className={styles.pickerTools}>
                  <input aria-label="작품 검색" placeholder="작품명, 형식 검색" value={query} onChange={(event) => setQuery(event.target.value)} />
                  <select aria-label="작품 상태 필터" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as "all" | ArtworkStatus)}>
                    <option value="READY">READY 작품만</option>
                    <option value="all">전체 작품</option>
                    <option value="PROCESSING">PROCESSING</option>
                  </select>
                </div>

                <div className={styles.selectedPreview}>
                  <div className={`${styles.previewImage} ${styles[selectedArtwork.tone]}`} aria-hidden="true" />
                  <div><span className={selectedArtwork.status === "READY" ? styles.openBadge : styles.closedBadge}>{selectedArtwork.status}</span><h3>{selectedArtwork.title}</h3><p>{selectedArtwork.resolution} · {selectedArtwork.duration} · {selectedArtwork.detail}</p></div>
                </div>

                <div className={styles.artworkGrid}>
                  {visibleArtworks.map((artwork) => (
                    <button className={artworkId === artwork.id ? styles.artworkCardActive : styles.artworkCard} key={artwork.id} type="button" onClick={() => setArtworkId(artwork.id)}>
                      <span className={`${styles.artworkThumb} ${styles[artwork.tone]}`} aria-hidden="true" />
                      <span className={styles.artworkMeta}><strong>{artwork.title}</strong><span>{artwork.detail}</span></span>
                      <span className={artwork.status === "READY" ? styles.readyDot : styles.processingDot}>{artwork.status}</span>
                    </button>
                  ))}
                </div>

                {visibleCount < filteredArtworks.length ? <button className={styles.moreButton} type="button" onClick={() => setVisibleCount((count) => count + 12)}>작품 더보기 ({visibleCount}/{filteredArtworks.length})</button> : null}
              </section>

              <div className={styles.twoCol}>
                <label className={styles.field}><span>신청자 이름</span><input value={applicantName} onChange={(event) => setApplicantName(event.target.value)} /></label>
                <label className={styles.field}><span>연락처</span><input value={phone} onChange={(event) => setPhone(event.target.value)} /></label>
              </div>
              <label className={styles.field}><span>이메일</span><input type="email" value={email} onChange={(event) => setEmail(event.target.value)} /></label>
              <label className={styles.field}><span>작품 설명</span><textarea value={statement} onChange={(event) => setStatement(event.target.value)} rows={5} /></label>
              <label className={styles.checkRow}><input checked={agreeRules} onChange={(event) => setAgreeRules(event.target.checked)} type="checkbox" /><span>공모전 유의사항, 저작권, 심사 기준을 확인했습니다.</span></label>
              <label className={styles.checkRow}><input checked={agreeSubmit} onChange={(event) => setAgreeSubmit(event.target.checked)} type="checkbox" /><span>선택한 VIDO 작품과 신청자 정보로 접수하는 것에 동의합니다.</span></label>
              {error ? <p className={styles.error}>{error}</p> : null}
              <div className={styles.actionRow}><button className={styles.primaryButton} type="submit">선택한 작품으로 접수 완료</button><button className={styles.secondaryButton} type="button" onClick={resetDemoSubmissions}>접수내역 초기화</button></div>
            </form>

            <aside className={styles.sidePanel} aria-label="Receipt and submission history">
              <div className={styles.receiptBox}>
                <p className={styles.eyebrow}>Receipt</p>
                {receipt ? <div><h2>접수완료</h2><dl className={styles.receiptList}><div><dt>접수번호</dt><dd>{receipt.number}</dd></div><div><dt>공모전</dt><dd>{receipt.contestTitle}</dd></div><div><dt>작품</dt><dd>{receipt.artworkTitle}</dd></div><div><dt>접수일시</dt><dd>{receipt.submittedAt}</dd></div></dl></div> : <div><h2>아직 접수 전입니다.</h2><p>READY 상태의 VIDO 작품을 선택하고 접수 완료를 누르면 접수번호가 발급됩니다.</p></div>}
              </div>
              <SubmissionHistory submissions={submissions} compact />
            </aside>
          </div>
        </div>
      </section>

      <section id="my-submissions" className={styles.body} aria-label="My submissions">
        <div className="container">
          <SubmissionHistory submissions={submissions} />
        </div>
      </section>
    </main>
  );
}

function SubmissionHistory({ submissions, compact = false }: { submissions: Submission[]; compact?: boolean }) {
  return (
    <div className={styles.historyBox}>
      <div className={styles.historyHead}>
        <p className={styles.eyebrow}>{compact ? "내 접수 내역" : "My Submissions"}</p>
        <span>{submissions.length}건</span>
      </div>
      {submissions.length ? (
        submissions.map((submission) => (
          <article className={styles.historyItem} key={submission.id}>
            <strong>{submission.number}</strong>
            <span>{submission.contestTitle}</span>
            <span>{submission.artworkTitle} · {submission.status}</span>
          </article>
        ))
      ) : (
        <p className={styles.emptyText}>저장된 접수 내역이 없습니다.</p>
      )}
    </div>
  );
}
