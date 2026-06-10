"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import styles from "./HomeBridge.module.css";

const readyArtworks = [
  { title: "Signal Archive 01", meta: "READY · 4K video · 03:12", tone: "one" },
  { title: "Urban Light Study", meta: "READY · projection · 01:48", tone: "two" },
];

export default function HomeBridge() {
  const [hasArtworks, setHasArtworks] = useState(true);
  const status = useMemo(
    () => ({
      label: hasArtworks ? "READY" : "EMPTY",
      title: hasArtworks ? "제출 가능한 내 작품 2개" : "아직 제출 가능한 작품이 없습니다",
      body: hasArtworks
        ? "업로드 완료 작품을 공모전에 바로 제출할 수 있습니다."
        : "먼저 VIDO에 작품을 올리면 공모전 접수 단계에서 다시 업로드하지 않고 선택할 수 있습니다.",
    }),
    [hasArtworks],
  );

  return (
    <section className="band bridge" aria-label="Upload to contest bridge">
      <div className="container">
        <div className="section-head">
          <h2>작품을 올리면, 공모전 제출이 쉬워집니다.</h2>
          <p>
            VIDO에 업로드한 미디어아트는 내 작품으로 저장됩니다. 공모전 접수
            단계에서 파일을 다시 찾거나 압축해 올릴 필요 없이, 저장된 작품을
            선택해 바로 제출할 수 있습니다.
          </p>
        </div>

        <div className={styles.bridgeTools} aria-label="Preview user artwork state">
          <span>홈페이지 상태 미리보기</span>
          <div className={styles.segmented} role="group" aria-label="Artwork state preview">
            <button
              className={hasArtworks ? styles.active : ""}
              type="button"
              onClick={() => setHasArtworks(true)}
            >
              작품 있음
            </button>
            <button
              className={!hasArtworks ? styles.active : ""}
              type="button"
              onClick={() => setHasArtworks(false)}
            >
              작품 없음
            </button>
          </div>
        </div>

        <div className="bridge-layout">
          <div className="panel">
            <div className="panel-head">
              <strong>내 VIDO 상태</strong>
              <span className={hasArtworks ? "badge" : `badge ${styles.mutedBadge}`}>{status.label}</span>
            </div>
            <div className="panel-body">
              <div className={hasArtworks ? "status-card" : `status-card ${styles.emptyState}`}>
                <div>
                  <strong>{status.title}</strong>
                  <span>{status.body}</span>
                </div>
                <span className={hasArtworks ? "badge" : `badge ${styles.mutedBadge}`}>{status.label}</span>
              </div>

              {hasArtworks ? (
                <Link className={`status-card ${styles.actionCard}`} href="/awards">
                  <div>
                    <strong>진행중 공모전 4개</strong>
                    <span>조건에 맞는 공모전을 홈에서 바로 탐색합니다.</span>
                  </div>
                  <span className="badge blue">OPEN</span>
                </Link>
              ) : (
                <Link className={`status-card ${styles.actionCard}`} href="/artworks/upload">
                  <div>
                    <strong>작품 업로드부터 시작</strong>
                    <span>업로드가 완료되면 이 영역에 제출 가능한 작품이 표시됩니다.</span>
                  </div>
                  <span className="badge blue">UPLOAD</span>
                </Link>
              )}
            </div>
          </div>

          <div className="panel">
            <div className="panel-head">
              <strong>내 VIDO 작품</strong>
              <span className={hasArtworks ? "badge" : `badge ${styles.mutedBadge}`}>
                {hasArtworks ? "공모전 제출 가능" : "업로드 필요"}
              </span>
            </div>
            <div className="panel-body">
              {hasArtworks ? (
                <div className="artwork-grid">
                  {readyArtworks.map((artwork) => (
                    <article className="artwork" key={artwork.title}>
                      <div className={`thumb ${artwork.tone}`} aria-hidden="true" />
                      <div className="artwork-content">
                        <strong>{artwork.title}</strong>
                        <span>{artwork.meta}</span>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className={styles.emptyPanel}>
                  <strong>보관함이 비어 있습니다.</strong>
                  <span>작품을 업로드하면 이곳에서 READY 상태와 공모전 제출 가능 여부를 확인합니다.</span>
                  <Link className="btn dark" href="/artworks/upload">
                    작품 업로드하기
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
