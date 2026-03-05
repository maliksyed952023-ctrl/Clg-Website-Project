# Government Polytechnic Chhatrapati Sambhajinagar
## Complete Website with Hero Slider & Directors Section

**COMPLETELY REDESIGNED FROM SCRATCH** - Simple, Clean, and Guaranteed to Work!

---

## ✨ What You Get

### **ONE Slider with 5 Slides:**
1. **Slide 1** → College1.jpg with information overlay
2. **Slide 2** → College2.jpg  
3. **Slide 3** → College3.jpg
4. **Slide 4** → College4.jpg
5. **Slide 5** → **ALL 4 DIRECTORS IN ONE VIEW** 

### **Key Features:**
- ✅ Auto-scrolls every 5 seconds through all slides
- ✅ Manual Previous/Next arrow buttons
- ✅ 5 clickable dots for direct navigation
- ✅ Pause when you hover over the slider
- ✅ Keyboard navigation (← → arrow keys)
- ✅ Fully responsive (desktop, tablet, mobile)
- ✅ Beautiful animations and transitions

### **Directors Display:**
- All 4 directors shown side-by-side on one slide
- Each director has: photo, numbered badge, name, position, department
- Cards have hover effects
- Flexbox layout ensures all 4 are always visible
- Responsive: 4 columns → 2 columns → 1 column (mobile)

---

## 📁 Folder Structure

```
your-project/
│
├── index.html              ← Main HTML file
├── styles.css              ← All styling
├── script.js               ← Slider functionality
│
└── images/                 ← CREATE THIS FOLDER
    ├── college1.jpg        ← Add your college images
    ├── college2.jpg
    ├── college3.jpg
    ├── college4.jpg
    ├── director1.jpg       ← Add your director photos
    ├── director2.jpg
    ├── director3.jpg
    └── director4.jpg
```

---

## 🚀 Setup Instructions

### Step 1: Download Files
Download these 3 files:
- `index.html`
- `styles.css`
- `script.js`

### Step 2: Create Images Folder
1. Create a folder named `images` in the same location as your HTML file
2. Place all 8 images inside this folder

### Step 3: Add Your Images

**College Images (any landscape photos):**
- `college1.jpg` - Main campus view
- `college2.jpg` - Building/architecture
- `college3.jpg` - Facilities/labs
- `college4.jpg` - Students/activities

**Director Photos (square/portrait photos):**
- `director1.jpg` - Shri B Venugopal Reddy, IAS
- `director2.jpg` - Dr. Vinod Mohitkar
- `director3.jpg` - Dr. K.B. Ladhane
- `director4.jpg` - Dr. A.M.Jinturkar

**Important:** 
- Use exact filenames (lowercase, .jpg extension)
- If you don't have all images yet, the layout will still work - missing images will show a gray circle placeholder

### Step 4: Open the Website
- Double-click `index.html`
- Or right-click → Open With → Your browser

---

## 🎨 Design Features

### Typography:
- **Libre Baskerville** - Elegant serif for headings
- **Source Sans Pro** - Clean sans-serif for body text

### Colors:
- **Primary:** Deep teal (#0f4c5c)
- **Accent:** Warm gold (#d4af37)
- **Clean white backgrounds for directors**

### Layout:
- **Directors:** Flexbox with 4 equal-width boxes
- **Guaranteed visibility:** All 4 directors will show on wide screens, wrapping nicely on smaller screens

---

## 🔧 Customization

### Change Auto-Scroll Speed
In `script.js`, line 7:
```javascript
const SLIDE_INTERVAL = 5000; // 5000 = 5 seconds
```
Change to:
- `3000` for 3 seconds
- `7000` for 7 seconds
- etc.

### Change Colors
In `styles.css`, lines 11-17:
```css
:root {
    --primary: #0f4c5c;        /* Main teal color */
    --gold: #d4af37;           /* Gold accent */
    /* ... etc ... */
}
```

---

## 📱 Responsive Breakpoints

- **Desktop (1200px+):** All 4 directors in one row
- **Tablet (900-1199px):** 2 directors per row (2x2 grid)
- **Mobile (<900px):** 1 director per row (stacked vertically)

---

## 🎯 Directors Information

The 5th slide displays all 4 directors:

### Director 1
- **Name:** Shri B Venugopal Reddy, IAS
- **Position:** Hon. Addl. Chief Secretary
- **Department:** Higher & Technical Education

### Director 2
- **Name:** Dr. Vinod Mohitkar
- **Position:** Hon. Director
- **Department:** Technical Education

### Director 3
- **Name:** Dr. K.B. Ladhane
- **Position:** I/c Joint Director
- **Department:** Regional Office, Chha. SambhajiNagar

### Director 4
- **Name:** Dr. A.M.Jinturkar
- **Position:** Principal
- **Department:** Government Polytechnic, Chha. SambhajiNagar

---

## 🔍 Troubleshooting

### Images Not Showing?
1. Check that the `images` folder is in the same location as `index.html`
2. Verify image filenames match exactly (case-sensitive)
3. Make sure files are `.jpg` format
4. Open browser console (F12) to see which images failed to load

### Slider Not Auto-Scrolling?
1. Check browser console for JavaScript errors
2. Make sure `script.js` is in the same folder as `index.html`
3. Try refreshing the page (Ctrl + F5)

### Only 1 or 2 Directors Visible?
1. This shouldn't happen with the new flexbox layout
2. Try zooming out in your browser (Ctrl + Mouse Wheel)
3. Check that all 4 `<div class="director-box">` are in the HTML

---

## ✅ Testing Checklist

- [ ] All 5 slides are accessible
- [ ] Auto-scroll works (changes every 5 seconds)
- [ ] Previous/Next buttons work
- [ ] All 5 dots are clickable
- [ ] Slider pauses when hovering
- [ ] All 4 directors visible on slide 5
- [ ] College info displays on slide 1
- [ ] Website looks good on mobile

---

## 💡 Pro Tips

1. **Image Sizes:**
   - College images: 1920x1080px recommended
   - Director photos: 500x500px minimum (square)

2. **Image Quality:**
   - Use compressed images for faster loading
   - Tools: TinyPNG, Squoosh.app

3. **Browser Testing:**
   - Test in Chrome, Firefox, Edge
   - Test on mobile device if possible

---

## 📞 Support

If something doesn't work:
1. Check the browser console (F12 → Console tab)
2. Verify all filenames are correct
3. Make sure you have all 3 files (HTML, CSS, JS) in the same folder
4. Ensure the `images` folder is in the right location

---

**Created:** January 2026  
**Version:** 2.0 - Complete Redesign  
**Status:** Production Ready ✅

All 4 directors will be visible side-by-side! 🎉
