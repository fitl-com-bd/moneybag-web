import { FC } from "react"
import { BsThreeDotsVertical } from "react-icons/bs"
import { FaRegEye, FaRegFileAlt } from "react-icons/fa"
import { FaLink, FaRegCircleUser, FaRegCopy, FaRegEnvelope } from "react-icons/fa6"
import { FiChevronDown, FiEdit, FiEye, FiEyeOff, FiFilter, FiLogOut, FiSearch, FiUser, FiX } from "react-icons/fi"
import { MdMenu } from "react-icons/md"
import { PiDotsThreeCircle } from "react-icons/pi"
import {
  RiAddLine,
  RiAdminLine,
  RiArrowLeftLine,
  RiBankLine,
  RiDashboardLine,
  RiDeleteBin6Line,
  RiEdit2Line,
  RiExchangeDollarLine,
  RiFileAddLine,
  RiFileList2Line,
  RiFileList3Line,
  RiLockPasswordLine,
  RiToolsLine,
  RiUser3Line,
  RiUserAddLine,
  RiUserSettingsLine,
  RiUserUnfollowLine,
  RiWallet2Line,
} from "react-icons/ri"
import { TbEdit, TbEye, TbFilter, TbLock, TbLogout, TbPlus, TbSettings, TbUser } from "react-icons/tb"

export const ICONS = {
  add: TbPlus,
  view: TbEye,
  edit: TbEdit,
  filter: TbFilter,
  lock: TbLock,
  user: TbUser,
  settings: TbSettings,
  signOut: TbLogout,
  home: RiDashboardLine,
  exchange: RiExchangeDollarLine,
  report: FaRegFileAlt,
  menu: MdMenu,
  userCircle: FaRegCircleUser,
  dotsCircle: BsThreeDotsVertical,
  dotsHorizontalCircle: PiDotsThreeCircle,
  details: FaRegEye,
  signOut: FiLogOut,
  integration: RiEdit2Line,
  copy: FaRegCopy,
  invoice: RiFileList3Line,
  customer: RiUser3Line,
  addUser: RiUserAddLine,
  back: RiArrowLeftLine,
  addInvoice: RiFileAddLine,
  delete: RiDeleteBin6Line,
  email: FaRegEnvelope,
  link: FaLink,
  eye: FiEye,
  eyeOff: FiEyeOff,
  search: FiSearch,
  x: FiX,
  chevronDown: FiChevronDown,
  setup: RiUserSettingsLine,
  admin: RiAdminLine,
  merchant: RiUser3Line,
  password: RiLockPasswordLine,
  bank: RiBankLine,
  wallet: RiWallet2Line,
  service: RiToolsLine,
  transaction: RiExchangeDollarLine,
  settlement: RiFileList2Line,
  role: RiUserSettingsLine,
  permission: RiUserUnfollowLine,
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
