import os
import math
from PIL import Image, ImageDraw, ImageFont, ImageFilter

OUTPUT_DIR = "images"
os.makedirs(OUTPUT_DIR, exist_ok=True)

def create_gradient(width, height, color1, color2, direction="vertical"):
    base = Image.new("RGBA", (width, height), color1)
    top = Image.new("RGBA", (width, height), color2)
    mask = Image.new("L", (width, height))
    mask_data = []
    for y in range(height):
        for x in range(width):
            if direction == "vertical":
                val = int(255 * (y / height))
            elif direction == "horizontal":
                val = int(255 * (x / width))
            elif direction == "radial":
                cx, cy = width / 2, height / 2
                dist = math.sqrt((x - cx)**2 + (y - cy)**2)
                max_dist = math.sqrt(cx**2 + cy**2)
                val = int(255 * min(1.0, dist / max_dist))
            elif direction == "diagonal":
                val = int(255 * ((x / width + y / height) / 2))
            mask_data.append(val)
    mask.putdata(mask_data)
    return Image.composite(top, base, mask)

def draw_fashion_silhouette(draw, cx, cy, scale=1.0, color=(212, 175, 55, 180)):
    # Draw an elegant haute couture dress silhouette
    s = scale
    # Shoulders and neckline
    neck = [(cx - 15*s, cy - 140*s), (cx + 15*s, cy - 140*s)]
    chest = [(cx + 40*s, cy - 80*s), (cx + 25*s, cy - 30*s)]
    waist = (cx + 18*s, cy + 20*s)
    hips = [(cx + 50*s, cy + 90*s), (cx + 110*s, cy + 260*s)]
    bottom = [(cx - 110*s, cy + 260*s), (cx - 50*s, cy + 90*s)]
    left_waist = (cx - 18*s, cy + 20*s)
    left_chest = [(cx - 25*s, cy - 30*s), (cx - 40*s, cy - 80*s)]
    
    # Head & Hat
    draw.ellipse([cx - 20*s, cy - 200*s, cx + 20*s, cy - 150*s], fill=color)
    draw.ellipse([cx - 60*s, cy - 195*s, cx + 60*s, cy - 185*s], fill=color)
    
    # Gown polygon
    gown_pts = [
        (cx - 10*s, cy - 140*s),
        (cx + 10*s, cy - 140*s),
        chest[0], chest[1], waist, hips[0], hips[1],
        bottom[0], bottom[1], left_waist, left_chest[1], left_chest[0]
    ]
    draw.polygon(gown_pts, fill=color)
    # Stitched belt line
    draw.line([(cx - 22*s, cy + 20*s), (cx + 22*s, cy + 20*s)], fill=(255, 240, 200, 240), width=int(3*s))

def draw_mannequin(draw, cx, cy, scale=1.0):
    s = scale
    # Wooden stand
    draw.line([(cx, cy - 120*s), (cx, cy + 180*s)], fill=(120, 90, 60, 240), width=int(6*s))
    draw.ellipse([cx - 40*s, cy + 175*s, cx + 40*s, cy + 195*s], fill=(100, 75, 50, 240))
    # Torso
    torso = [
        (cx - 35*s, cy - 100*s),
        (cx + 35*s, cy - 100*s),
        (cx + 40*s, cy - 40*s),
        (cx + 22*s, cy + 10*s),
        (cx + 35*s, cy + 60*s),
        (cx - 35*s, cy + 60*s),
        (cx - 22*s, cy + 10*s),
        (cx - 40*s, cy - 40*s)
    ]
    draw.polygon(torso, fill=(245, 235, 220, 220))
    # Tailor measuring tape across torso
    draw.line([(cx - 32*s, cy - 30*s), (cx + 34*s, cy + 30*s)], fill=(212, 175, 55, 255), width=int(3*s))

def save_webp_under_100k(img, filepath, max_kb=95):
    quality = 88
    # Convert RGBA to RGB if saving as RGB webp, but WEBP supports RGBA
    if img.mode == 'RGBA':
        img = img.convert('RGBA')
    while quality >= 30:
        img.save(filepath, format="WEBP", quality=quality, method=6)
        size_kb = os.path.getsize(filepath) / 1024
        if size_kb <= max_kb:
            return size_kb
        quality -= 5
    return os.path.getsize(filepath) / 1024

