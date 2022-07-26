import ReactSelect from 'react-select'
import styled from 'styled-components/macro'

const Select = styled((props) => <ReactSelect {...props} />)`
  .ReactSelect {
    &__option {
      color: #333;
      transition: background-color 0.2s ease-in-out;

      &--is-hovered,
      &--is-focused {
        background: ${(props) => props.theme.colors.primary.light};
      }

      &--is-selected {
        color: white;
        background: ${(props) => props.theme.colors.primary.main};
      }
    }
  }
`

export default Select
