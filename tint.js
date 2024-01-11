function updateHexValue() {
  // Get the color input value
  const colorInput = document.getElementById('colorInput')
  const colorValue = colorInput.value
  // Convert the color value to hex and set the hex input value
  const hexValue = hexToRgb(colorValue)
  const hexInput = document.getElementById('hexInput')
  hexInput.value = colorValue
}
updateHexValue()
const colorInput = document.getElementById('colorInput')
const message = document.querySelector('#message')
function generateBoxes() {
  // Get the hex color value from the input element
  const hexColor = colorInput.value
  // Convert the hex color value to an RGB color value
  const rgbColor = hexToRgb(hexColor)
  console.log(rgbColor)
  // Generate 10 boxes with decreasing opacity
  const boxesContainer = document.getElementById('boxContainer')
  boxesContainer.innerHTML = ''
  for (let i = 0; i < 10; i++) {
    const opacity = 1 - i * 0.1
    const toFixOpacity = opacity.toFixed(2)
    const rgbaColor = `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, ${toFixOpacity})`
    const box = document.createElement('div')
    const copyButton = document.createElement('button')
    copyButton.innerHTML = `<i class="uil uil-copy"></i>`
    box.appendChild(copyButton)
    box.classList.add('box')
    box.style.backgroundColor = rgbaColor
    copyButton.addEventListener('click', function () {
      const hexColorcode = rgbaToHex(rgbaColor)
      window.navigator.clipboard.writeText(hexColorcode)
      message.classList.add('show')
      message.innerHTML = `${hexColorcode}`
      setTimeout(() => {
        message.classList.remove('show')
      }, 3000)
    })
    boxesContainer.appendChild(box)
  }
}
function hexToRgb(hexValue) {
  // Remove the # symbol from the hex value
  const hex = hexValue.replace('#', '')
  // Check if the hex value is valid
  if (!/^[0-9A-F]{6}$/i.test(hex)) {
    throw new Error('Invalid hex color value')
  }
  // Convert the hex value to an RGB value
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)
  // Check if the RGB values are valid
  if (
    isNaN(r) ||
    isNaN(g) ||
    isNaN(b) ||
    r < 0 ||
    r > 255 ||
    g < 0 ||
    g > 255 ||
    b < 0 ||
    b > 255
  ) {
    throw new Error('Invalid RGB color value')
  }
  // Return the RGB color value
  return { r, g, b }
}
function rgbaToHex(rgbaValue) {
  let rgbaArray = rgbaValue.substring(5, rgbaValue.length - 1).split(',')
  let red = parseInt(rgbaArray[0].trim())
  let green = parseInt(rgbaArray[1].trim())
  let blue = parseInt(rgbaArray[2].trim())
  let alpha = Math.round(parseFloat(rgbaArray[3].trim()) * 255)
  let redHex = red.toString(16).padStart(2, '0')
  let greenHex = green.toString(16).padStart(2, '0')
  let blueHex = blue.toString(16).padStart(2, '0')
  let alphaHex = alpha.toString(16).padStart(2, '0')
  return '#' + redHex + greenHex + blueHex + alphaHex
}
generateBoxes()