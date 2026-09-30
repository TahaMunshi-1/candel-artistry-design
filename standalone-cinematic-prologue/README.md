# Cinematic Parallax Story

Pinned `100vh` viewport. Scroll scrubs a virtual camera through layered Renaissance paintings.

## Layers (per shot)

| Layer | Depth behavior |
|-------|----------------|
| background | slow translate + gentle scale |
| midground | faster drift, soft mask, blur into push |
| subject | story focus; mouse pans *inside* the image |
| foreground | **camera push** — expands beyond viewport, reveals next shot |
| atmospheric | light veil + canvas dust |
| typography | enters, holds, exits before the push |

## Run

```bash
cd standalone-cinematic-prologue
npx --yes serve -l 5180
```

Open http://localhost:5180/

Scroll forward or backward — motion is continuous and bidirectional.
