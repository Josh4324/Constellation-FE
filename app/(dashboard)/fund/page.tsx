/* eslint-disable @next/next/no-async-client-component */
/* eslint-disable */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useAccount, useNetwork, useBalance } from "wagmi";
import { erc20ABI } from "wagmi";
import { eco } from "@/utils/constant";
import ecoABI from "../../../abi/eco.json";
import { ethers } from "ethers";
import { toast } from "react-toastify";

export default function Fund() {
  const { chain } = useNetwork();
  const { address } = useAccount();
  const [action, setActions] = useState(0);
  const [waste, setWaste] = useState(0);
  const [trees, setTrees] = useState(0);
  const [users, setUsers] = useState(0);
  const [paid, setPaid] = useState(0);

  const createWriteContract = async () => {
    const { ethereum } = window;
    const provider = new ethers.BrowserProvider(ethereum);
    const signer = await provider.getSigner();

    const ecoContract = new ethers.Contract(eco, ecoABI.abi, signer);
    return ecoContract;
  };

  const createReadContract = async () => {
    const { ethereum } = window;
    const provider = new ethers.BrowserProvider(ethereum);
    const contract = new ethers.Contract(eco, ecoABI.abi, provider);
    return contract;
  };

  const getContractData = async () => {
    const contract = await createReadContract();
    const data = await contract.getContractData();
    setActions(data[0]);
    setWaste(data[1]);
    setTrees(data[2]);
    setUsers(data[3]);
    setPaid(data[4]);
  };

  useEffect(() => {
    getContractData();
  }, []);

  const {
    data: balance1,
    isError: isError1,
    isLoading: isLoad,
  } = useBalance({
    address: eco,
  });

  const {
    data: balance2,
    isError,
    isLoading,
  } = useBalance({
    address: address,
  });

  const amountRef = useRef();

  const fund = async (evt) => {
    evt.preventDefault();
    const contract = await createWriteContract();
    const amount = ethers.parseEther(amountRef.current.value);

    const id = toast.loading("Transaction in progress..");

    try {
      const tx = await contract.donateOrFund({ value: amount });
      await tx.wait();
      toast.update(id, {
        render: "Funded Successfully",
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

  return (
    <section className="container flex flex-col  gap-6 py-8 md:max-w-[64rem] md:py-12 lg:py-24">
      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 flex justify-between px-12 py-12 rounded-md">
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
            {Number(trees)} trees
          </div>
        </div>
      </div>

      <div className="mt-10 flex justify-between">
        <div className="w-full">
          <div className="mb-6">
            Contract Balance -{" "}
            <span className="text-lg pt-6  font-bold">
              {Number(balance1?.formatted).toFixed(4)}
            </span>
          </div>
          <div className="mb-6">
            My Balance -{" "}
            <span className="text-lg pt-6  font-bold">
              {Number(balance2?.formatted).toFixed(4)}
            </span>
          </div>
          <div>
            <input
              type="text"
              className={cn(
                "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              )}
              placeholder="Enter the amount (avax)"
              ref={amountRef}
            />
          </div>

          <button
            className={` ${cn(buttonVariants())} mt-3 w-1/2 mx-auto`}
            style={{ display: "block" }}
            onClick={fund}
          >
            Fund
          </button>
        </div>
      </div>
    </section>
  );
}
