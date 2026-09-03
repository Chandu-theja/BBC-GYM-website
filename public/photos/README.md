# Gym photos

Drop photo files in this folder. That is the whole process — there is no code to edit.

- **Formats:** `.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`
- **Order:** filename order, so use a numeric prefix — `01-`, `02-`, `03-`
- **Caption:** taken from the filename. The number prefix is dropped, dashes become
  spaces, and the first letter is capitalised.

```
01-main-weights-floor.jpg   ->  "Main weights floor"
02-cardio-section.jpg       ->  "Cardio section"
03-crossfit-rig.jpg         ->  "CrossFit rig"
04-ladies-batch-area.jpg    ->  "Ladies' batch area"
```

`crossfit`, `bbc`, `hiit`, `ladies`, `zumba` and `gents` are capitalised correctly on their own.

Shoot landscape, lights on, and don't photograph anyone who hasn't agreed to it. Around
1600px wide is plenty — Next.js resizes and serves modern formats automatically.

While this folder is empty the site shows named placeholder tiles and links to the gym's
Google listing instead.
