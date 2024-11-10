"use client";
import { Formik, Form } from "formik";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import Table from "@/components/table/Table";
import LockIcon from "@/assets/icons/LockIcon";
import UserIcon from "@/assets/icons/UserIcon";
import MailIcon from "@/assets/icons/MailIcon";
import ViewIcon from "@/assets/icons/ViewIcon";
import EditIcon from "@/assets/icons/EditIcon";
import PhoneIcon from "@/assets/icons/PhoneIcon";
import DeleteIcon from "@/assets/icons/DeleteIcon";
import LocationIcon from "@/assets/icons/LocationIcon";
import Preloader from "@/components/loading/Preloader";
import InputGroup from "@/components/inputs/InputGroup";
import SelectInput from "@/components/inputs/SelectInput";
import useSearchQueryParam from "@/lib/useSearchQueryParam";
import { useSearchParams, useRouter } from "next/navigation";
import InputTextArea from "@/components/inputs/InputTextarea";
import AlertMessageModal from "@/components/modal/AlertMessageModal";
import GlobalPagination from "@/components/pagination/GlobalPagination";
import {
  useGetUserQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from "../slice";

const UserListPage = () => {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const searchParams = useSearchParams();
  const [page, setPage] = useState<number>(1);
  const { setQueryParams } = useSearchQueryParam();
  const [openAlert, setOpenAlert] = useState(false);
  const [userModalType, setUserModalType] = useState<any>(null);
  const activePage: string | null = searchParams.get("page");
  const [openAddUserModal, setOpenAddUserModal] = useState(false);
  const skipQuery = !page;

  const {
    data: user,
    isLoading,
    isError,
  } = useGetUserQuery({ page }, { skip: skipQuery });

  const [addUser] = useAddUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const handelAddUser = async (values: any, action: any) => {
    const res: any = await addUser(values);

    if (res?.data?.code === 200) {
      setData(null);
      setUserModalType(null);
      setOpenAddUserModal(false);
      action.resetForm();

      toast.success("User add successfully.");
    } else {
      toast.error(res?.error?.data?.message);
    }
  };

  const handleUpdateUser = async (values: any, action: any) => {
    const res: any = await updateUser(values);

    if (res?.data?.code === 200) {
      setData(null);
      setUserModalType(null);
      setOpenAddUserModal(false);
      action.resetForm();

      toast.success("User update successfully.");
    } else {
      toast.error(res?.error?.data?.message);
    }
  };

  const handleDeleteUesr = async (user: any) => {
    const res = await deleteUser(user);

    if (res.data?.code === 200) {
      setData(null);
      setOpenAlert(false);

      toast.success("User deleted successfully.");
    } else {
      toast.error(res?.data?.message);
    }
  };

  const handlePagination = (value: number) => {
    let url: string | null = searchParams?.toString();

    url = setQueryParams(url, "page", value.toString());

    setPage(value);

    router.push(`/admin/user${url ? `?${url}` : ""}`);
  };

  const columns = [
    {
      label: "Name",
      path: "user_name",
      content: (row: any) => <td className="p-2 text">{row.user_name}</td>,
    },
    {
      label: "Email",
      path: "email",
      content: (row: any) => <td className="p-2 text-center">{row.email}</td>,
    },
    {
      label: "Status",
      path: "email_verify",
      content: (row: any) => (
        <td
          className={`p-2 capitalize text-center ${
            row.email_verify === "verified" ? "text-green-700" : " text-red-700"
          }`}
        >
          {row.email_verify}
        </td>
      ),
    },
    {
      label: "Gender",
      path: "gender",
      content: (row: any) => (
        <td className="p-2 capitalize text-center">{row.gender}</td>
      ),
    },
    {
      label: "Role",
      path: "role",
      content: (row: any) => (
        <td className="p-2 capitalize text-center">{row.role}</td>
      ),
    },
    {
      label: "Phone",
      path: "phone",
      content: (row: any) => <td className="p-2 text-center">{row.phone}</td>,
    },
    {
      label: "Action",
      path: "",
      content: (row: any) => (
        <td className="p-2 text-center">
          <div className="flex gap-1.5 items-center justify-center">
            <button
              type="button"
              className="text-blue-400"
              onClick={() => {
                setData(row);
                setOpenAddUserModal(true);
                setUserModalType({ type: "viewUser" });
              }}
            >
              <ViewIcon />
            </button>

            <button
              type="button"
              className="text-green-500"
              onClick={() => {
                setData(row);
                setOpenAddUserModal(true);
                setUserModalType({ type: "updateUser" });
              }}
            >
              <EditIcon />
            </button>

            <button
              type="button"
              className="text-red-500"
              onClick={() => {
                setData(row);
                setOpenAlert(true);
              }}
            >
              <DeleteIcon />
            </button>
          </div>
        </td>
      ),
    },
  ];

  useEffect(() => {
    if (activePage) {
      setPage(Number(activePage));
    }
  }, []);

  return (
    <main className="max-md:px-2.5 max-md:py-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">User List</h2>

        <button
          type="button"
          onClick={() => {
            setOpenAddUserModal(true);
            setUserModalType({ type: "addUser" });
          }}
          className="bg-green-500 px-5 py-1.5 rounded-lg text-white"
        >
          Add User
        </button>
      </div>
      <div className="mt-4">
        {isLoading && !isError && (
          <div className="flex justify-center items-center h-40">
            <Preloader title="Page Loading.." />
          </div>
        )}

        {user && !isLoading && !isError && (
          <Table
            columns={columns}
            items={user?.data}
            className="min-w-[1050px] w-full"
          />
        )}

        {!isLoading && !isError && user?.pagination?.totalItems > 10 && (
          <GlobalPagination
            page={page}
            limit={10}
            total_element={user?.pagination?.totalItems}
            handlePagination={(value: number) => handlePagination(value)}
          />
        )}

        {user?.pagination?.totalItems <= 0 && !isLoading && !isError && (
          <div className="flex justify-center items-center h-20">
            <h3>Data Not Found</h3>
          </div>
        )}
      </div>

      {openAddUserModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto w-full h-[80%] overflow-y-auto scrollbar-custom">
            <div className="w-full">
              <Formik
                initialValues={{
                  id: data?._id ? data?._id : "",
                  role: data?.role ? data?.role : "",
                  email: data?.email ? data?.email : "",
                  phone: data?.phone ? data?.phone : "",
                  gender: data?.gender ? data?.gender : "",
                  address: data?.address ? data?.address : "",
                  user_name: data?.user_name ? data?.user_name : "",
                  bath_date: data?.bath_date ? data?.bath_date : "",
                  about_you: data?.about_you ? data?.about_you : "",
                }}
                onSubmit={(values, action) => {
                  console.log(userModalType);

                  if (userModalType?.type === "addUser") {
                    handelAddUser(values, action);
                  } else if (userModalType?.type === "updateUser") {
                    handleUpdateUser(values, action);
                  }
                }}
                // validationSchema={userProfileUpdateSchema}
              >
                {({ handleSubmit }) => (
                  <Form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-3">
                      <InputGroup
                        type="text"
                        label="Name"
                        name="user_name"
                        placeholder="name"
                        icon={<UserIcon />}
                        disabled={
                          userModalType?.type === "viewUser" ? true : false
                        }
                      />

                      <InputGroup
                        type="email"
                        name="email"
                        label="Email"
                        icon={<MailIcon />}
                        placeholder="example@example.com"
                        disabled={
                          userModalType?.type === "viewUser" ? true : false
                        }
                      />

                      <InputGroup
                        label="Password"
                        type="password"
                        name="password"
                        icon={<LockIcon />}
                        placeholder="XXXXXXXXXXXX"
                        disabled={
                          userModalType?.type === "viewUser" ? true : false
                        }
                      />

                      <SelectInput
                        name="gender"
                        label="Gender"
                        items={[
                          { id: "male", title: "Male" },
                          { id: "female", title: "Female" },
                        ]}
                        disabled={
                          userModalType?.type === "viewUser" ? true : false
                        }
                      />

                      <SelectInput
                        name="role"
                        label="Role"
                        items={[
                          { id: "user", title: "User" },
                          { id: "admin", title: "Admin" },
                        ]}
                        disabled={
                          userModalType?.type === "viewUser" ? true : false
                        }
                      />

                      <InputGroup
                        type="date"
                        name="bath_date"
                        label="Birth of Date"
                        placeholder=""
                        disabled={
                          userModalType?.type === "viewUser" ? true : false
                        }
                      />

                      <InputGroup
                        type="text"
                        name="address"
                        label="Address"
                        placeholder="example@example.com"
                        icon={<LocationIcon fill="#6B7280" />}
                        disabled={
                          userModalType?.type === "viewUser" ? true : false
                        }
                      />

                      <InputGroup
                        type="phone"
                        name="phone"
                        label="Phone"
                        placeholder="000 0000 0000"
                        icon={<PhoneIcon fill="#6B7280" />}
                        disabled={
                          userModalType?.type === "viewUser" ? true : false
                        }
                      />

                      <InputTextArea
                        name="about_you"
                        label="About you"
                        placeholder="I am"
                        disabled={
                          userModalType?.type === "viewUser" ? true : false
                        }
                      />
                    </div>

                    <div
                      className={`mt-5 grid gap-4 ${
                        userModalType?.type === "viewUser"
                          ? "grid-cols-1"
                          : "grid-cols-2"
                      }`}
                    >
                      <button
                        className="bg-slate-400 font-medium text-center rounded-lg  py-2 px-5 text-md text-white border border-[#DBDBDB] font-secondary"
                        onClick={() => {
                          setOpenAddUserModal(false);
                          setUserModalType(null);
                        }}
                      >
                        Cancel
                      </button>

                      {userModalType?.type !== "viewUser" && (
                        <button className="bg-primary-color font-medium text-center rounded-lg  py-2 px-5 text-md text-black-600 border border-[#DBDBDB] font-secondary">
                          {userModalType?.type === "updateUser"
                            ? "Update"
                            : "Add"}
                        </button>
                      )}
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      )}

      {openAlert && (
        <AlertMessageModal
          handleClose={() => {
            setData(null);
            setOpenAlert(false);
          }}
          handleSuccess={() => handleDeleteUesr(data)}
        />
      )}
    </main>
  );
};

export default UserListPage;
