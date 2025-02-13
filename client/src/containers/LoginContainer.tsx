import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { z } from "zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { loginFormSchema } from "@/schemas"
import { useNavigate } from "react-router"
import { useDispatch } from "react-redux"
import { useLoginUserMutation } from "@/services"
import { setToken } from "@/services/auth/authSlice"
import { AppPath } from "@/routes"
import { APIError } from "@/interfaces"
import { toast } from "sonner"

const LoginContainer = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loginUser, { isLoading }] = useLoginUserMutation()

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data: z.infer<typeof loginFormSchema>) => {
    try {
      const response = await loginUser(data).unwrap()
      if (response.success) {
        toast.success("Login successful")
        dispatch(setToken(response))
        navigate(AppPath.base)
      }
    } catch (error: unknown) {
      const apiError = error as APIError
      toast.error(apiError?.data?.message || "Something went wrong")
    }
  }

  return (
    <main className="h-screen w-full justify-center items-center flex">
      <Card className="w-80 md:w-[30rem]">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-center">
                <Button
                  type="submit"
                  className="w-full md:w-[10rem]"
                  disabled={isLoading}
                >
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  )
}

export default LoginContainer
