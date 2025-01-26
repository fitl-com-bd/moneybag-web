import { FC } from "react"

export type NavItem = {
  label: string
  value: string
  disabled?: boolean
}

type NavProps = {
  items: NavItem[]
  value: string
  setValue: (value: string) => void
}

export const Nav: FC<NavProps> = ({ items, value, setValue }) => {
  return (
    <ul className="nav nav-vertical flex-column" role="navigation">
      {items.map(item => (
        <li className="nav-item" key={item.label}>
          <button
            type="button"
            className={`nav-link ${value === item.value ? "active" : ""}`}
            // href={item.value}
            onClick={e => {
              e.preventDefault()
              if (item.disabled) return
              setValue(item.value)
            }}
            tabIndex={item.disabled ? -1 : undefined}>
            {item.label}
          </button>
        </li>
      ))}
    </ul>
  )
}
