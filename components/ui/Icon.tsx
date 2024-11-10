import { FC } from "react"
import { BsThreeDotsVertical } from "react-icons/bs"
import { FaRegEye, FaRegFileAlt } from "react-icons/fa"
import { FaLink, FaRegCircleUser, FaRegCopy, FaRegEnvelope } from "react-icons/fa6"
import { FiChevronDown, FiEdit3, FiEye, FiEyeOff, FiFilter, FiLogOut, FiSearch, FiUser, FiX } from "react-icons/fi"
import { MdMenu } from "react-icons/md"
import { PiDotsThreeCircle } from "react-icons/pi"
import {
  RiAddLine,
  RiArrowLeftLine,
  RiDashboardLine,
  RiDeleteBin6Line,
  RiEdit2Line,
  RiExchangeDollarLine,
  RiFileAddLine,
  RiFileList3Line,
  RiUser3Line,
  RiUserAddLine,
} from "react-icons/ri"

export const ICONS = {
  home: RiDashboardLine,
  user: FiUser,
  exchange: RiExchangeDollarLine,
  filter: FiFilter,
  report: FaRegFileAlt,
  menu: MdMenu,
  userCircle: FaRegCircleUser,
  dotsCircle: BsThreeDotsVertical,
  dotsHorizontalCircle: PiDotsThreeCircle,
  details: FaRegEye,
  view: FaRegEye,
  edit: FiEdit3,
  signOut: FiLogOut,
  integration: RiEdit2Line,
  copy: FaRegCopy,
  invoice: RiFileList3Line,
  customer: RiUser3Line,
  createUser: RiUserAddLine,
  back: RiArrowLeftLine,
  createInvoice: RiFileAddLine,
  add: RiAddLine,
  delete: RiDeleteBin6Line,
  email: FaRegEnvelope,
  link: FaLink,
  eye: FiEye,
  eyeOff: FiEyeOff,
  search: FiSearch,
  x: FiX,
  chevronDown: FiChevronDown,
}

type IconProps = {
  name: keyof typeof ICONS
  onClick?: () => void
  className?: string
  size?: number
  style?: any
  role?: string
}

export const ICON_NAMES = Object.keys(ICONS) as string[]

export const Icon: FC<IconProps> = ({ name, onClick, className, size = 20, style, ...props }) => {
  if (!ICON_NAMES.includes(name)) return null

  const Component = ICONS[name]

  return (
    <Component
      style={{ width: `${size}px`, height: `${size}px`, ...style }}
      className={className}
      onClick={onClick}
      {...props}
    />
  )
}
