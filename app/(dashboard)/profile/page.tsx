/* eslint-disable @next/next/no-async-client-component */
/* eslint-disable */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { erc20ABI } from "wagmi";
import { buttonVariants } from "@/components/ui/button";
import { useAccount, useNetwork, useBalance } from "wagmi";
import { eco } from "@/utils/constant";
import ecoABI from "../../../abi/eco.json";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { GET_ACTIONS, GET_WASTES, GET_TREES, GET_USER } from "../../../queries";
import { subgraphQuery } from "../../../utils";

export default function Profile() {
  const { chain } = useNetwork();
  const [state, setState] = useState("1");
  const { address } = useAccount();
  const [point, setPoint] = useState(0);
  const [over, setOver] = useState(0);
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [action, setAction] = useState(0);
  const [waste, setWaste] = useState(0);
  const [tree, setTree] = useState(0);
  const pointRef = useRef();
  const {
    data: balance,
    isError,
    isLoading,
  } = useBalance({
    address: address,
  });

  const createWriteContract = async () => {
    const { ethereum } = window;
    const provider = new ethers.BrowserProvider(ethereum);
    const signer = await provider.getSigner();

    const ecoContract = new ethers.Contract(eco, ecoABI.abi, signer);
    return ecoContract;
  };

  const getUserData = async () => {
    const user = await subgraphQuery(GET_USER(address));
    const data = user.users;
    if (data) {
      setPoint(data[0].score);
      setOver(data[0].overall_score);
      setAction(data[0].actions);
      setTree(data[0].trees);
      setWaste(data[0].waste);
    }
  };

  const getActions = async () => {
    const actions = await subgraphQuery(GET_ACTIONS(address));
    const data = actions.actions;
    if (data) {
      setData(data);
    }
  };

  const getWaste = async () => {
    const waste = await subgraphQuery(GET_WASTES(address));
    const data = waste.wastes;

    if (data) {
      setData1(data);
    }
  };

  const getTrees = async () => {
    const tree = await subgraphQuery(GET_TREES(address));
    const data = tree.trees;
    if (data) {
      setData2(data);
    }
  };

  const withdraw = async (evt) => {
    evt.preventDefault();
    const contract = await createWriteContract();

    const id = toast.loading("Transaction in progress..");

    try {
      const tx = await contract.getPaid(pointRef.current.value);
      await tx.wait();
      toast.update(id, {
        render: "Withdrawal Successfully",
        type: "success",
        isLoading: false,
        autoClose: 10000,
        closeButton: true,
      });

      setTimeout(() => {
        window.location.reload();
      }, 10000);
    } catch (error) {
      console.log(error);
      toast.update(id, {
        render: `${error.reason}`,
        type: "error",
        isLoading: false,
        autoClose: 1000,
        closeButton: true,
      });
    }
  };

  useEffect(() => {
    getUserData();
    getActions();
    getWaste();
    getTrees();
  }, []);

  return (
    <section className="container flex flex-col  gap-6 py-8 md:max-w-[64rem] md:py-12 lg:py-24">
      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 mobile2 flex justify-between px-12 py-12 rounded-md">
        <div>
          <div className="text-center text-2xl">Environmental Actions</div>
          <div className="text-center text-lg pt-6 font-bold">
            {Number(action)}
          </div>
        </div>
        <div>
          <div className="text-center text-2xl">
            Environmental Actions (Waste)
          </div>
          <div className="text-center text-lg pt-6 font-bold">
            {Number(waste)} kg
          </div>
        </div>
        <div>
          <div className="text-center text-2xl">
            Environmental Actions (Trees Planted)
          </div>
          <div className="text-center text-lg pt-6 font-bold">
            {Number(tree)} trees
          </div>
        </div>
      </div>

      <div className="mt-10 flex mobile2 justify-between">
        <div className="w-6/12 ninput">
          <div>
            <input
              type="text"
              className={cn(
                "flex h-9 w-full  rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              )}
              placeholder="Enter the number of points to convert to avax coin"
              ref={pointRef}
            />
          </div>

          <button
            onClick={withdraw}
            className={` ${cn(buttonVariants())} mt-3 `}
          >
            Withdraw
          </button>
        </div>

        <div className="w-4/12">
          <div>
            Overall Point -{" "}
            <span className="text-lg pt-6 font-bold">{Number(over)}</span>
          </div>
          <div>
            Current Point -{" "}
            <span className="text-lg pt-6 font-bold">{Number(point)}</span>
          </div>
          <div>
            Avax Balance -{" "}
            <span className="text-lg pt-6 font-bold">
              {balance?.formatted !== "NaN"
                ? Number(balance?.formatted).toFixed(4)
                : ""}
            </span>
          </div>
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
                      {" "}
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
              </tr>
              {data1.map((item) => {
                return (
                  <tr className="text-center">
                    <td className="py-6">{String(item?.id)}</td>
                    <td>{Number(item.weight)}</td>
                    <td>{item.sorted ? "True" : "False"}</td>
                    <td className="px-3">{item.creator}</td>
                    <td>
                      {item.status && item.confirmed
                        ? "Approved"
                        : item.status === false && item.confirmed === false
                        ? "Pending"
                        : "Rejected"}
                    </td>
                    <td>{item.confirmed ? "Evaluated" : "Pending"}</td>
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
                    <td className="px-3">{item.creator}</td>
                    <td>
                      {item.status && item.confirmed
                        ? "Approved"
                        : item.status === false && item.confirmed === false
                        ? "Pending"
                        : "Rejected"}
                    </td>
                    <td>{item.confirmed ? "Evaluated" : "Pending"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      ) : null}
    </section>
  );
}
