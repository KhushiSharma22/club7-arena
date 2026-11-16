# Venue media cleanup — 16 November 2026

Seven still photos were retouched with the built-in image_gen tool, inspected, and exported as quality-90 WebP files. Originals remain untouched. All rendered references use the new filenames, including homepage, coaching, tournament, venue explorer, location view and social preview metadata.

| Original | Final asset | Edit |
| --- | --- | --- |
| venue/day-aerial.jpg | public/venue/day-aerial-clean.webp | Bare outer soil replaced with natural grass; courts retained. Currently an unused library image. |
| academy/batting-practice.jpg | public/academy/batting-practice-clean.webp | Patchy dry ground replaced with short grass; players and dedicated practice strip retained. |
| academy/coach-guidance.jpg | public/academy/coach-guidance-clean.webp | Grass gaps and litter cleaned; the real paved walkway retained. |
| venue/drone-hero-poster.jpg | public/venue/drone-hero-clean.webp | Construction edges greened; scattered white construction slabs removed in a second pass. |
| venue/night-aerial.jpg | public/venue/night-aerial-clean.webp | Outer unfinished ground cleaned with dark grass and foliage. Also used for the venue explorer. |
| venue/turf-top-down-night.jpg | public/venue/turf-top-down-night-clean.webp | Bare perimeter strips greened, turf and pitch retained. |
| venue/pickleball.jpg | public/venue/pickleball-clean.webp | Thin dry strip beside boundary wall greened; court and paved walkway retained. |

## Final prompt set

Shared instruction: edit the supplied photograph with minimal photorealistic ground cleanup. Replace exposed unfinished soil, construction debris and loose bricks with natural short green grass or low foliage. Preserve people, identities, poses, equipment, netting, poles, lights, court surfaces, red cricket strips, markings, existing trees, camera perspective, framing and original lighting. Do not add facilities, buildings or people; avoid neon green.

Asset-specific instructions:
- Day aerial: target only dry outer soil, keep daytime shadows and the two fenced courts.
- Bowling practice: green patchy grass surrounding the bowler; keep the dedicated distant cricket strip.
- Coach guidance: green thin grass beside nets, retain the interlocking-paver walking path under the coach and children.
- Drone poster: green the exposed construction edge at left. Final correction: remove all scattered white planks, slabs and construction materials in the upper enclosed area; seamlessly continue its existing surface, preserving poles and lamps.
- Night aerial: dark subtle grass and low foliage at the perimeter; retain night light spill and existing court layout.
- Top-down turf: green only the narrow outer bare-soil perimeter; preserve turf, red pitch, net shadows and floodlights.
- Pickleball: green the thin right-wall soil strip; preserve the actual blue/red playing surface and left paved walkway.

## Video handling

AI video editing could not run: Seedance required a Plus plan and Gemini Omni required a Basic plan. No paid plan was purchased. The user selected crop/trim instead.

- `public/venue/drone-hero-clean.mp4`: source interval 10.0–15.5 seconds, crop 640×360 at x760/y410, exported 1280×720 H.264, CRF20, faststart, muted. This removes the construction-filled upper area and exposed left rubble from the hero framing. Reviewed contact sheet across the entire resulting clip.
- `public/corporate/team-cricket-clean.mp4`: removed the first four seconds of the opening night shot; retained the remaining 18 seconds of cricket play and original audio. Poster `public/corporate/team-cricket-clean-poster.webp` taken one second into this final clip.
- Birthday video reviewed across its full duration: no obvious construction piles; celebration, pickleball and cricket content retained.
- Coaching video retained: its patchy practice ground cannot be cropped out without cutting the bowler and training action. Its poster and supporting still have been cleaned. This video has not been AI-greenified.
- Old `hero-loop.mp4` is unused and is not rendered on the website.
- Corporate team/trophy photos, birthday photo, entrance photos and stock photos were reviewed and retained because no construction cleanup was needed.

Validation: lint and production build passed. Homepage hero video loads at 1280×720; cleaned homepage images load; coaching photos load on 390px mobile without horizontal overflow. Original integrated booking component and temporary WhatsApp mode remain unchanged.


## Full-frame drone video revision

The tight crop was rejected by the user. The homepage now uses `public/venue/drone-hero-green.mp4`: the original landscape composition and complete approximately 15.8-second drone movement, with targeted AI-cleaned construction areas composited onto the moving footage. The underlying image plate is the built-in image_gen output `public/venue/drone-hero-clean.webp`.

`scripts/green-drone-video.py` aligns that plate to the source using SIFT/RANSAC, tracks multiple source keyframes, interpolates ground-plane corner positions, and applies feathered masks only to the upper construction area, left rubble strip and small exposed lower perimeter. Original gameplay/turf pixels outside those masks and the landscape matte are preserved. The export is 1600×900, 30fps H.264, CRF19, faststart, muted as before. The previous cropped export is retained as an unused historical asset.
