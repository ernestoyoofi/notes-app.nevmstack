function GenerateUID() {
  const strg = "abcdef1234567890"
  let str = ""

  for(let __ in Array.from({ length: 18 })) {
    str += strg[Math.floor(Math.random() * strg.length)]
  }

  return str
}

function GenerateHexaRdm() {
  const strg = "abcdef1234567890-"
  let str = ""

  for(let __ in Array.from({ length: 18 })) {
    str += strg[Math.floor(Math.random() * strg.length)]
  }

  return str
}

module.exports = {
  GenerateUID,
  GenerateHexaRdm
}