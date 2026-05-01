$files = @("invitation.html", "invitation-gelar.html")
foreach ($file in $files) {
    $content = Get-Content $file -Raw

    # 1. Hide the loading page
    $content = $content -replace "id='loadingpage' style='display:flex;", "id='loadingpage' style='display:none;"

    # 2. Remove the first obfuscated script block
    $content = $content -replace '(?s)<script>.*?const invID =.*?_0x5dab.*?_0x3ea5c4=.*?return _0x5dab;\}\(\);\s*</script>', ''

    # 3. Remove linkundangan-script.js
    $content = $content -replace '<script src="https://www.linkundangan.com/js/linkundangan-script.js\?v=20260517"></script>', ''

    # 4. Remove anti-cloning and tracking scripts
    $content = $content -replace '<script src="https://www.linkundangan.com/js/google.analytic.js\?v=20260517"></script>', ''
    $content = $content -replace '<script src="https://share.linkundangan.com/libraries/ws/reconnecting-websocket.ori.min.js\?v=120260517"></script>', ''

    # 5. Remove bottom obfuscated scripts
    $content = $content -replace '(?s)try\{\s*var _0x7be3=.*?</script>', '</script>'
    $content = $content -replace '(?s)const _0xf6adad=_0x2683;.*?</script>', '</script>'
    $content = $content -replace '(?s)let socket = null;.*?initSocket\(\);.*?</script>', '</script>'

    # 6. Add our own audio and open-invitation handler
    $customScript = @'
<audio id="bg-music" loop>
    <source src="lagu.mp3" type="audio/mpeg">
</audio>
<script>
$(document).ready(function(){
    $(".open-inv").click(function(){
        $("#coverModal").fadeOut(800);
        var audio = document.getElementById("bg-music");
        if(audio) {
            audio.play().catch(function(e){ console.log("Auto-play prevented"); });
        }
    });

    // Simple countdown logic
    var countDownDate = new Date("Jun 7, 2026 16:00:00").getTime();
    setInterval(function() {
        var now = new Date().getTime();
        var distance = countDownDate - now;
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        $(".countday").text(days < 10 ? "0" + days : days);
        $(".counthour").text(hours < 10 ? "0" + hours : hours);
        $(".countminute").text(minutes < 10 ? "0" + minutes : minutes);
        $(".countsecond").text(seconds < 10 ? "0" + seconds : seconds);
    }, 1000);
});
</script>
</body>
'@
    $content = $content -replace '</body>', $customScript

    Set-Content -Path $file -Value $content -Encoding UTF8
}
Write-Host "Fixed"
