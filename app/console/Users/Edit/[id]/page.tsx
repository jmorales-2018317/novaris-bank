"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Form from "@/app/console/components/Form";
import { updatedDate } from "@/app/tools/datesFormatter";

interface User {
  name: string;
  username: string;
  email: string;
  password: string;
  dpi: string;
  address: string;
  phone: string;
  work: string;
  salary: string;
  role: string;
}

export default function Page({ params }: { params: { id: string } }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dpi, setDpi] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [work, setWork] = useState("");
  const [salary, setSalary] = useState("");
  const [role, setRole] = useState("");
  const [updatedAt, setUpdatedAt] = useState(new Date(Date.now()));
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    async function getUser() {
      const res = await fetch(`/api/user/${params.id}`, {
        next: { revalidate: 100 },
      });

      if (!res.ok) {
        setError(true);
      }

      const user: User = await res.json();
      setUser(user);
      setLoading(false);
    }

    getUser();
  }, []);

  const handleSave = async () => {

    //Change updatedAd to the actual Date
    setUpdatedAt(updatedAt)
    updatedDate(updatedAt);

    const newUser: User = {
      name,
      username,
      email,
      password,
      dpi,
      address,
      phone,
      work,
      salary,
      role
    };

    if(newUser.name == "") newUser.name = `${user?.name}`
    if(newUser.username == "") newUser.username = `${user?.username}`
    if(newUser.email == "") newUser.email = `${user?.email}`
    if(newUser.password == "") newUser.password = `${user?.password}`
    if(newUser.dpi == "") newUser.dpi = `${user?.dpi}`
    if(newUser.address == "") newUser.address = `${user?.address}`
    if(newUser.phone == "") newUser.phone = `${user?.phone}`
    if(newUser.work == "") newUser.work = `${user?.work}`
    if(newUser.salary == "") newUser.salary = `${user?.salary}`
    if(newUser.role == "") newUser.role = `${user?.role}`

    try {
      const res = await fetch(`/api/user/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (!res.ok) throw new Error(res.statusText);
    } catch (error) {
      console.error("Error updating User:", error);
    }
  };


  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>An error has occurred</div>;
  }

  return (
    <div className="w-full h-full">
      <div className="p-6 text-3xl font-semibold text-violet-900">
        Edit User
      </div>

      <div>
        <div className="p-6 pt-0">
          <div className="p-6 bg-white dark:bg-slate-800 rounded-md shadow-md">
            <h2 className="text-xl text-gray-800 dark:text-white font-semibold capitalize">
              Credentials:
            </h2>

            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-2">
                <Form
                  name={"Name"}
                  type={"text"}
                  placeholder={"Insert Name"}
                  defaultValue={user?.name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Form
                  name={"Username"}
                  type={"text"}
                  placeholder={"Insert Username"}
                  defaultValue={user?.username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Form
                  name={"Email"}
                  type={"text"}
                  placeholder={"Insert Email"}
                  defaultValue={user?.email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Form
                  name={"Password"}
                  type={"text"}
                  placeholder={"Insert Password"}
                  defaultValue={user?.password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Form
                  name={"DPI"}
                  type={"text"}
                  placeholder={"Insert DPI"}
                  defaultValue={user?.dpi}
                  onChange={(e) => setDpi(e.target.value)}
                />
                <Form
                  name={"Phone"}
                  type={"text"}
                  placeholder={"Insert Phone"}
                  defaultValue={user?.phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <Form
                  name={"Work"}
                  type={"text"}
                  placeholder={"Insert Work"}
                  defaultValue={user?.work}
                  onChange={(e) => setWork(e.target.value)}
                />
                <Form
                  name={"Salary"}
                  type={"text"}
                  placeholder={"Insert Salary"}
                  defaultValue={user?.salary}
                  onChange={(e) => setSalary(e.target.value)}
                />
                <Form
                  name={"Role"}
                  type={"text"}
                  placeholder={"Insert Role"}
                  defaultValue={user?.role}
                  onChange={(e) => setRole(e.target.value)}
                />
              </div>
              <div className="flex justify-between mt-5">
                <Link
                  href="/console/Users"
                  className=" px-4 py-2 text-md font-normal text-white-900 bg-red-600 text-white rounded-xl max-w-fit hover:bg-red-500"
                >
                  Cancel
                </Link>
                <a
                  href="/console/Users"
                  className="ml-2 px-4 py-2 text-md font-normal text-white-900 bg-violet-800 text-white rounded-xl max-w-fit hover:bg-violet-700"
                  onClick={() => handleSave()}
                >
                  Save
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
