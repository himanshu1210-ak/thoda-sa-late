# A little something for you ♡

Plain HTML, CSS and JavaScript. No build step, no dependencies.

## 1. Open it locally
Double-click `index.html`. Everything works that way, except the music button: browsers block the file check when opened as a file, so to test music run `python3 -m http.server` in this folder and visit http://localhost:8000.

## 2. Replace photos
Put your pictures in `assets/photos/` and use these names (or edit the `data-src` in `index.html`):
`hero.jpg` (opening), `soft.jpg` (before the almost-confession), `candid-01.jpg`, `candid-02.jpg`, `moment-01.jpg` to `moment-04.jpg` (gallery), `quiet.jpg` (quiet scene), `final.jpg` (last screen).
- Missing photos show a labelled placeholder, never a broken icon. Missing backgrounds fall back to the gradient.
- Adjust crop with `data-pos="50% 20%"` (x y). Lower y = shows more of the top (faces).
- Compress to about 1600px on the long side, under 400 KB each (squoosh.app).

## 3. Change the text
All text is in `index.html`, under the comments `<!-- ===== SCENE n ===== -->`. Edit captions in `figcaption`, sticky notes in Scene 10, cards in Scene 3. Swap the generic lines for your real inside jokes.

## 4. Music
Add a licensed or shareable MP3 as `assets/audio/song.mp3`. A "♪ music" button appears only if the file exists. It never autoplays. The path is in `CONFIG` at the top of `script.js`.

## 5. Test on a phone
Same Wi-Fi: run `python3 -m http.server`, find your computer's IP, open `http://YOUR-IP:8000` on the phone. Or just publish (below).

## 6. GitHub Pages
1. Create a repo, upload all files (keep the folder structure).
2. Settings → Pages → Branch `main` / root → Save.
3. Your link: `https://USERNAME.github.io/REPO/`.

## 7. Update later
Edit a file on GitHub (or re-upload), commit, wait about a minute, hard-refresh.
