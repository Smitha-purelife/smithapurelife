Add-Type -AssemblyName System.Drawing

$files = @(
  @{ in='herbal_wash_hero_padding.png'; out='herbal_wash_hero_ultrawide.png' },
  @{ in='pro_repair_serum_hero_padding.png'; out='pro_repair_serum_hero_ultrawide.png' },
  @{ in='follicra_hero_padding.png'; out='follicra_hero_ultrawide.png' }
)

foreach ($file in $files) {
    $imgPath = "C:\Users\D sanjay kumar\Downloads\SMITHAPURELIFE\public\products\"
    $outPath = "C:\Users\D sanjay kumar\Downloads\SMITHAPURELIFE\public\products\"
    
    $img = [System.Drawing.Image]::FromFile($imgPath)
    $bmp = New-Object System.Drawing.Bitmap 2560, 1024
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    
    # Draw original image on the right side
    $g.DrawImage($img, 2560 - 1024, 0, 1024, 1024)
    
    # We want to fill the left side (0 to 1536).
    # To make it seamless, let's take a 1-pixel wide vertical strip from the left edge of the original image (at x=0)
    # and stretch it across the entire left area!
    $srcRect = New-Object System.Drawing.Rectangle 0, 0, 1, 1024
    $destRect = New-Object System.Drawing.Rectangle 0, 0, 1536, 1024
    
    # Draw the stretched edge
    $g.DrawImage($img, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
    
    $bmp.Save($outPath)
    $g.Dispose()
    $bmp.Dispose()
    $img.Dispose()
    Write-Host "Processed "
}
