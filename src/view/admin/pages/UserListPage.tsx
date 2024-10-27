"use client";
import { Formik, Form } from "formik";
import { useGetUserQuery } from "../slice";
import { useState, useEffect } from "react";
import Table from "@/components/table/Table";
import UserIcon from "@/assets/icons/UserIcon";
import MailIcon from "@/assets/icons/MailIcon";
import PhoneIcon from "@/assets/icons/PhoneIcon";
import Preloader from "@/components/loading/Preloader";
import InputGroup from "@/components/inputs/InputGroup";
import SelectInput from "@/components/inputs/SelectInput";
import useSearchQueryParam from "@/lib/useSearchQueryParam";
import { useSearchParams, useRouter } from "next/navigation";
import InputTextArea from "@/components/inputs/InputTextarea";
import GlobalPagination from "@/components/pagination/GlobalPagination";
import ViewIcon from "@/assets/icons/ViewIcon";
import EditIcon from "@/assets/icons/EditIcon";
import DeleteIcon from "@/assets/icons/DeleteIcon";
import LocationIcon from "@/assets/icons/LocationIcon";
import LockIcon from "@/assets/icons/LockIcon";

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
          <button type="button" className="text-blue-400">
            <ViewIcon />
          </button>

          <button type="button" className="text-green-500">
            <EditIcon />
          </button>

          <button type="button" className="text-red-500">
            <DeleteIcon />
          </button>
        </div>
      </td>
    ),
  },
];

const UserListPage = () => {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const searchParams = useSearchParams();
  const [page, setPage] = useState<number>(1);
  const { setQueryParams } = useSearchQueryParam();
  const activePage: string | null = searchParams.get("page");
  const [openAddUserModal, setOpenAddUserModal] = useState(false);
  const skipQuery = !page;

  const {
    data: user,
    isLoading,
    isError,
  } = useGetUserQuery({ page }, { skip: skipQuery });

  const handlePagination = (value: number) => {
    let url: string | null = searchParams?.toString();

    url = setQueryParams(url, "page", value.toString());

    setPage(value);

    router.push(`/admin/user${url ? `?${url}` : ""}`);
  };

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
          onClick={() => setOpenAddUserModal(true)}
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
            {/* Close Button */}
            <button
              onClick={() => setOpenAddUserModal(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            >
              ✕
            </button>

            <div className="w-full">
              <Formik
                initialValues={{
                  email: data?.data?.email ? data?.data?.email : "",
                  phone: data?.data?.phone ? data?.data?.phone : "",
                  gender: data?.data?.gender ? data?.data?.gender : "",
                  address: data?.data?.address ? data?.data?.address : "",
                  user_name: data?.data?.user_name ? data?.data?.user_name : "",
                  bath_date: data?.data?.bath_date ? data?.data?.bath_date : "",
                  about_you: data?.data?.about_you ? data?.data?.about_you : "",
                }}
                // onSubmit={handleSubmit}
                onSubmit={() => console.log("hi")}
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
                      />

                      <InputGroup
                        type="email"
                        name="email"
                        label="Email"
                        disabled={true}
                        icon={<MailIcon />}
                        placeholder="example@example.com"
                      />

                      <InputGroup
                        label="Password"
                        type="password"
                        name="password"
                        icon={<LockIcon />}
                        placeholder="XXXXXXXXXXXX"
                      />

                      <SelectInput
                        name="gender"
                        label="Gender"
                        items={[
                          { id: "male", title: "Male" },
                          { id: "female", title: "Female" },
                        ]}
                      />

                      <SelectInput
                        name="role"
                        label="Role"
                        items={[
                          { id: "user", title: "User" },
                          { id: "admin", title: "Admin" },
                        ]}
                      />

                      <InputGroup
                        type="date"
                        name="bath_date"
                        label="Birth of Date"
                        placeholder=""
                      />

                      <InputGroup
                        type="text"
                        name="address"
                        label="Address"
                        icon={<LocationIcon fill="#6B7280" />}
                        placeholder="example@example.com"
                      />

                      <InputGroup
                        type="phone"
                        name="phone"
                        label="Phone"
                        icon={<PhoneIcon fill="#6B7280" />}
                        placeholder="01715378419"
                      />

                      <InputTextArea
                        name="about_you"
                        label="About you"
                        placeholder="I am"
                      />
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-4">
                      <button className="bg-slate-400 font-medium text-center rounded-lg  py-2 px-5 text-md text-white border border-[#DBDBDB] font-secondary">
                        Cancel
                      </button>

                      <button className="bg-primary-color font-medium text-center rounded-lg  py-2 px-5 text-md text-black-600 border border-[#DBDBDB] font-secondary">
                        Update info
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default UserListPage;
