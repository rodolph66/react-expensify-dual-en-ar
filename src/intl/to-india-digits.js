// converts the english numbers to arabic

export const toIndiaDigits = (numtext) => {

  const id=['\u0660', '\u0661', '\u0662', '\u0663', '\u0664', '\u0665', '\u0666', '\u0667', '\u0668', '\u0669']
  return numtext.replace(/[0-9]/g, function(w) {
    return id[+w]
  })

}

