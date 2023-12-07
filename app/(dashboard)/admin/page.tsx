/* eslint-disable @next/next/no-async-client-component */
/* eslint-disable */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useAccount, useNetwork } from "wagmi";
import { eco } from "@/utils/constant";
import ecoABI from "../../../abi/eco.json";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import {
  GET_ALL_ACTIONS,
  GET_ALL_WASTES,
  GET_ALL_TREES,
  GET_ALL_USER,
} from "../../../queries";
import { subgraphQuery } from "../../../utils";

export default function Admin() {
  const { chain } = useNetwork();
  const network = chain?.network;
  const scoreRef = useRef();
  const addRef = useRef();
  const [state, setState] = useState("1");
  const [mstate, setMstate] = useState(false);
  const [mstate1, setMstate1] = useState(false);
  const [mstate2, setMstate2] = useState(false);
  const [id, setId] = useState(0);
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);

  const createWriteContract = async () => {
    const { ethereum } = window;
    const provider = new ethers.BrowserProvider(ethereum);
    const signer = await provider.getSigner();

    const ecoContract = new ethers.Contract(eco, ecoABI.abi, signer);
    return ecoContract;
  };

  const getActions = async () => {
    const actions = await subgraphQuery(GET_ALL_ACTIONS());
    const data = actions.actions;
    if (data) {
      setData(data);
    }
  };

  const getWaste = async () => {
    const waste = await subgraphQuery(GET_ALL_WASTES());
    const data = waste.wastes;

    if (data) {
      setData1(data);
    }
  };

  const getTrees = async () => {
    const tree = await subgraphQuery(GET_ALL_TREES());
    const data = tree.trees;
    if (data) {
      setData2(data);
    }
  };

  const addAdmin = async (evt) => {
    evt.preventDefault();
    const contract = await createWriteContract();

    const id = toast.loading("Transaction in progress..");

    try {
      const tx = await contract.addAdmin(addRef.current.value);

      await tx.wait();
      setTimeout(() => {
        window.location.href = "/";
      }, 10000);

      toast.update(id, {
        render: "Transaction successfull, Admin added",
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

  const approveAction = async (id, score) => {
    const contract = await createWriteContract();

    const id1 = toast.loading("Transaction in progress..");

    try {
      const tx = await contract.confirmAction(id, score, true);

      await tx.wait();
      setTimeout(() => {
        window.location.reload();
      }, 10000);

      toast.update(id1, {
        render: "Transaction successfull, Confirmed successfully",
        type: "success",
        isLoading: false,
        autoClose: 10000,
        closeButton: true,
      });
    } catch (error) {
      console.log(error);
      toast.update(id1, {
        render: `${error.reason}`,
        type: "error",
        isLoading: false,
        autoClose: 10000,
        closeButton: true,
      });
    }
  };

  const rejectAction = async (id) => {
    const contract = await createWriteContract();

    const id1 = toast.loading("Transaction in progress..");

    try {
      const tx = await contract.confirmAction(id, 0, false);

      await tx.wait();
      setTimeout(() => {
        window.location.reload();
      }, 10000);

      toast.update(id1, {
        render: "Transaction successfull, Confirmed successfully",
        type: "success",
        isLoading: false,
        autoClose: 10000,
        closeButton: true,
      });
    } catch (error) {
      console.log(error);
      toast.update(id1, {
        render: `${error.reason}`,
        type: "error",
        isLoading: false,
        autoClose: 10000,
        closeButton: true,
      });
    }
  };

  const approveWaste = async (id, score) => {
    const contract = await createWriteContract();

    console.log(id);
    console.log(score);

    const id1 = toast.loading("Transaction in progress..");

    try {
      const tx = await contract.confirmWaste(id, score, true);

      await tx.wait();
      setTimeout(() => {
        window.location.reload();
      }, 10000);

      toast.update(id1, {
        render: "Transaction successfull, Confirmed successfully",
        type: "success",
        isLoading: false,
        autoClose: 10000,
        closeButton: true,
      });
    } catch (error) {
      console.log(error);
      toast.update(id1, {
        render: `${error.reason}`,
        type: "error",
        isLoading: false,
        autoClose: 10000,
        closeButton: true,
      });
    }
  };

  const rejectWaste = async (id) => {
    const contract = await createWriteContract();

    const id1 = toast.loading("Transaction in progress..");

    try {
      const tx = await contract.confirmWaste(id, 0, false);

      await tx.wait();
      setTimeout(() => {
        window.location.reload();
      }, 10000);

      toast.update(id1, {
        render: "Transaction successfull, Confirmed successfully",
        type: "success",
        isLoading: false,
        autoClose: 10000,
        closeButton: true,
      });
    } catch (error) {
      console.log(error);
      toast.update(id1, {
        render: `${error.reason}`,
        type: "error",
        isLoading: false,
        autoClose: 10000,
        closeButton: true,
      });
    }
  };

  const approveTree = async (id, score) => {
    const contract = await createWriteContract();

    const id1 = toast.loading("Transaction in progress..");

    try {
      const tx = await contract.confirmTress(id, score, true);

      await tx.wait();
      setTimeout(() => {
        window.location.reload();
      }, 10000);

      toast.update(id1, {
        render: "Transaction successfull, Confirmed successfully",
        type: "success",
        isLoading: false,
        autoClose: 10000,
        closeButton: true,
      });
    } catch (error) {
      console.log(error);
      toast.update(id1, {
        render: `${error.reason}`,
        type: "error",
        isLoading: false,
        autoClose: 10000,
        closeButton: true,
      });
    }
  };

  const rejectTree = async (id) => {
    const contract = await createWriteContract();

    const id1 = toast.loading("Transaction in progress..");

    try {
      const tx = await contract.confirmTrees(id, 0, false);

      await tx.wait();
      setTimeout(() => {
        window.location.reload();
      }, 10000);

      toast.update(id1, {
        render: "Transaction successfull, Confirmed successfully",
        type: "success",
        isLoading: false,
        autoClose: 10000,
        closeButton: true,
      });
    } catch (error) {
      console.log(error);
      toast.update(id1, {
        render: `${error.reason}`,
        type: "error",
        isLoading: false,
        autoClose: 10000,
        closeButton: true,
      });
    }
  };

  useEffect(() => {
    getActions();
    getWaste();
    getTrees();
  }, []);

  return (
    <section className="container flex flex-col  gap-6 py-8 md:max-w-[64rem] md:py-12 lg:py-24">
      <div className="mt-10 flex justify-between">
        <div className="w-6/12">
          <div>
            <input
              type="text"
              className={cn(
                "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              )}
              ref={addRef}
              placeholder="Enter Address"
            />
          </div>

          <button
            onClick={addAdmin}
            className={` ${cn(buttonVariants())} mt-3 `}
          >
            Add Admin
          </button>
        </div>
      </div>
      <div className="flex mobile2 justify-between w-3/4 mb-5">
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
        <section style={{ marginTop: "30px", overflowX: "auto" }} className="">
          <div className="mb-3 text-lg font-bold">Actions</div>
          <table className="font-heading mx-auto w-98 text-white px-3 table-auto w-full">
            <tbody>
              <tr className="font-heading">
                <th>Id</th>
                <th>Action Type</th>
                <th>Description Doc</th>
                <th>Proof Doc </th>
                <th>Creator</th>
                <th>Approval Status</th>
                <th>Status</th>
                <th></th>
              </tr>
              {data.map((item) => {
                return (
                  <tr className="text-center">
                    <td className="py-6">{String(item?.id)}</td>
                    <td>{item.action_type}</td>
                    <td>
                      {" "}
                      <a
                        className="text-blue-600"
                        download
                        href={item.description}
                      >
                        Document
                      </a>
                    </td>
                    <td>
                      <a className="text-blue-600" download href={item.proof}>
                        Document
                      </a>
                    </td>
                    <td className="px-3">{item.creator}</td>
                    <td>
                      {item.status && item.confirmed
                        ? "Approved"
                        : item.status === false && item.confirmed === false
                        ? "Pending"
                        : "Rejected"}
                    </td>
                    <td>{item.confirmed ? "Evaluated" : "Pending"}</td>
                    <td>
                      <button
                        onClick={() => {
                          setMstate(true);
                          setId(String(item?.id));
                        }}
                        className={` ${cn(buttonVariants())} ml-4 `}
                      >
                        Confirm
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      ) : null}
      {state === "2" ? (
        <section style={{ marginTop: "30px", overflowX: "auto" }} className="">
          <div className="mb-3 text-lg font-bold">Waste</div>
          <table className="font-heading mx-auto w-98 text-white px-3 table-auto w-full">
            <tbody>
              <tr className="font-heading">
                <th>Id</th>
                <th>Weight</th>
                <th>Sorted</th>
                <th>Creator</th>
                <th>Approval Status</th>
                <th>Status</th>
                <th></th>
              </tr>
              {data1.map((item) => {
                return (
                  <tr className="text-center">
                    <td className="py-6">{String(item?.id)}</td>
                    <td>{Number(item.weight)}</td>
                    <td>{item.sorted ? "True" : "False"}</td>
                    <td>{item.creator}</td>
                    <td>
                      {item.status && item.confirmed
                        ? "Approved"
                        : item.status === false && item.confirmed === false
                        ? "Pending"
                        : "Rejected"}
                    </td>
                    <td>{item.confirmed ? "Evaluated" : "Pending"}</td>
                    <td>
                      <button
                        onClick={() => {
                          setMstate1(true);
                          setId(String(item?.id));
                        }}
                        className={` ${cn(buttonVariants())} ml-4 `}
                      >
                        Confirm
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      ) : null}
      {state === "3" ? (
        <section style={{ marginTop: "30px", overflowX: "auto" }} className="">
          <div className="mb-3 text-lg font-bold">Tree Planting</div>
          <table className="font-heading mx-auto w-98 text-white px-3 table-auto w-full">
            <tbody>
              <tr className="font-heading">
                <th>Id</th>
                <th>Number of Trees</th>
                <th>Locations Doc</th>
                <th>Creator</th>
                <th>Approval Status</th>
                <th>Status</th>
                <th></th>
              </tr>
              {data2.map((item) => {
                return (
                  <tr className="text-center">
                    <td className="py-6">{String(item?.id)}</td>
                    <td>{Number(item.no_of_trees)}</td>
                    <td>
                      {" "}
                      <a
                        className="text-blue-600"
                        download
                        href={item.locations}
                      >
                        Document
                      </a>
                    </td>
                    <td>{item.creator}</td>
                    <td>
                      {item.status && item.confirmed
                        ? "Approved"
                        : item.status === false && item.confirmed === false
                        ? "Pending"
                        : "Rejected"}
                    </td>
                    <td>{item.confirmed ? "Evaluated" : "Pending"}</td>
                    <td>
                      <button
                        onClick={() => {
                          setMstate2(true);
                          setId(String(item?.id));
                        }}
                        className={` ${cn(buttonVariants())} ml-4 `}
                      >
                        Confirm
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      ) : null}

      {mstate ? (
        <div
          style={{ background: "black" }}
          className="w-1/2 mx-auto px-10 py-10 rounded-md modal"
        >
          <div onClick={() => setMstate(false)} className="close">
            Close
          </div>
          <input
            type="text"
            className={cn(
              "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            )}
            placeholder="Enter Score"
            ref={scoreRef}
          />

          <div className="flex w-full justify-between">
            <button
              onClick={() => approveAction(id, scoreRef.current.value)}
              className={` ${cn(buttonVariants())} mt-3 `}
            >
              Approve
            </button>
            <button
              onClick={() => rejectAction(id)}
              className={` ${cn(buttonVariants())} mt-3 `}
            >
              Reject
            </button>
          </div>
        </div>
      ) : null}

      {mstate1 ? (
        <div
          style={{ background: "black" }}
          className="w-1/2 mx-auto px-10 py-10 rounded-md modal"
        >
          <div onClick={() => setMstate1(false)} className="close">
            Close
          </div>
          <input
            type="text"
            className={cn(
              "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            )}
            placeholder="Enter Score"
            ref={scoreRef}
          />

          <div className="flex w-full justify-between">
            <button
              onClick={() => approveWaste(id, scoreRef.current.value)}
              className={` ${cn(buttonVariants())} mt-3 `}
            >
              Approve
            </button>
            <button
              onClick={() => rejectWaste(id)}
              className={` ${cn(buttonVariants())} mt-3 `}
            >
              Reject
            </button>
          </div>
        </div>
      ) : null}

      {mstate2 ? (
        <div
          style={{ background: "black" }}
          className="w-1/2 mx-auto px-10 py-10 rounded-md modal"
        >
          <div onClick={() => setMstate2(false)} className="close">
            Close
          </div>
          <input
            type="text"
            className={cn(
              "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            )}
            placeholder="Enter Score"
            ref={scoreRef}
          />

          <div className="flex w-full justify-between">
            <button
              onClick={() => approveTree(id, scoreRef.current.value)}
              className={` ${cn(buttonVariants())} mt-3 `}
            >
              Approve
            </button>
            <button
              onClick={() => rejectTree(id)}
              className={` ${cn(buttonVariants())} mt-3 `}
            >
              Reject
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
