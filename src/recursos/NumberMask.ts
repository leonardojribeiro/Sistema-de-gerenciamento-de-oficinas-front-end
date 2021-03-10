export default function numberMask(value: string, mask: (size: number) => string) {
  const valueReplaced = value.replace(/[^\d]+/g, "");
  const maskParsed = mask(valueReplaced.length);
  let valueMasked = "";
  let counter = 0;
  for (let i = 0; i < maskParsed.length; i++) {
    let character = maskParsed.charAt(i)
    if (character === '0') {
      if (counter < valueReplaced.length) {
        valueMasked = valueMasked.concat(valueReplaced.charAt(counter));
        counter++;
      }
      else {
        break;
      }
    }
    else {
      if (counter < valueReplaced.length) {
        valueMasked = valueMasked.concat(character);
      }
    }
  }
  return valueMasked;
}

export  function mask(value: string, mask: string) {
  const valueReplaced = value.replace(/[^\d]+/g, "");
  let valueMasked = "";
  let counter = 0;
  for (let i = 0; i < mask.length; i++) {
    let character = mask.charAt(i)
    if (character === '0') {
      if (counter < valueReplaced.length) {
        valueMasked = valueMasked.concat(valueReplaced.charAt(counter));
        counter++;
      }
      else {
        break;
      }
    }
    else {
      if (counter < valueReplaced.length) {
        valueMasked = valueMasked.concat(character);
      }
    }
  }
  return valueMasked;
}



mask("62123456789", "(00) 00000-0000")
//Valor retornado: "(62) 12345-6789"

