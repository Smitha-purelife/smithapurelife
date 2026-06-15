Add-Type -AssemblyName System.Drawing
$imgPath = 'C:\Users\D sanjay kumar\.gemini\antigravity\brain\e3bbffda-857c-49b6-bf40-f1cecc58bfcf\media__1781007251499.png'
$img = [System.Drawing.Image]::FromFile($imgPath)

# Crop the S icon (top part)
$iconRect = New-Object System.Drawing.Rectangle(120, 40, 260, 200)
$iconBmp = New-Object System.Drawing.Bitmap($iconRect.Width, $iconRect.Height)
$iconGraphics = [System.Drawing.Graphics]::FromImage($iconBmp)
$iconGraphics.DrawImage($img, (New-Object System.Drawing.Rectangle(0, 0, $iconBmp.Width, $iconBmp.Height)), $iconRect, [System.Drawing.GraphicsUnit]::Pixel)
$iconBmp.Save('C:\Users\D sanjay kumar\Downloads\SMITHAPURELIFE\public\logo_icon_new.png', [System.Drawing.Imaging.ImageFormat]::Png)
$iconGraphics.Dispose()
$iconBmp.Dispose()

# Crop the text (bottom part)
$textRect = New-Object System.Drawing.Rectangle(40, 250, 420, 160)
$textBmp = New-Object System.Drawing.Bitmap($textRect.Width, $textRect.Height)
$textGraphics = [System.Drawing.Graphics]::FromImage($textBmp)
$textGraphics.DrawImage($img, (New-Object System.Drawing.Rectangle(0, 0, $textBmp.Width, $textBmp.Height)), $textRect, [System.Drawing.GraphicsUnit]::Pixel)
$textBmp.Save('C:\Users\D sanjay kumar\Downloads\SMITHAPURELIFE\public\logo_text_new.png', [System.Drawing.Imaging.ImageFormat]::Png)
$textGraphics.Dispose()
$textBmp.Dispose()

$img.Dispose()
Write-Host "Cropping done!"
