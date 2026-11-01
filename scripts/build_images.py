#!/usr/bin/env python3
"""Copy the hand-picked source photos into public/img as WebP.

Every output goes through `magick -auto-orient -strip`, so phone EXIF (GPS
location included) never reaches the published site. Sources live in
David's own folders; nothing here is fetched from the internet.

Run: python3 scripts/build_images.py
"""
import subprocess
from pathlib import Path

HOME = Path.home()
TN = HOME / "Desktop/05-Travel-and-Visa/VISA-TRAVEL-STUFF/VISA Re Application/Tech Nation"
USA = HOME / "Desktop/05-Travel-and-Visa/VISA-TRAVEL-STUFF/USA/Images Used"
YBA = HOME / "Desktop/03-Businesses/The-YBAs-and-GFA/Strategy-Docs/from-The-GFA-The-YBAs-folder"
LOGOS = YBA / "The GFA and YBA App logos"
REV = HOME / "Documents/website projects/Dave Websites/dave digitals new front facing sites screnshots"
CAF = TN / "CAFETERIA PROJECT"
OUT = Path(__file__).resolve().parent.parent / "public/img"

# (output name, source, max width, optional crop "WxH+X+Y" applied before resize)
IMAGES = [
    # Portraits
    ("hero", TN / "53505209987_890044f6e6_o.jpg", 1400, "1800x2250+1700+600"),
    ("portrait-studio", TN / "david.jpeg", 800, None),
    ("portrait-laptop", TN / "dav.jpg", 960, None),
    # Recognition
    ("swc-pitch", USA / "regional_finalist.jpg", 1080, None),
    ("swc-finalists", USA / "regional_finalist_two.jpg", 960, None),
    ("signature-group", TN / "IMG-0548.JPG", 1600, None),
    ("signature-finalist", TN / "Signature Awards  Nouvellesoft.jpg", 1000, None),
    ("signature-table", TN / "image 1.jpg", 1800, None),
    ("signature-night", TN / "WhatsApp Image 2024-02-03 at 11.46.28 2.jpeg", 1600, None),
    ("bta-screen", TN / "bta awards.jpg", 1080, None),
    ("bta-carpet", TN / "IMG-0921.JPG", 1400, "2448x2448+0+400"),
    ("mentor", TN / "meeting with Ivan.png", 1600, None),
    ("nec-stand", TN / "1777FC1A-2AEF-4B97-8B30-C45D99CBBAF2.JPEG", 800, None),
    ("nec-hall", TN / "7C3462B0-85FD-4063-A32F-36E680C50394.JPEG", 843, None),
    ("nec-booth", USA / "exhibition_nec_one.jpg", 1600, None),
    ("launch-cert", TN / "photo_2025-08-17 21.35.55.jpeg", 1200, None),
    # The YBA
    ("yba-ps-1", YBA / "For Emails/Marketed of The YBA  Play Store Screenshots-1.png", 700, None),
    ("yba-ps-2", YBA / "For Emails/Marketed of The YBA  Play Store Screenshots-2.png", 700, None),
    ("yba-ps-3", YBA / "For Emails/Marketed of The YBA  Play Store Screenshots-3.png", 700, None),
    ("yba-ps-4", YBA / "For Emails/Marketed of The YBA  Play Store Screenshots-4.png", 700, None),
    ("yba-ps-5", YBA / "For Emails/Marketed of The YBA  Play Store Screenshots-5.png", 700, None),
    ("yba-ps-6", YBA / "For Emails/Marketed of The YBA  Play Store Screenshots-6.png", 700, None),
    ("yba-web", YBA / "Novellesoft  The YBA  Open Graph images (1) | Website/website-banner-campus.png", 1600, None),
    ("yba-ch-2", YBA / "Charterhouse Lagos YBA Presentation Screenshots /Charterhouse Lagos YBA Presentation Screenshots 02.png", 640, None),
    ("yba-ch-4", YBA / "Charterhouse Lagos YBA Presentation Screenshots /Charterhouse Lagos YBA Presentation Screenshots 04.png", 640, None),
    ("yba-ch-6", YBA / "Charterhouse Lagos YBA Presentation Screenshots /Charterhouse Lagos YBA Presentation Screenshots 06.png", 640, None),
    ("yba-ch-8", YBA / "Charterhouse Lagos YBA Presentation Screenshots /Charterhouse Lagos YBA Presentation Screenshots 08.png", 640, None),
    ("yba-roadmap", YBA / "For Emails/Yearbook App Product Dev. Roadmap_for leaders.png", 1400, None),
    ("fg-gfa", LOGOS / "Feature_Graphic_GFA.png", 1024, None),
    ("fg-academy", LOGOS / "Feature_Graphic_YA.png", 1024, None),
    ("fg-university", LOGOS / "Feature_Graphic_YU.png", 1024, None),
    # Earlier work
    ("cafeteria-3d", CAF / "Presentation_1.png", 1400, None),
    ("cafeteria-ui", CAF / "Cafeteria Mock Images/Presentation_3.png", 700, None),
    # Shipped web work (first screenshot of each site)
    *[(f"web-{slug}", REV / f"{name} 1.png", 1400, None) for slug, name in [
        ("redtech", "redtechafrica.com"),
        ("ractools", "ractools.vercel.app"),
        ("redstream", "redstream-platform.vercel.app"),
        ("redstreamvas", "redstreamvas.vercel.app"),
        ("aualumni", "aualumni.vercel.app"),
        ("momms", "momms.co.uk"),
        ("3pn", "3pngroup.com"),
        ("stratum", "stratumgp.com"),
        ("pacific", "pacific-prop.com"),
        ("lagosagrarian", "lagosagrarian.com"),
        ("olamfs", "olamfs.vercel.app"),
        ("olusowunmi", "olusowunmi.com"),
        ("reynold", "reynoldmc.vercel.app"),
        ("mmd", "the-mmd.com"),
        ("tools", "yearbookapp.web.app:tools:"),
    ]],
    ("dave-studio", HOME / "Documents/studio projects/Dave Studio/dave-studio-website/public/og.jpg", 1200, None),
    ("dave-architectures", HOME / "Documents/architecture projects/Dave Architectures/dave-architectures/public/og-image.jpg", 1200, None),
    ("dave-websites", HOME / "Documents/website projects/Dave Websites/dave-websites/public/og-image.jpg", 1200, None),
]


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    for name, src, width, crop in IMAGES:
        if not src.exists():
            print(f"MISSING {name}: {src}")
            continue
        cmd = ["magick", f"{src}[0]", "-auto-orient"]
        if crop:
            cmd += ["-crop", crop, "+repage"]
        cmd += ["-resize", f"{width}x>", "-strip", "-quality", "82", str(OUT / f"{name}.webp")]
        subprocess.run(cmd, check=True)
        dims = subprocess.run(["magick", "identify", "-format", "%wx%h", str(OUT / f"{name}.webp")],
                              capture_output=True, text=True).stdout
        print(f"{name:22} {dims}")


if __name__ == "__main__":
    main()