print("Starting asset generation...")

# 1. LOGOS
# Stackly Logo Dark (For dark backgrounds) - width 600, height 180
def create_stackly_logo(is_dark_bg=True):
    w, h = 600, 180
    img = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Emblem on the left: Diamond faceted boutique monogram 'S'
    cx, cy = 90, 90
    emblem_color = (212, 175, 55, 255) # Rich warm gold
    sub_color = (245, 245, 242, 255) if is_dark_bg else (18, 18, 22, 255)
    
    # Draw geometric interlocking diamond icon
    diamond = [(cx, cy - 50), (cx + 45, cy), (cx, cy + 50), (cx - 45, cy)]
    draw.polygon(diamond, outline=emblem_color, width=3)
    inner_diamond = [(cx, cy - 35), (cx + 30, cy), (cx, cy + 35), (cx - 30, cy)]
    draw.polygon(inner_diamond, outline=(234, 200, 139, 200), width=2)
    # Monogram S inside
    draw.arc([cx - 15, cy - 25, cx + 15, cy], start=180, end=360, fill=emblem_color, width=4)
    draw.arc([cx - 15, cy - 5, cx + 15, cy + 20], start=0, end=180, fill=emblem_color, width=4)
    draw.line([(cx, cy - 25), (cx, cy + 20)], fill=(212, 175, 55, 120), width=1)
    
    # Wordmark text: STACKLY
    # Using clean sans geometric representation with lines & shapes
    tx = 160
    # S
    draw.arc([tx, 55, tx + 40, 85], start=180, end=360, fill=sub_color, width=6)
    draw.arc([tx, 80, tx + 40, 115], start=0, end=180, fill=sub_color, width=6)
    # T
    tx += 55
    draw.line([(tx, 60), (tx + 40, 60)], fill=sub_color, width=6)
    draw.line([(tx + 20, 60), (tx + 20, 115)], fill=sub_color, width=6)
    # A
    tx += 55
    draw.line([(tx, 115), (tx + 20, 60)], fill=sub_color, width=6)
    draw.line([(tx + 20, 60), (tx + 40, 115)], fill=sub_color, width=6)
    draw.line([(tx + 8, 95), (tx + 32, 95)], fill=sub_color, width=5)
    # C
    tx += 55
    draw.arc([tx, 60, tx + 45, 115], start=45, end=315, fill=sub_color, width=6)
    # K
    tx += 55
    draw.line([(tx, 60), (tx, 115)], fill=sub_color, width=6)
    draw.line([(tx, 90), (tx + 35, 60)], fill=sub_color, width=6)
    draw.line([(tx + 10, 85), (tx + 38, 115)], fill=sub_color, width=6)
    # L
    tx += 50
    draw.line([(tx, 60), (tx, 115)], fill=sub_color, width=6)
    draw.line([(tx, 115), (tx + 35, 115)], fill=sub_color, width=6)
    # Y
    tx += 50
    draw.line([(tx, 60), (tx + 20, 88)], fill=sub_color, width=6)
    draw.line([(tx + 40, 60), (tx + 20, 88)], fill=sub_color, width=6)
    draw.line([(tx + 20, 88), (tx + 20, 115)], fill=sub_color, width=6)
    
    # Subtitle: HAUTE COUTURE & ATELIER
    sub_y = 135
    draw.line([(160, sub_y - 8), (490, sub_y - 8)], fill=emblem_color, width=1)
    
    return img

logo_dark = create_stackly_logo(is_dark_bg=True)
save_webp_under_100k(logo_dark, "images/logo-dark.webp")
logo_light = create_stackly_logo(is_dark_bg=False)
save_webp_under_100k(logo_light, "images/logo-light.webp")

