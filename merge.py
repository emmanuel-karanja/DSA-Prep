import os
from io import BytesIO
from PIL import Image, ImageOps
from pygments import highlight
from pygments.lexers import JavascriptLexer
from pygments.formatters import ImageFormatter
import re

# SETTINGS
file_path = r"C:\Users\ZBOOK\DSA-Prep\DSA-Prep\batch.js"  # Only this file
output_pdf = "batch_per_problem.pdf"

# A4 size in pixels at 300 DPI
A4_WIDTH_PX = 2480
A4_HEIGHT_PX = 3508

def code_to_image(code, font_size=14):
    """Convert code to syntax-highlighted image."""
    formatter = ImageFormatter(
        font_name='Consolas',  # Windows-safe monospace font
        font_size=font_size,
        line_numbers=True,
        line_number_bg='#f0f0f0',
        image_pad=10,
        line_pad=2
    )
    img_data = BytesIO()
    highlight(code, JavascriptLexer(), formatter, img_data)
    img_data.seek(0)
    return Image.open(img_data)

def fit_to_a4(img):
    """Pad image to fit A4 portrait size while keeping content centered."""
    # Convert to RGB
    img = img.convert("RGB")
    # Calculate aspect ratio padding
    return ImageOps.pad(img, (A4_WIDTH_PX, A4_HEIGHT_PX), color="white", centering=(0.5, 0))

def split_problems(code):
    """Split the JS file into problems using /** Problem X: */ markers."""
    # Match /** Problem 1: */, /** Problem 2: */, etc.
    parts = re.split(r'(/\*\*\s*Problem \d+:.*?\*/)', code, flags=re.DOTALL)
    problems = []
    for i in range(1, len(parts), 2):
        header = parts[i]
        body = parts[i + 1] if i + 1 < len(parts) else ''
        problems.append(header + body)
    return problems


def batch_to_pdf():
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            code = f.read()
    except UnicodeDecodeError:
        with open(file_path, "r", encoding="latin-1") as f:
            code = f.read()

    problems = split_problems(code)
    images = []

    for idx, prob in enumerate(problems):
        print(f"Rendering problem {idx + 1}")
        img = code_to_image(prob)
        img_a4 = fit_to_a4(img)
        images.append(img_a4)

    if images:
        # Save all problems, one per page
        images[0].save(output_pdf, save_all=True, append_images=images[1:])
        print(f"\n✅ All problems saved into: {output_pdf}")
    else:
        print("❌ No problems found in batch.js.")

if __name__ == "__main__":
    batch_to_pdf()
