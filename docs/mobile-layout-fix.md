# Mobile media and ground-panel fixes — 16 November 2026

- Phone and tablet hero media now occupies a separate 4:3 area above the headline and actions; desktop retains its background composition. The mobile video framing excludes only the source's empty 400px left matte, retaining the complete photographed scene.
- Every homepage directory card has the same underline/highlight. Academy links to `/academy`, spans the final mobile row, and joins a five-column desktop grid.
- VenueExplorer's detail content is in normal document flow. Its complete image and action link reserve height before the facility list. The earlier absolutely positioned content exceeded its parent's 280px minimum and overlapped the first mobile facility control.
- Event/coaching videos retain natural 9:16 proportions with captions below them. Mobile coaching photography shows the full portrait rather than a landscape crop.

## Verification

Homepage checked at 320×568, 360×800, 390×844, 430×932, 768×1024, 844×390, 899×900, 900×900 and 1280×800. All had no horizontal overflow, all five directory links with 2px underlines, detail content fitting its layout parent, and separate media/copy below 900px.

Coaching, corporate, birthday, tournament and location pages checked at 320, 390, 768 and 1280px widths: no horizontal overflow, no media crossing viewport edges, and no video-caption overlap. Ground controls checked for cricket, football, pickleball and café. The cricket and football action links have 24px clearance before the facility list after transitions settle.

ESLint and production build passed. These checks used Chromium-based browser rendering; physical iOS and Android devices were not available.
