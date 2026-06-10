"use client";

export type UserRole = "artist" | "admin";
export type ArtworkStatus = "READY" | "PROCESSING" | "REJECTED";
export type ContestStatus = "OPEN" | "CLOSED" | "SCHEDULED";
export type SubmissionStatus = "DRAFT" | "UNDER_REVIEW" | "APPROVED" | "REJECTED";

export interface MockUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface MockSession {
  userId: string;
  role: UserRole;
}

export interface MockArtwork {
  id: string;
  ownerId: string;
  title: string;
  status: ArtworkStatus;
  detail: string;
  tone: "one" | "two" | "three";
}

export interface MockContest {
  id: string;
  title: string;
  status: ContestStatus;
  deadline: string;
  fit: string;
  description: string;
}

export interface MockSubmission {
  id: string;
  number: string;
  contestId: string;
  artworkId: string;
  userId: string;
  status: SubmissionStatus;
  submittedAt: string;
  reviewedAt?: string;
}

export interface MockActivity {
  id: string;
  userId: string;
  text: string;
  at: string;
}

export interface MockState {
  session: MockSession | null;
  users: MockUser[];
  artworks: MockArtwork[];
  contests: MockContest[];
  submissions: MockSubmission[];
  activities: MockActivity[];
}

const STORAGE_KEY = "vido.fullMock.v1";

export const initialState: MockState = {
  session: null,
  users: [
    { id: "user-artist", name: "VIDO Artist", email: "artist@vido.local", role: "artist" },
    { id: "user-admin", name: "VIDO Admin", email: "admin@vido.local", role: "admin" },
  ],
  artworks: [
    {
      id: "art-signal",
      ownerId: "user-artist",
      title: "Signal Archive 01",
      status: "READY",
      detail: "4K video · 03:12",
      tone: "one",
    },
    {
      id: "art-urban",
      ownerId: "user-artist",
      title: "Urban Light Study",
      status: "READY",
      detail: "projection · 01:48",
      tone: "two",
    },
    {
      id: "art-data",
      ownerId: "user-artist",
      title: "Data Field Draft",
      status: "PROCESSING",
      detail: "rendering preview",
      tone: "three",
    },
  ],
  contests: [
    {
      id: "contest-vido-2026",
      title: "VIDO Media Art Awards 2026",
      status: "OPEN",
      deadline: "D-18",
      fit: "내 작품 2개 적합",
      description: "업로드 완료된 미디어아트 작품으로 바로 지원할 수 있습니다.",
    },
    {
      id: "contest-remix",
      title: "Archive Remix Open Call",
      status: "OPEN",
      deadline: "D-31",
      fit: "내 작품 1개 적합",
      description: "READY 상태의 VIDO 작품을 선택해 제출할 수 있습니다.",
    },
    {
      id: "contest-public-screen",
      title: "Public Screen Program",
      status: "OPEN",
      deadline: "D-5",
      fit: "규격 확인 필요",
      description: "공공 스크린 상영을 위한 미디어아트 공모전입니다.",
    },
  ],
  submissions: [
    {
      id: "sub-0018",
      number: "VIDO-2026-0018",
      contestId: "contest-vido-2026",
      artworkId: "art-signal",
      userId: "user-artist",
      status: "APPROVED",
      submittedAt: "2026-06-01 14:20",
      reviewedAt: "2026-06-03 10:15",
    },
    {
      id: "sub-0021",
      number: "VIDO-2026-0021",
      contestId: "contest-remix",
      artworkId: "art-urban",
      userId: "user-artist",
      status: "UNDER_REVIEW",
      submittedAt: "2026-06-08 09:42",
    },
  ],
  activities: [
    { id: "act-1", userId: "user-artist", text: "Signal Archive 01 작품이 승인되었습니다.", at: "2026-06-03 10:15" },
    { id: "act-2", userId: "user-artist", text: "Archive Remix Open Call 접수가 심사중입니다.", at: "2026-06-08 09:42" },
  ],
};

function cloneInitialState(): MockState {
  return JSON.parse(JSON.stringify(initialState)) as MockState;
}

export function loadMockState(): MockState {
  if (typeof window === "undefined") {
    return cloneInitialState();
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    const seeded = cloneInitialState();
    saveMockState(seeded);
    return seeded;
  }

  try {
    return { ...cloneInitialState(), ...(JSON.parse(raw) as MockState) };
  } catch {
    const seeded = cloneInitialState();
    saveMockState(seeded);
    return seeded;
  }
}

