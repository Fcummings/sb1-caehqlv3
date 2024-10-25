import html2canvas from 'html2canvas'

export async function saveIconAsPNG() {
  const logoElement = document.getElementById('clkk-logo')
  if (!logoElement) return

  try {
    const canvas = await html2canvas(logoElement, {
      backgroundColor: null,
      scale: 2,
      logging: false,
      useCORS: true
    })

    const link = document.createElement('a')
    link.download = 'clkk-logo.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
  } catch (error) {
    console.error('Error saving logo:', error)
  }
}