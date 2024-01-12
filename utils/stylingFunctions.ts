
const colors = [
  '#734595',
  '#9D4C82',
  '#2B789D',
  '#4868A7',
]

export const getColor = (index : number): string => {
  let n = index

  if (index > colors.length - 1 ){
    n = index % colors.length
  }

  return colors[n]

}