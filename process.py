import re

def process_html(file_path, is_gelar=False):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace relative URLs with absolute URLs from the original site
    content = re.sub(r'href="/', 'href="https://www.linkundangan.com/', content)
    content = re.sub(r'src="/', 'src="https://www.linkundangan.com/', content)
    content = re.sub(r'url\(/', 'url(https://www.linkundangan.com/', content)
    content = re.sub(r'url\(\'/', 'url(\'https://www.linkundangan.com/', content)
    content = re.sub(r'url\(\"/', 'url("https://www.linkundangan.com/', content)

    # Names
    content = content.replace('Hamzah &amp; Anissa', 'Rozak &amp; Lutfia')
    content = content.replace('Hamzah & Anissa', 'Rozak & Lutfia')
    content = content.replace('Anissa & Hamzah', 'Lutfia & Rozak')
    content = content.replace('Anissa &amp; Hamzah', 'Lutfia &amp; Rozak')
    content = content.replace('<div>Anissa</div>', '<div>Lutfia</div>')
    content = content.replace('<div>Hamzah</div>', '<div>Rozak</div>')
    
    if is_gelar:
        content = content.replace('Anissa Maryam', 'Lutfiatun Nadhiroh S, S.Pd.')
    else:
        content = content.replace('Anissa Maryam', 'Lutfiatun Nadhiroh Surahmawati')
        
    content = content.replace('Hamzah Yusuf', 'Mukhamad Abdul Rozak')
    
    content = content.replace('Keluarga bapak abdul', 'Keluarga Bapak [Nama Ayah Lutfia]')
    content = content.replace('Keluarga bapak hasan', 'Keluarga Bapak [Nama Ayah Rozak]')
    
    # Dates & Times
    content = content.replace('8 Mei 2026', '7 Juni 2026')
    content = content.replace('12 Desember 2021', '07 Juni 2026')
    content = content.replace('12 Desember 2024', '07 Juni 2026')
    content = content.replace('15 Desember 2021', '07 Juni 2026')
    
    content = content.replace('08:00 WIB', '16:00 WIB')
    content = content.replace('10:00 WIB', '16:00 WIB')

    # Music / Audio
    content = re.sub(r'https://cdn\.freesound\.org/.*\.mp3', 'lagu.mp3', content)

    # Images (empty placeholders)
    # The reference uses footages: https://www.linkundangan.com/images/footages/wedding/X.webp
    content = re.sub(
        r'https://www\.linkundangan\.com/images/footages/wedding/\d+\.webp',
        'https://placehold.co/400x600/eaeaea/a0a0a0?text=Foto+Kosong',
        content
    )

    out_file = 'invitation-gelar.html' if is_gelar else 'invitation.html'
    with open(out_file, 'w', encoding='utf-8') as f:
        f.write(content)

process_html('actual.html', is_gelar=False)
process_html('actual.html', is_gelar=True)
print("Done")