export function saveMockState(state: MockState): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function resetMockState(): MockState {
  const seeded = cloneInitialState();
  saveMockState(seeded);
  return seeded;
}

export function loginAs(role: UserRole): MockState {
  const state = loadMockState();
  const user = state.users.find((candidate) => candidate.role === role);

  if (!user) {
    throw new Error(`No mock user for role ${role}`);
  }

  const next = { ...state, session: { userId: user.id, role: user.role } };
  saveMockState(next);
  return next;
}

export function logout(): MockState {
  const state = loadMockState();
  const next = { ...state, session: null };
  saveMockState(next);
  return next;
}

export function getCurrentUser(state: MockState): MockUser | null {
  if (!state.session) {
    return null;
  }

  return state.users.find((user) => user.id === state.session?.userId) ?? null;
}

export function getArtwork(state: MockState, artworkId: string): MockArtwork | undefined {
  return state.artworks.find((artwork) => artwork.id === artworkId);
}

export function getContest(state: MockState, contestId: string): MockContest | undefined {
  return state.contests.find((contest) => contest.id === contestId);
}

export function createSubmission(contestId: string, artworkId: string): MockState {
  const state = loadMockState();
  const user = getCurrentUser(state);

  if (!user || user.role !== "artist") {
    throw new Error("Artist login is required.");
  }

  const artwork = getArtwork(state, artworkId);
  const contest = getContest(state, contestId);

  if (!artwork || artwork.ownerId !== user.id || artwork.status !== "READY") {
    throw new Error("Only READY artworks owned by the current artist can be submitted.");
  }

  if (!contest || contest.status !== "OPEN") {
    throw new Error("Contest is not open.");
  }

  const sequence = state.submissions.length + 19;
  const now = new Date();
  const submittedAt = now.toISOString().slice(0, 16).replace("T", " ");
  const submission: MockSubmission = {
    id: `sub-${Date.now()}`,
    number: `VIDO-2026-${String(sequence).padStart(4, "0")}`,
    contestId,
    artworkId,
    userId: user.id,
    status: "UNDER_REVIEW",
    submittedAt,
  };

  const next: MockState = {
    ...state,
    submissions: [submission, ...state.submissions],
    activities: [
      { id: `act-${Date.now()}`, userId: user.id, text: `${contest.title}에 ${artwork.title} 작품을 제출했습니다.`, at: submittedAt },
      ...state.activities,
    ],
  };

  saveMockState(next);
  return next;
}

export function reviewSubmission(submissionId: string, status: Extract<SubmissionStatus, "APPROVED" | "REJECTED">): MockState {
  const state = loadMockState();
  const now = new Date().toISOString().slice(0, 16).replace("T", " ");
  const target = state.submissions.find((submission) => submission.id === submissionId);

  if (!target) {
    return state;
  }

  const contest = getContest(state, target.contestId);
  const artwork = getArtwork(state, target.artworkId);
  const next: MockState = {
    ...state,
    submissions: state.submissions.map((submission) =>
      submission.id === submissionId ? { ...submission, status, reviewedAt: now } : submission,
    ),
    activities: [
      {
        id: `act-${Date.now()}`,
        userId: target.userId,
        text: `${contest?.title ?? "공모전"} 접수가 ${status === "APPROVED" ? "승인" : "반려"}되었습니다. (${artwork?.title ?? "작품"})`,
        at: now,
      },
      ...state.activities,
    ],
  };

  saveMockState(next);
  return next;
}

export function reviewArtwork(artworkId: string, status: ArtworkStatus): MockState {
  const state = loadMockState();
  const artwork = getArtwork(state, artworkId);

  if (!artwork) {
    return state;
  }

  const now = new Date().toISOString().slice(0, 16).replace("T", " ");
  const next: MockState = {
    ...state,
    artworks: state.artworks.map((candidate) => (candidate.id === artworkId ? { ...candidate, status } : candidate)),
    activities: [
      { id: `act-${Date.now()}`, userId: artwork.ownerId, text: `${artwork.title} 작품 상태가 ${status}(으)로 변경되었습니다.`, at: now },
      ...state.activities,
    ],
  };

  saveMockState(next);
  return next;
}
