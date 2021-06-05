/* 
    index.js (defaults)
    <> Filip Rajec
*/

import Styles from "../styles";

export const themeDefault = {
    primary: Styles.colors.basic.green,
    secondary: Styles.colors.basic.pink,
}

export const functionDefault = () => {
    // eslint-disable-next-line no-console
    console.error("Called a function that has not been attached.")
}
