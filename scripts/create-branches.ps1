# Run this after the first commit exists on main.

git checkout main
git pull origin main

git checkout -b codex/awards-contests
git push -u origin codex/awards-contests

git checkout main
git checkout -b codex/user-mypage
git push -u origin codex/user-mypage

git checkout main
git checkout -b codex/integration-awards-mypage
git push -u origin codex/integration-awards-mypage

git checkout main
git checkout -b redesign/agent-foundation
git push -u origin redesign/agent-foundation

git checkout main
