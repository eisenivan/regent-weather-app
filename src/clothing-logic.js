import { shouldWearACoat, shouldBringSunglasses, shouldBringAnUmbrella } from "./rules";
import _ from 'lodash'
import { filter } from 'regent'

const images = [
  { src: 'https://images-na.ssl-images-amazon.com/images/I/61wJrHgEj9L._SX385_.jpg', rule: shouldWearACoat },
  { src: 'https://i.warbycdn.com/-/p/men-robinson-sunglasses-jet-black-matte-angle-871-d407a730/1200x630', rule: shouldBringSunglasses },
  { src: 'https://images-na.ssl-images-amazon.com/images/I/71md9jHDSgL._SL1500_.jpg', rule: shouldBringAnUmbrella },
]

export const filterImages = _.curry(filter)(images)

export default images
