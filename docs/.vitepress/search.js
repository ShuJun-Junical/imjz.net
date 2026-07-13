export function tokenizeSearchText(text) {
  return text.toLowerCase().match(/[\p{Script=Han}]|[\p{L}\p{N}]+/gu) ?? []
}
