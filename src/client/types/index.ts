import { RenderModalType } from 'client/hooks/useModal'

export type SelectOption = {
  readonly value: string | null
  readonly label: string
}

export type Modal = {
  show: () => void
  hide: () => void
  isVisible: boolean
  RenderModal: RenderModalType
}
