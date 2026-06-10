# VIDO Redesign Design System

## Tone

VIDO should feel like a serious, contemporary media-art platform.

Keywords:

- precise
- editorial
- gallery-grade
- technical but approachable
- artist-centered
- operationally clear for admins

## Color

Base:

- black: `#101010`
- white: `#ffffff`
- surface: `#f6f6f6`
- line: `#dedede`
- muted text: `#64666a`

Accents:

- green: `#00c58e`
- blue: `#3978ff`
- pink: `#ff4f7b`
- yellow: `#e7c84e`

Use accents as status or media signals, not as full-page gradients.

## Layout

Public pages:

- strong first viewport signal
- media-forward hero
- clear upload CTA
- visible next section hint
- no nested cards
- no generic split hero card layout

User/Admin pages:

- dense but readable dashboards
- clear tables and filters
- stable dimensions for cards and controls
- status chips for processing/review states
- predictable side navigation where needed

## Components

Required component families:

- Button
- StatusBadge
- ArtworkCard
- ContestCard
- ArtworkPicker
- DashboardStat
- DataTable
- FilterBar
- EmptyState
- ReviewPanel
- UploadProgress

## CTA Copy

Prefer concrete verbs:

- 작품 업로드하기
- 진행중 공모전 보기
- 내 작품으로 접수하기
- 접수 내역 확인
- 작품 관리

Avoid vague copy:

- 자세히 보기 without context
- 시작하기 without telling what starts
- 더 알아보기 as primary CTA

## Responsive Rules

- Do not scale font size directly with viewport width.
- Keep fixed-format controls stable with explicit dimensions.
- Ensure button text wraps or stays readable on mobile.
- Avoid overlapping UI elements.
- Tables should become cards or horizontally scroll with clear affordance on small screens.
