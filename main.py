import os
from io import BytesIO
from PIL import Image, ImageOps
from pygments import highlight
from pygments.lexers import JavascriptLexer
from pygments.formatters import ImageFormatter

# SETTINGS
start_dir = r"C:\Users\ZBOOK\DSA-Prep"  # Your repo path
output_pdf = "repo_code.pdf"

# A4 size in pixels at 300 DPI
A4_WIDTH_PX = 2480
A4_HEIGHT_PX = 3508

def code_to_image(code, font_size=14):
    """Convert code to syntax-highlighted image."""
    formatter = ImageFormatter(
        font_name='Consolas',
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
    return ImageOps.pad(img, (A4_WIDTH_PX, A4_HEIGHT_PX), color="white", centering=(0, 0))

def merge_js_to_pdf():
    images = []
    
    for root, _, files in os.walk(start_dir):
        for file in files:
            if file.endswith(".js"):
                file_path = os.path.join(root, file)
                
                # Read file and check for marker
                try:
                    with open(file_path, "r", encoding="utf-8") as f:
                        code = f.read()
                except UnicodeDecodeError:
                    with open(file_path, "r", encoding="latin-1") as f:
                        code = f.read()
                
                # Only include files that start with /*#*/
                if code.lstrip().startswith("/*#*/"):
                    print(f"Adding: {file_path}")
                    img = code_to_image(code)
                    img_a4 = fit_to_a4(img.convert("RGB"))
                    images.append(img_a4)
                else:
                    print(f"Skipping (no marker): {file_path}")
    
    if images:
        images[0].save(output_pdf, save_all=True, append_images=images[1:])
        print(f"\n✅ All marked code merged into: {output_pdf}")
    else:
        print("❌ No .js files with marker /*#*/ found.")

if __name__ == "__main__":
    merge_js_to_pdf()
