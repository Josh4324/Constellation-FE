/* eslint-disable @next/next/no-async-client-component */
/* eslint-disable */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
"use client";

import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useAccount, useNetwork } from "wagmi";
import { eco } from "@/utils/constant";
import ecoABI from "../../../abi/eco.json";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { Web3Storage } from "web3.storage";

export default function OrderPage() {
  const { chain } = useNetwork();
  const network = chain?.network;
  const [state, setState] = useState("1");
  const [fileUrl, setFileUrl] = useState("");
  const [fileUrl1, setFileUrl1] = useState("");
  const [fileUrl2, setFileUrl2] = useState("");

  const createWriteContract = async () => {
    const { ethereum } = window;
    const provider = new ethers.BrowserProvider(ethereum);
    const signer = await provider.getSigner();

    const ecoContract = new ethers.Contract(eco, ecoABI.abi, signer);
    return ecoContract;
  };

  const actionTypeRef = useRef();

  const weightRef = useRef();
  const sortRef = useRef();

  const treeRef = useRef();
  const locationRef = useRef();

  const createAction = async (evt) => {
    evt.preventDefault();
    const contract = await createWriteContract();

    if (fileUrl === "" || fileUrl1 === "") {
      return toast.error("Document upload is in progress");
    }

    const id = toast.loading("Transaction in progress..");

    try {
      const tx = await contract.registerAction(
        actionTypeRef.current.value,
        fileUrl,
        fileUrl1
      );

      await tx.wait();
      setTimeout(() => {
        window.location.href = "/";
      }, 10000);

      toast.update(id, {
        render: "Transaction successfull, Environmental Action Created",
        type: "success",
        isLoading: false,
        autoClose: 10000,
        closeButton: true,
      });
    } catch (error) {
      console.log(error);
      toast.update(id, {
        render: `${error.reason}`,
        type: "error",
        isLoading: false,
        autoClose: 10000,
        closeButton: true,
      });
    }
  };

  const createWaste = async (evt) => {
    evt.preventDefault();
    const contract = await createWriteContract();

    const id = toast.loading("Transaction in progress..");
    const sort = sortRef.current.value === "true" ? true : false;

    console.log(sortRef.current.value);

    try {
      const tx = await contract.registerWaste(weightRef.current.value, sort);

      await tx.wait();
      setTimeout(() => {
        window.location.href = "/";
      }, 10000);

      toast.update(id, {
        render: "Transaction successfull, Waste Action Created",
        type: "success",
        isLoading: false,
        autoClose: 10000,
        closeButton: true,
      });
    } catch (error) {
      console.log(error);
      toast.update(id, {
        render: `${error.reason}`,
        type: "error",
        isLoading: false,
        autoClose: 10000,
        closeButton: true,
      });
    }
  };

  const createTree = async (evt) => {
    evt.preventDefault();
    const contract = await createWriteContract();

    if (fileUrl2 === "") {
      return toast.error("Document upload is in progress");
    }

    const id = toast.loading("Transaction in progress..");

    try {
      const tx = await contract.registerTrees(treeRef.current.value, fileUrl2);

      await tx.wait();
      setTimeout(() => {
        window.location.href = "/";
      }, 10000);

      toast.update(id, {
        render: "Transaction successfull, Tree Planting Action Created",
        type: "success",
        isLoading: false,
        autoClose: 10000,
        closeButton: true,
      });
    } catch (error) {
      console.log(error);
      toast.update(id, {
        render: `${error.reason}`,
        type: "error",
        isLoading: false,
        autoClose: 10000,
        closeButton: true,
      });
    }
  };

  async function onChange(e) {
    const file = e.target.files[0];
    try {
      toast.info("Uploading Document......");
      const client = new Web3Storage({
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGNiRGZhNDBBYjBEZTcwNTkwNURERDg4RTAwOWMzOTM3OGEzOWRhMmYiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NDk5MjExMTU1NDYsIm5hbWUiOiJXZWIzIn0._kphTIOj4s98lZpgrkcHCSxAmW7j15CNEYd5qbWULjs",
      });

      const cid = await client.put(e.target.files, {
        name: file.name,
        maxRetries: 3,
      });

      const url = `https://ipfs.io/ipfs/${cid}/${file.name}`;
      console.log(url);
      toast.success("Document uploaded successfully");
      setFileUrl(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  async function onChange2(e) {
    const file = e.target.files[0];
    try {
      toast.info("Uploading Document......");

      const client = new Web3Storage({
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGNiRGZhNDBBYjBEZTcwNTkwNURERDg4RTAwOWMzOTM3OGEzOWRhMmYiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NDk5MjExMTU1NDYsIm5hbWUiOiJXZWIzIn0._kphTIOj4s98lZpgrkcHCSxAmW7j15CNEYd5qbWULjs",
      });

      const cid = await client.put(e.target.files, {
        name: file.name,
        maxRetries: 3,
      });

      const url = `https://ipfs.io/ipfs/${cid}/${file.name}`;
      console.log(url);
      toast.success("Document uploaded successfully");
      setFileUrl1(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  async function onChange3(e) {
    const file = e.target.files[0];
    try {
      toast.info("Uploading Document......");
      const client = new Web3Storage({
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGNiRGZhNDBBYjBEZTcwNTkwNURERDg4RTAwOWMzOTM3OGEzOWRhMmYiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NDk5MjExMTU1NDYsIm5hbWUiOiJXZWIzIn0._kphTIOj4s98lZpgrkcHCSxAmW7j15CNEYd5qbWULjs",
      });

      const cid = await client.put(e.target.files, {
        name: file.name,
        maxRetries: 3,
      });

      const url = `https://ipfs.io/ipfs/${cid}/${file.name}`;
      console.log(url);
      toast.success("Document uploaded successfully");
      setFileUrl2(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  return (
    <section className="container flex flex-col  gap-6 py-8 md:max-w-[64rem] md:py-12 lg:py-24">
      <div className="flex justify-between w-3/4 mb-5 mobile2">
        <button
          onClick={() => setState("1")}
          className={` ${cn(buttonVariants())} mt-3 `}
        >
          Enviromental Action
        </button>

        <button
          onClick={() => setState("2")}
          className={` ${cn(buttonVariants())} mt-3 `}
        >
          Enviromental Action (Waste)
        </button>

        <button
          onClick={() => setState("3")}
          className={` ${cn(buttonVariants())} mt-3 `}
        >
          Enviromental Action (Tree Planting)
        </button>
      </div>

      {state === "1" ? (
        <div className="mx-auto flex w-full flex-col gap-4 md:max-w-[58rem]">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-3xl">
            Create Environmental Action
          </h2>

          <div className="bg-green-950 rounded-md px-3 py-3">
            This form allows you to create an environmental action, the links
            should contain the right information, the information will be
            reviewed by the admin and points will be awarded if the claims can
            be confirmed.
          </div>

          <form onSubmit={createAction} className="mt-5">
            <div className="grid gap-2">
              <div className="grid gap-1 mb-3">
                <label>Select Action Type</label>
                <select
                  ref={actionTypeRef}
                  className={cn(
                    "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  )}
                >
                  <option>Select Action Type</option>
                  <option>Reducing Water Usage</option>
                  <option>Energy Conservation</option>
                  <option>Sustainable Transportation</option>
                  <option>Reducing Single-Use Plastics</option>
                </select>
              </div>
              <div className="grid gap-1 mb-3">
                <div className="flex w-full justify-between">
                  <div>Upload Document describing the Enviromental action</div>

                  <div>
                    <a
                      download
                      href="https://res.cloudinary.com/josh4324/raw/upload/v1701080953/EA_fn4jcn.docx"
                    >
                      Download Sample Doc
                    </a>
                  </div>
                </div>

                <input
                  className={cn(
                    "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  )}
                  required
                  type="file"
                  onChange={onChange}
                />
              </div>
              <div className="grid gap-1 mb-3">
                <div className="flex w-full justify-between">
                  <div>
                    {" "}
                    Upload Document containing proof of Enviromental Actions
                  </div>

                  <div>
                    <a
                      download
                      href="https://res.cloudinary.com/josh4324/raw/upload/v1701082634/EA1_kjvmos.docx"
                    >
                      Download Sample Doc
                    </a>
                  </div>
                </div>

                <input
                  className={cn(
                    "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  )}
                  required
                  type="file"
                  onChange={onChange2}
                />
              </div>
              <button className={` ${cn(buttonVariants())} mt-3 `}>
                Create Action
              </button>
            </div>
          </form>
        </div>
      ) : null}

      {state === "2" ? (
        <div className="mx-auto flex w-full flex-col gap-4 md:max-w-[58rem]">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-3xl">
            Create Environmental Action (Waste)
          </h2>

          <div className="bg-green-950 rounded-md px-3 py-3">
            This form allows you to create a environmental action for reusable
            waste like tires, plastics, nylon and others, the point assigned for
            this action is determined by the weight of the waste. This waste
            must be submitted at our approved centers to be awarded your points.
          </div>

          <form onSubmit={createWaste} className="mt-5">
            <div className="grid gap-2">
              <div className="grid gap-1 mb-3">
                <label>Enter the weight of the waste</label>
                <input
                  type="text"
                  className={cn(
                    "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  )}
                  placeholder="Enter the weight of the waste"
                  required
                  ref={weightRef}
                />
              </div>
              <div className="grid gap-1 mb-3">
                <label>Is waste sorted</label>
                <select
                  ref={sortRef}
                  className={cn(
                    "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  )}
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </div>

              <button className={` ${cn(buttonVariants())} mt-3 `}>
                Create Waste Action
              </button>
            </div>
          </form>
        </div>
      ) : null}

      {state === "3" ? (
        <div className="mx-auto flex w-full flex-col gap-4 md:max-w-[58rem]">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-3xl">
            Create Environmental Action (Tree Planting)
          </h2>

          <div className="bg-green-950 rounded-md px-3 py-3">
            This form allows you to create a environmental action for planting
            of trees. The number of tress will determine the point awarded
          </div>

          <form onSubmit={createTree} className="mt-5">
            <div className="grid gap-2">
              <div className="grid gap-1 mb-3">
                <label>Enter the number of trees planted</label>
                <input
                  type="text"
                  className={cn(
                    "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  )}
                  placeholder="Enter the number of trees planted"
                  required
                  ref={treeRef}
                />
              </div>
              <div className="grid gap-1 mb-3">
                <div className="flex w-full justify-between">
                  <div>
                    {" "}
                    Upload document containing locations of trees planted
                  </div>

                  <div>
                    <a
                      download
                      href="https://res.cloudinary.com/josh4324/raw/upload/v1701087159/EA2_lo6lax.docx"
                    >
                      Download Sample Doc
                    </a>
                  </div>
                </div>
                <input
                  type="file"
                  className={cn(
                    "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  )}
                  required
                  type="file"
                  onChange={onChange3}
                />
              </div>

              <button className={` ${cn(buttonVariants())} mt-3 `}>
                Create Tree Planting Action
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </section>
  );
}
