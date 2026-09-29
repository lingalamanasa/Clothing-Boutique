import os
import urllib.request
import io
from PIL import Image

OUTPUT_DIR = "images"
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Curated list of high-fashion, editorial photography from Unsplash
IMAGE_URLS = {
    # Homepage Hero & Main Story
    "hero-index.webp": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80",
    "idx-01.webp": "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=900&q=80",
    
    # Collections
    "col-couture.webp": "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80",
    "col-suits.webp": "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
    "col-silk.webp": "https://images.unsplash.com/photo-1518049362265-d5b2a6467637?auto=format&fit=crop&w=800&q=80",
    "col-resort.webp": "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80",

    # Products Showcase
    "prod-1.webp": "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80",
    "prod-2.webp": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    "prod-3.webp": "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
    "prod-4.webp": "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=800&q=80",
    "prod-5.webp": "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=800&q=80",
    "prod-6.webp": "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80",
    "prod-7.webp": "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80",
    "prod-8.webp": "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80",
    "prod-9.webp": "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=800&q=80",

    # Runway Gallery for Homepage Lookbook
    "gallery-1.webp": "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=80",
    "gallery-2.webp": "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=800&q=80",
    "gallery-3.webp": "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=800&q=80",
    "gallery-4.webp": "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?auto=format&fit=crop&w=800&q=80",
    "gallery-5.webp": "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=800&q=80",
    "gallery-6.webp": "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80",

    # About Page
    "about-hero.webp": "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=80",
    "about-artisan.webp": "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80",
    "about-salon.webp": "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    "about-craft.webp": "https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?auto=format&fit=crop&w=800&q=80",

    # Services Page
    "services-bespoke.webp": "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=80",
    "services-bridal.webp": "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    "services-suiting.webp": "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
    "services-concierge.webp": "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80",
    "services-alterations.webp": "https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?auto=format&fit=crop&w=800&q=80",
    "services-virtual.webp": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",

    # Blog / Journal Page
    "blog-1.webp": "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
    "blog-2.webp": "https://images.unsplash.com/photo-1518049362265-d5b2a6467637?auto=format&fit=crop&w=800&q=80",
    "blog-3.webp": "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=800&q=80",
    "blog-4.webp": "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=80",

    # Contact Page & Salons
    "contact-boutique.webp": "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=900&q=80",
    "contact-interior.webp": "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",

    # Avatars
    "avatar-client.webp": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    "avatar-stylist.webp": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    "avatar-admin.webp": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
}

def download_and_convert(filename, url, max_kb=95):
    filepath = os.path.join(OUTPUT_DIR, filename)
    print(f"Fetching {filename}...")
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = resp.read()
        img = Image.open(io.BytesIO(data))
        if img.mode != 'RGB':
            img = img.convert('RGB')
        
        # Max dimensions for luxury web visuals without excessive file size
        max_dim = 1100
        if max(img.size) > max_dim:
            img.thumbnail((max_dim, max_dim), Image.Resampling.LANCZOS)

        quality = 82
        while quality >= 30:
            img.save(filepath, format="WEBP", quality=quality, method=6)
            size_kb = os.path.getsize(filepath) / 1024
            if size_kb <= max_kb:
                print(f" -> Saved {filename}: {size_kb:.2f} KB (quality={quality})")
                return True
            quality -= 5
            
        # If still over max_kb, resize down 20%
        img.thumbnail((int(img.width * 0.8), int(img.height * 0.8)), Image.Resampling.LANCZOS)
        img.save(filepath, format="WEBP", quality=75, method=6)
        size_kb = os.path.getsize(filepath) / 1024
        print(f" -> Resized & Saved {filename}: {size_kb:.2f} KB")
        return True
    except Exception as e:
        print(f" !! Error processing {filename}: {e}")
        return False

print("Starting batch high-fashion asset acquisition...")
for filename, url in IMAGE_URLS.items():
    download_and_convert(filename, url)

print("Batch acquisition completed!")
