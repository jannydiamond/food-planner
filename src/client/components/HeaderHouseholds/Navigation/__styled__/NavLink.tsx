import { NavLink as RouterLink } from 'react-router-dom'
import styled from 'styled-components/macro'

const NavLink = styled(RouterLink)`
  position: relative;

  display: flex;
  align-items: center;

  height: 48px;
  padding: 0 8px;

  text-decoration: none;

  &::after {
    content: '';

    position: absolute;
    bottom: 0;
    left: 50%;
    height: 1px;
    width: 0%;

    background-color: ${(props) => props.theme.colors.primary.light};

    transform: translateX(-50%);
    transition: all 0.2s ease-in-out;
  }

  &:hover::after {
    width: 100%;
    height: 1px;
  }

  &.active {
    color: white;
    pointer-events: none;

    &::after {
      width: 100%;
      height: 1px;
      background-color: white;
    }
  }
`

export default NavLink
