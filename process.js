const fs = require('fs');

function processHtml(isGelar) {
    let content = fs.readFileSync('actual.html', 'utf-8');

    // URLs
    content = content.replace(/href="\//g, 'href="https://www.linkundangan.com/');
    content = content.replace(/src="\//g, 'src="https://www.linkundangan.com/');
    content = content.replace(/url\(\//g, 'url(https://www.linkundangan.com/');
    content = content.replace(/url\('\//g, "url('https://www.linkundangan.com/");
    content = content.replace(/url\("\//g, 'url("https://www.linkundangan.com/');

    // Names
    content = content.split('Hamzah &amp; Anissa').join('Rozak &amp; Lutfia');
    content = content.split('Hamzah & Anissa').join('Rozak & Lutfia');
    content = content.split('Anissa & Hamzah').join('Lutfia & Rozak');
    content = content.split('Anissa &amp; Hamzah').join('Lutfia &amp; Rozak');
    content = content.split('<div>Anissa</div>').join('<div>Lutfia</div>');
    content = content.split('<div>Hamzah</div>').join('<div>Rozak</div>');

    if (isGelar) {
        content = content.split('Anissa Maryam').join('Lutfiatun Nadhiroh S, S.Pd.');
    } else {
        content = content.split('Anissa Maryam').join('Lutfiatun Nadhiroh Surahmawati');
    }

    content = content.split('Hamzah Yusuf').join('Mukhamad Abdul Rozak');

    content = content.split('Keluarga bapak abdul').join('Keluarga Bapak [Nama Ayah Lutfia]');
    content = content.split('Keluarga bapak hasan').join('Keluarga Bapak [Nama Ayah Rozak]');

    // Dates & Times
    content = content.split('8 Mei 2026').join('7 Juni 2026');
    content = content.split('12 Desember 2021').join('07 Juni 2026');
    content = content.split('12 Desember 2024').join('07 Juni 2026');
    content = content.split('15 Desember 2021').join('07 Juni 2026');

    content = content.split('08:00 WIB').join('16:00 WIB');
    content = content.split('10:00 WIB').join('16:00 WIB');
    
    // Music
    content = content.replace(/https:\/\/cdn\.freesound\.org\/.*\.mp3/g, 'lagu.mp3');

    // Images
    content = content.replace(/https:\/\/www\.linkundangan\.com\/images\/footages\/wedding\/\d+\.webp/g, 'https://placehold.co/400x600/eaeaea/a0a0a0?text=Foto+Kosong');

    const outFile = isGelar ? 'invitation-gelar.html' : 'invitation.html';
    fs.writeFileSync(outFile, content, 'utf-8');
}

processHtml(false);
processHtml(true);
console.log('Done');
