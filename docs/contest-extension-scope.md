# VIDO Contest Extension Scope

## Decision

Build a contest module on top of the existing VIDO.gallery product. Do not rebuild every VIDO.gallery page in this branch.

## Source References

- Existing product base: `https://vido.gallery/`
- Existing gallery route: `https://vido.gallery/vido-gallery`
- Existing media-art route: `https://vido.gallery/media-art`
- Existing collector route: `https://vido.gallery/collector`
- Existing FAQ route: `https://vido.gallery/FaQ`
- Contest module reference: `https://html.justbuild.kr/vido/`

## What This Branch Adds

- Contest home at `/awards`
- Contest list cards
- Featured contest block
- Notice and FAQ blocks
- CTA into `/awards/apply`
- Copy that explains existing VIDO artworks are the primary submission source

## Integration Principle

The main VIDO.gallery value remains artwork upload, media-art browsing, collector/subscription, FAQ, and My Page. The contest module should reuse that foundation:

1. User uploads and manages media art in VIDO.
2. User discovers open contests in the new Awards module.
3. User applies by selecting an existing READY artwork.
4. User can use direct ZIP upload only as a fallback.
5. User checks submission history from My Page.

## Not In This Branch

- Full VIDO.gallery rebuild
- Full login/signup implementation
- Real admin CRUD
- Real contest submission backend
- Real upload pipeline
- Payment/subscription backend

## Later Branches

- `codex/awards-contests`: contest data model, application API, submission status, admin review API
- `codex/user-mypage`: user dashboard, artwork library integration, submission history
- `redesign/admin-foundation`: admin permissions, contest CRUD, submission review UI