# Favicon
fav = Image.new("RGBA", (128, 128), (14, 14, 18, 255))
fdraw = ImageDraw.Draw(fav)
fdraw.polygon([(64, 16), (112, 64), (64, 112), (16, 64)], outline=(212, 175, 55, 255), width=4)
fdraw.arc([46, 38, 82, 68], start=180, end=360, fill=(212, 175, 55, 255), width=5)
fdraw.arc([46, 60, 82, 90], start=0, end=180, fill=(212, 175, 55, 255), width=5)
save_webp_under_100k(fav, "favicon.webp")
save_webp_under_100k(fav, "images/favicon.webp")

# Helper for creating rich editorial boutique images
def generate_boutique_scene(filename, w, h, theme_type, title, subtitle="", tag="ATELIER"):
    img = Image.new("RGBA", (w, h), (12, 12, 16, 255))
    draw = ImageDraw.Draw(img)
    
    if theme_type == "hero":
        # Luxury dark background with golden light beam and silhouette
        grad = create_gradient(w, h, (18, 16, 24, 255), (6, 6, 8, 255), "radial")
        img.paste(grad, (0, 0))
        draw = ImageDraw.Draw(img)
        # Golden spotlight beam
        for i in range(25):
            alpha = int(35 - i * 1.2)
            draw.polygon([(w*0.7, 0), (w*0.8, 0), (w*0.95 + i*10, h), (w*0.5 - i*10, h)], fill=(212, 175, 55, alpha))
        # Draw high-fashion model silhouettes
        draw_fashion_silhouette(draw, int(w * 0.72), int(h * 0.58), scale=1.8, color=(220, 185, 110, 220))
        draw_fashion_silhouette(draw, int(w * 0.86), int(h * 0.62), scale=1.5, color=(160, 130, 70, 140))
        # Soft blur glow
        draw.ellipse([w*0.72 - 80, h*0.58 - 250, w*0.72 + 80, h*0.58 - 90], fill=(255, 240, 190, 40))

    elif theme_type == "craft":
        # Atelier craftsmanship, cutting table, tape, fabric rolls
        grad = create_gradient(w, h, (28, 24, 22, 255), (10, 10, 12, 255), "diagonal")
        img.paste(grad, (0, 0))
        draw = ImageDraw.Draw(img)
        # Fabric drapery waves
        for step in range(8):
            pts = []
            for px in range(0, w, 20):
                py = int(h*0.4 + math.sin(px*0.01 + step*0.6) * 60 + step*35)
                pts.append((px, py))
            pts.extend([(w, h), (0, h)])
            draw.polygon(pts, fill=(35 + step*10, 30 + step*6, 38 + step*4, 180))
        draw_mannequin(draw, int(w*0.75), int(h*0.52), scale=1.6)
        # Golden shears outline
        cx, cy = int(w*0.28), int(h*0.68)
        draw.ellipse([cx-30, cy-15, cx, cy+15], outline=(212, 175, 55, 200), width=3)
        draw.ellipse([cx-30, cy+10, cx, cy+40], outline=(212, 175, 55, 200), width=3)
        draw.line([(cx, cy), (cx+70, cy+50)], fill=(212, 175, 55, 230), width=4)
        draw.line([(cx, cy+25), (cx+70, cy-10)], fill=(212, 175, 55, 230), width=4)

    elif theme_type == "product":
        # Sleek product showcase with studio podium
        grad = create_gradient(w, h, (24, 24, 30, 255), (10, 10, 14, 255), "vertical")
        img.paste(grad, (0, 0))
        draw = ImageDraw.Draw(img)
        # Studio podium ellipse
        draw.ellipse([w*0.2, h*0.75, w*0.8, h*0.92], fill=(32, 32, 40, 255), outline=(212, 175, 55, 90), width=2)
        draw.ellipse([w*0.25, h*0.72, w*0.75, h*0.84], fill=(42, 42, 52, 255))
        # Center garment / mannequin
        draw_fashion_silhouette(draw, int(w*0.5), int(h*0.46), scale=1.2, color=(215, 180, 115, 230))
        
    elif theme_type == "editorial":
        # Fashion magazine moodboard / runway
        grad = create_gradient(w, h, (18, 16, 20, 255), (8, 8, 10, 255), "horizontal")
        img.paste(grad, (0, 0))
        draw = ImageDraw.Draw(img)
        # Geometric golden framing
        draw.rectangle([20, 20, w-20, h-20], outline=(212, 175, 55, 80), width=1)
        draw.rectangle([30, 30, w-30, h-30], outline=(212, 175, 55, 40), width=1)
        draw_fashion_silhouette(draw, int(w*0.65), int(h*0.52), scale=1.3, color=(230, 195, 130, 210))

    # Add elegant label badges
    badge_bg = (16, 16, 20, 220)
    draw.rounded_rectangle([35, 35, 220, 75], radius=6, fill=badge_bg, outline=(212, 175, 55, 120), width=1)
    # Tag text
    # Draw boutique tag line
    draw.line([(50, 48), (65, 48)], fill=(212, 175, 55, 255), width=2)
    
    # Save optimized webp
    filepath = os.path.join(OUTPUT_DIR, filename)
    kb = save_webp_under_100k(img, filepath)
    print(f"Generated {filename}: {kb:.2f} KB (under 100kb: {kb < 100})")

