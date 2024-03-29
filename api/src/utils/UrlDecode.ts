export function urlDecode(encodedString: string): string {
  const decodedString = decodeURIComponent(encodedString);

  return decodedString.replace("###DOTCOM###", ".com");
}
export function urlEncode(inputString: string): string {
  const stringWithoutDotCom = inputString.replace(".com", "###DOTCOM###");
  const encodedString = encodeURIComponent(stringWithoutDotCom);
  return encodedString;
}
