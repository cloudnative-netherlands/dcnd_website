# Sponsor Logo Sizing

Sponsor prominence is determined only by sponsorship tier. Each tier uses one
fixed card size, one fixed logo bounding box, and one shared visual treatment.

Individual logo scale values are used only for optical normalization:
compensating for source whitespace, aspect ratio, stroke weight, wordmark
length, and visual density. They must not be used to increase or reduce sponsor
prominence.

Logo assets may be cropped to remove transparent or empty whitespace, but the
logo artwork itself must not be altered unless using an official
sponsor-provided variant.

Allowed `logoScale` range:

- `1.00`: default
- `0.90-1.10`: normal optical adjustment
- `0.85-1.15`: exceptional adjustment, with an explanatory code comment
- outside `0.85-1.15`: replace or correct the logo asset instead

Prefer official full-color wordmarks on a white or light background. If a logo
needs substantial scaling or recoloring to work in the layout, request a better
source asset or use an official alternate logo variant.