# Generate all primary images
images_to_generate = [
    ("hero-index.webp", 1200, 800, "hero", "HAUTE COUTURE", "Fall/Winter Edition"),
    ("idx-01.webp", 1000, 750, "craft", "ATELIER MASTERY", "Handcrafted in Milan"),
    ("col-couture.webp", 800, 1000, "product", "EVENING COUTURE", "Silk & Chiffon"),
    ("col-suits.webp", 800, 1000, "product", "TAILORED SUITS", "Italian Wool"),
    ("col-silk.webp", 800, 1000, "product", "MULBERRY SILK", "Lounge & Resort"),
    ("col-resort.webp", 800, 1000, "product", "RESORT ATELIER", "Mediterranean"),
    ("prod-1.webp", 800, 950, "product", "THE NOIR SILK GOWN", "100% Mulberry Silk"),
    ("prod-2.webp", 800, 950, "product", "CASHMERE BLAZER", "Double-Breasted Gold"),
    ("prod-3.webp", 800, 950, "product", "CHAMPAGNE CHIFFON", "Pleated Eveningwear"),
    ("prod-4.webp", 800, 950, "product", "MIDNIGHT TUXEDO", "Hand-Stitched Lapel"),
    ("prod-5.webp", 800, 950, "product", "VELVET KIMONO GOWN", "Embroidered Silk"),
    ("prod-6.webp", 800, 950, "product", "IVORY TRENCH COAT", "Water-Repellent Cotton"),
    ("about-hero.webp", 1200, 700, "hero", "ATELIER HERITAGE", "Founded 2016"),
    ("about-artisan.webp", 900, 700, "craft", "MASTER ARTISANS", "70+ Hours Per Garment"),
    ("about-salon.webp", 900, 700, "editorial", "PRIVATE SALONS", "Paris & New York"),
    ("services-bespoke.webp", 1000, 700, "craft", "BESPOKE TAILORING", "Custom Silhouette"),
    ("services-bridal.webp", 1000, 700, "editorial", "BRIDAL COUTURE", "Private Suite"),
    ("blog-1.webp", 900, 600, "editorial", "PARIS RUNWAY", "Trend Analysis"),
    ("blog-2.webp", 900, 600, "craft", "SUSTAINABLE SILK", "Fabric Integrity"),
    ("blog-3.webp", 900, 600, "editorial", "CAPSULE WARDROBE", "The Minimalist Black-Tie"),
    ("contact-boutique.webp", 1000, 650, "editorial", "FLAGSHIP SALONS", "Appointments"),
    ("avatar-stylist.webp", 400, 400, "editorial", "CHIEF STYLIST", "Elena Vance"),
    ("avatar-client.webp", 400, 400, "editorial", "VIP CLIENT", "Sophia Laurent"),
    ("avatar-admin.webp", 400, 400, "editorial", "DIRECTOR", "Marcus Sterling"),
]

for item in images_to_generate:
    generate_boutique_scene(item[0], item[1], item[2], item[3], item[4], item[5])

print("All boutique assets generated successfully!")
