import os
import glob
import subprocess
import sys

# Ensure PIL is installed
try:
    from PIL import Image
except ImportError:
    print("Pillow not installed. Installing...")
    subprocess.check_call([sys.executable, "-m", "pip", "install", "pillow"])
    from PIL import Image

brain_dir = r"C:\Users\ericd\.gemini\antigravity-ide\brain\e48be4c4-40d3-4072-9294-2b3d938fe45b"
apps_dir = r"f:\GeminiProjects\GIS_Runtipi_catalog\apps"

mappings = {
    "logo_titiler": "titiler",
    "logo_maputnik": "maputnik",
    "logo_pgspatial": "pg-spatial",
    "logo_photon": "photon",
    "logo_graphhopper": "graphhopper"
}

for prefix, app_name in mappings.items():
    pattern = os.path.join(brain_dir, f"{prefix}_*.png")
    files = glob.glob(pattern)
    if not files:
        print(f"No file found for {prefix}")
        continue
    
    # Take the latest matching file if multiple exist
    src_file = max(files, key=os.path.getmtime)
    dst_dir = os.path.join(apps_dir, app_name, "metadata")
    dst_file = os.path.join(dst_dir, "logo.jpg")
    
    if not os.path.exists(dst_dir):
        os.makedirs(dst_dir)
        
    print(f"Converting {src_file} -> {dst_file}")
    try:
        with Image.open(src_file) as img:
            # Convert RGBA to RGB since JPEG doesn't support transparency
            rgb_img = img.convert("RGB")
            rgb_img.save(dst_file, "JPEG", quality=90)
        print("Success")
    except Exception as e:
        print(f"Failed to convert {src_file}: {e}")

print("Logo conversion complete!")
