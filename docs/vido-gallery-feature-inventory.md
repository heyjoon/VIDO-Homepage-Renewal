# VIDO.gallery Feature Inventory

Source URLs checked:

- `https://vido.gallery/`
- `https://vido.gallery/vido-gallery`
- `https://vido.gallery/media-art`
- `https://vido.gallery/collector`
- `https://vido.gallery/FaQ`

The live site is a SPA. The current bundle exposes these major surfaces and capabilities that the renewal must preserve in the full mock and later production rebuild.

## Public / Landing

- Home
- About
- VIDO Gallery introduction
- Media Art OTT positioning
- FAQ
- Report / contact style surface
- Instagram / YouTube links
- Analytics and marketing tags in production site

## VIDO Gallery

- `/vido-gallery`
- `/vido-gallery-before`
- gallery hero / introduction
- gallery process section
- gallery spaces / partner gallery visuals
- exhibition collection path

## Media Art

- `/media-art`
- `/media-art/total/:orderId/:id`
- `/media-art/tag`
- `/media-art/search/:searchId/:id`
- `/search/:searchId/:authorId/:artId`
- `media-art/detail/:id`
- artwork list
- artwork detail
- search
- tag/category filtering
- sort by new/top
- editor pick
- top 10
- similar works
- same artist works
- views, likes, downloads
- video preview/playback
- downloadable file/report paths

## Exhibition / Edition

- `/video-gallery/exhibition`
- `/video-gallery/exhibition/detail/:id`
- `/video-gallery/exhibition/detail_before/:id`
- `/edition/detail/:id`
- exhibition detail
- participating artists
- exhibition period/location/organizer/curator
- work list
- edition list
- site photos
- lightbox preview

## Artist / Author

- `/author`
- `/author/:orderId/:id`
- `/author/detail/:id`
- artist list
- artist detail
- artist profile image
- artist-owned media art list

## Subscription / Collector

- `/subscription`
- `/collector`
- subscription introduction
- collector gallery
- subscribed client state
- collection/collect gallery concepts

## Account

- `/login`
- `/login/find-id`
- `/login/find-pw`
- `/login/found-id`
- `/login/found-pw`
- `/signup`
- `/signup/terms-and-conditions-pers`
- `/signup/terms-and-conditions-comp`
- `/signup/infoRegister`
- `/signup/registerDone`
- login state
- find ID/password
- personal/company terms
- registration completion

## My Page

- `/myPage/`
- `/myPage/myart`
- `/myPage/myart/crop/:id`
- `/myPage/DashBoard`
- `/myPage/Payment`
- uploaded artworks
- crop/preview flow
- dashboard stats
- payment history
- upload/download/view charts

## Upload / Asset Handling

- upload button
- upload progress
- preview/crop path
- media file information
- thumbnail/video path
- download path
- PDF/report utilities in bundle

## Renewal Mock Coverage Rule

The full mock should include at least one visible state for every feature group above. New contest and admin functionality should be added on top of these VIDO.gallery capabilities rather than replacing them.
