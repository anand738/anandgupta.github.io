# Anand Gupta Portfolio

## Folder Structure
```
portfolio/
├── index.html       ← Main portfolio page
├── css/
│   └── style.css    ← All styles & animations
├── js/
│   └── main.js      ← All interactions & scroll FX
├── assets/          ← Add your photo here
└── README.md        ← This file
```

## Deploy to GitHub Pages
1. Push all files to `anand738.github.io` repo root
2. Enable GitHub Pages in Settings → Pages
3. Live at: https://anand738.github.io

## Add Your Photo
Drop `photo.jpg` in `assets/` folder, then in index.html replace avatar-placeholder with:
`<img src="assets/photo.jpg" class="avatar-img" alt="Anand Gupta">`

And add to style.css: `.avatar-img { width:200px; height:200px; border-radius:20px; object-fit:cover; }`

## Features
- Custom cursor + hover effects
- Animated page loader
- Typewriter role animation
- Scroll-triggered counter animations
- Skill bar animations on scroll
- Active nav link tracking
- Mobile responsive
- No dependencies — pure HTML/CSS/JS

## Real Email Form
Sign up at formspree.io, then update the form tag:
`<form action="https://formspree.io/f/YOUR_ID" method="POST">`
