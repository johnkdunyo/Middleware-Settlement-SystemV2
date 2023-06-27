import { SideBarProvider } from "@/hooks/useSideBarHook";
import React from "react";
import { ToastContainer } from "react-toastify";
import API from "@/network/api";
import { useSession } from "next-auth/react";
import SideBar from "@/components/SideBar";
import Navbar from "@/components/navbars";

const AuthLayout = (props: { [x: string]: any; children: any }) => {
  const { children, ...customMeta } = props;

  const { data: session } = useSession();
  const token = session?.user.bearerToken;

  if (token) {
    // console.log(token);
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return (
    <>
      <SideBarProvider>
        <div className="flex w-full">
          <SideBar />
          <div className="w-full  h-screen">
            <div className="flex h-screen  flex-col justify-start w-full ">
              <Navbar />
              <main className="fixed  mx-auto px-4  w-full ">{children}</main>
            </div>
          </div>
        </div>
      </SideBarProvider>
    </>
  );
};

export default AuthLayout;
