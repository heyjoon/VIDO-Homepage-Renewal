"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "./AwardsApply.module.css";

type SubmitMethod = "vido" | "zip";

type Submission = {
  id: string;
  number: string;
  contestTitle: string;
  method: SubmitMethod;
  artworkTitle: string;
  applicantName: string;
  email: string;
  phone: string;
  statement: string;
  submittedAt: string;
  status: "접수완료";
};

const STORAGE_KEY = "vido.awards.submissions.v1";

const contests = [
  {
    id: "heritage-square",
    title: "K-Heritage Media Art Shinsegae Square Awards",
    period: "2026.06.15 - 08.07",
    status: "접수중",
  },
  {
    id: "creator-challenge",
    title: "VIDO Creator Challenge",
    period: "2026.05.01 - 05.31",
    status: "접수마감",
  },
];

const artworks = [
  { id: "signal-archive", title: "Signal Archive 01", detail: "READY · 4K video · 03:12" },
  { id: "urban-light", title: "Urban Light Study", detail: "READY · projection · 01:48" },
  { id: "data-field", title: "Data Field Draft", detail: "PROCESSING · preview rendering" },
];

function loadSubmissions(): Submission[] {
  if (typeof window === "undefined") {
    return [];
  }

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
  const [method, setMethod] = useState<SubmitMethod>("vido");
  const [artworkId, setArtworkId] = useState(artworks[0].id);
  const [fallbackFile, setFallbackFile] = useState("");
  const [applicantName, setApplicantName] = useState("VIDO Artist");
  const [email, setEmail] = useState("artist@vido.local");
  const [phone, setPhone] = useState("010-0000-0000");
  const [statement, setStatement] = useState("신세계 스퀘어 전광판 환경에 맞춰 도시의 빛과 움직임을 미디어아트로 재구성한 작품입니다.");
  const [agreeRules, setAgreeRules] = useState(false);
  const [agreeSubmit, setAgreeSubmit] = useState(false);
  const [error, setError] = useState("");
  const [receipt, setReceipt] = useState<Submission | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  useEffect(() => {
    setSubmissions(loadSubmissions());
  }, []);

  const selectedContest = useMemo(
    () => contests.find((contest) => contest.id === contestId) ?? contests[0],
    [contestId],
  );

  const selectedArtwork = useMemo(
    () => artworks.find((artwork) => artwork.id === artworkId) ?? artworks[0],
    [artworkId],
  );

  const canSubmit = selectedContest.status === "접수중";

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!canSubmit) {
      setError("접수중인 공모전만 제출할 수 있습니다.");
      return;
    }

    if (!applicantName.trim() || !email.trim() || !phone.trim()) {
      setError("신청자 이름, 이메일, 연락처를 모두 입력해주세요.");
      return;
    }

    if (method === "vido" && !selectedArtwork.detail.startsWith("READY")) {
      setError("VIDO 작품 제출은 READY 상태 작품만 가능합니다.");
      return;
    }

    if (method === "zip" && !fallbackFile) {
      setError("ZIP fallback 제출을 선택한 경우 작품 파일을 선택해주세요.");
      return;
    }

    if (statement.trim().length < 20) {
      setError("작품 설명은 20자 이상 입력해주세요.");
      return;
    }

    if (!agreeRules || !agreeSubmit) {
      setError("접수 유의사항과 제출 확인에 모두 동의해주세요.");
      return;
    }

    const now = new Date();
    const nextSubmission: Submission = {
      id: `${Date.now()}`,
      number: createSubmissionNumber(),
      contestTitle: selectedContest.title,
      method,
      artworkTitle: method === "vido" ? selectedArtwork.title : fallbackFile,
      applicantName: applicantName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      statement: statement.trim(),
      submittedAt: now.toLocaleString("ko-KR", { dateStyle: "medium", timeStyle: "short" }),
      status: "접수완료",
    };

    const nextSubmissions = [nextSubmission, ...submissions];
    saveSubmissions(nextSubmissions);
    setSubmissions(nextSubmissions);
    setReceipt(nextSubmission);
    setAgreeRules(false);
    setAgreeSubmit(false);
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

      <section className={styles.hero} aria-label="Contest application hero">
        <div className="container">
          <p className={styles.eyebrow}>Contest Application</p>
          <h1>접수하기를 누르면 실제 접수번호가 발급됩니다.</h1>
          <p>
            현재 버전은 백엔드 연결 전 프론트엔드 접수 MVP입니다. 입력 검증 후 접수내역을 브라우저에 저장하고,
            이후 API만 연결하면 같은 화면을 실제 운영 접수로 전환할 수 있습니다.
          </p>
        </div>
      </section>

      <section className={styles.body} aria-label="Application form">
        <div className="container">
          <div className={styles.layout}>
            <form className={styles.formPanel} onSubmit={handleSubmit}>
              <div className={styles.panelHead}>
                <div>
                  <p className={styles.eyebrow}>Step 1</p>
                  <h2>공모전 선택</h2>
                </div>
                <span className={canSubmit ? styles.openBadge : styles.closedBadge}>{selectedContest.status}</span>
              </div>

              <label className={styles.field}>
                <span>지원 공모전</span>
                <select value={contestId} onChange={(event) => setContestId(event.target.value)}>
                  {contests.map((contest) => (
                    <option value={contest.id} key={contest.id}>
                      {contest.title} · {contest.period}
                    </option>
                  ))}
                </select>
              </label>

              <div className={styles.methodGrid}>
                <button
                  className={method === "vido" ? styles.methodActive : styles.methodButton}
                  type="button"
                  onClick={() => setMethod("vido")}
                >
                  <strong>내 VIDO 작품 선택</strong>
                  <span>기본 제출 방식</span>
                </button>
                <button
                  className={method === "zip" ? styles.methodActive : styles.methodButton}
                  type="button"
                  onClick={() => setMethod("zip")}
                >
                  <strong>ZIP 직접 업로드</strong>
                  <span>보조 제출 방식</span>
                </button>
              </div>

              {method === "vido" ? (
                <div className={styles.artworkList}>
                  {artworks.map((artwork) => (
                    <label className={styles.artworkCard} key={artwork.id}>
                      <div>
                        <strong>{artwork.title}</strong>
                        <span>{artwork.detail}</span>
                      </div>
                      <input
                        checked={artworkId === artwork.id}
                        name="artwork"
                        onChange={() => setArtworkId(artwork.id)}
                        type="radio"
                      />
                    </label>
                  ))}
                </div>
              ) : (
                <label className={styles.field}>
                  <span>작품 파일</span>
                  <input
                    accept=".zip,.mp4,.mov,.jpg,.png"
                    onChange={(event) => setFallbackFile(event.target.files?.[0]?.name ?? "")}
                    type="file"
                  />
                </label>
              )}

              <div className={styles.twoCol}>
                <label className={styles.field}>
                  <span>신청자 이름</span>
                  <input value={applicantName} onChange={(event) => setApplicantName(event.target.value)} />
                </label>
                <label className={styles.field}>
                  <span>연락처</span>
                  <input value={phone} onChange={(event) => setPhone(event.target.value)} />
                </label>
              </div>

              <label className={styles.field}>
                <span>이메일</span>
                <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
              </label>

              <label className={styles.field}>
                <span>작품 설명</span>
                <textarea value={statement} onChange={(event) => setStatement(event.target.value)} rows={5} />
              </label>

              <label className={styles.checkRow}>
                <input checked={agreeRules} onChange={(event) => setAgreeRules(event.target.checked)} type="checkbox" />
                <span>공모전 유의사항, 저작권, 심사 기준을 확인했습니다.</span>
              </label>
              <label className={styles.checkRow}>
                <input checked={agreeSubmit} onChange={(event) => setAgreeSubmit(event.target.checked)} type="checkbox" />
                <span>선택한 작품과 신청자 정보로 접수하는 것에 동의합니다.</span>
              </label>

              {error ? <p className={styles.error}>{error}</p> : null}

              <div className={styles.actionRow}>
                <button className={styles.primaryButton} type="submit">
                  접수 완료하기
                </button>
                <button className={styles.secondaryButton} type="button" onClick={resetDemoSubmissions}>
                  접수내역 초기화
                </button>
              </div>
            </form>

            <aside className={styles.sidePanel} aria-label="Receipt and submission history">
              <div className={styles.receiptBox}>
                <p className={styles.eyebrow}>Receipt</p>
                {receipt ? (
                  <div>
                    <h2>접수완료</h2>
                    <dl className={styles.receiptList}>
                      <div><dt>접수번호</dt><dd>{receipt.number}</dd></div>
                      <div><dt>공모전</dt><dd>{receipt.contestTitle}</dd></div>
                      <div><dt>작품</dt><dd>{receipt.artworkTitle}</dd></div>
                      <div><dt>접수일시</dt><dd>{receipt.submittedAt}</dd></div>
                    </dl>
                  </div>
                ) : (
                  <div>
                    <h2>아직 접수 전입니다.</h2>
                    <p>필수 정보를 입력하고 접수 완료하기를 누르면 접수번호가 발급됩니다.</p>
                  </div>
                )}
              </div>

              <div className={styles.historyBox}>
                <div className={styles.historyHead}>
                  <p className={styles.eyebrow}>내 접수 내역</p>
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
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
