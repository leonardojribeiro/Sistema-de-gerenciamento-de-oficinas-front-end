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