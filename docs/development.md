# Development

## Prerequisites

- [jq](https://stedolan.github.io/jq/)
- [node](https://nodejs.org/)
- [yarn](https://yarnpkg.com/)

## Installation

1. Clone this repository.

    ```bash
    git clone https://github.com/tanakafwd/mermaid-diagram-renderer.git
    ```

1. Open `chrome://extensions` in your Google Chrome or Chromium.
1. Enable `Developer mode`.
1. Click `Load unpacked`.
1. Select the [`extension`](/extension) directory in the cloned repository.
1. Open [the test page](/tests/pages/valid.md) to check if the extension works.

## Update the embedded mermaid version

Example usage to update the embedded mermaid to `8.13.3`.

```bash
./tools/update_mermaid 8.13.3
```

## Format code

```bash
./tools/format
```

## Check code

```bash
./tools/lint
```

## Convert SVG icons into PNG images

Convert SVG images for icons in [`docs/images`](/docs/images) into PNG images in
[`extension/images`](/extension/images).

```bash
./tools/convert_svg_icons_to_png
```

## Test extension

The following command will launch a Chromium browser for testing.

```bash
./tools/test
```

## Zip extension

```bash
./tools/zip_extension
```
