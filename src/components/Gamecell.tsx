import React from 'react'
import { Cell } from '../styled-components'

// Компонент Gamecell
// Отрисовывает отдельную клетку в игре
// Принимает value, своё значение (null или Х или О)
// Принимает onClick, функцию которая будет запускаться при клике на клетку
// Принимает isClickable, флаг который будет определять: запустится ли onClick при клике, или не надо?
const Gamecell = ({ value, onClick, isClickable }) => {
  return (
    // На onClick есть проверка: 
    // если isClickable=true, то при клике запустится onClick
    // если isClickable=false, то при клике вернётся null и ничего не произойдёт
    <Cell onClick={() => isClickable ? onClick() : null}>
        {value}
    </Cell>
  )
}

export default Gamecell