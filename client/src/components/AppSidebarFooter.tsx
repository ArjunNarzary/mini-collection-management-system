import { Button } from "./ui/button"
import { ChevronsUpDown, LogOutIcon, SettingsIcon } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
} from "@radix-ui/react-dropdown-menu"
import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { useLogoutUserMutation } from "@/services"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { logOut, selectUser } from "@/services/auth/authSlice"
import { apiSlice } from "@/services/apiSlice"
import { AppPath } from "@/routes"
import { getFirstTwoChars } from "@/lib/utils"

const menus = [
  {
    label: "Setting",
    icon: SettingsIcon,
  },
  {
    label: "Logout",
    icon: LogOutIcon,
  },
]

const AppSidebarFooter = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(selectUser)

  const [logoutUser] = useLogoutUserMutation()
  const handleMenuClick = async (label: string) => {
    if (label === menus[1].label) {
      await logoutUser()
      dispatch(logOut())
      dispatch(apiSlice.util.resetApiState())
      navigate(AppPath.login, { replace: true })
    }
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="justify-between py-[1.5rem] w-full"
        >
          <RenderAvatar name={user?.name || ""} email={user?.email || ""} />
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 border-[1px] p-2 rounded-md mb-2 bg-white shadow-lg"
        align="center"
      >
        <DropdownMenuLabel>
          <RenderAvatar name={user?.name || ""} email={user?.email || ""} />
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {menus.map((menu) => (
            <DropdownMenuItem
              key={menu.label}
              onClick={() => handleMenuClick(menu.label)}
            >
              <menu.icon />
              <span>{menu.label}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default AppSidebarFooter

const RenderAvatar = ({ name, email }: { name: string; email: string }) => {
  return (
    <div className="flex items-center gap-x-2 w-full">
      <Avatar className="rounded-md">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>{getFirstTwoChars(name)}</AvatarFallback>
      </Avatar>
      <div className="text-left">
        <h6 className="text-sm leading-3 font-semibold">{name}</h6>
        <span className="text-xs font-light">{email}</span>
      </div>
    </div>
  )
}
