/* eslint-disable @next/next/no-async-client-component */
/* eslint-disable */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useAccount, useNetwork } from "wagmi";
import { lot } from "@/utils/constant";
import lotABI from "../../../abi/lot.json";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { GET_ALL_USER } from "../../../queries";
import { subgraphQuery } from "../../../utils";

export default function Leader() {
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [winner, setWinner] = useState("");

  const getuserData = async () => {
    const users = await subgraphQuery(GET_ALL_USER());
    const data = users.users;
    const sortCurrent = Array.from(data).sort(
      (a, b) => Number(b.score) - Number(a.score)
    );
    const sortAll = Array.from(data).sort(
      (a, b) => Number(b.overall_score) - Number(a.overall_score)
    );
    if (data) {
      setData(sortCurrent);
      setData1(sortAll);
    }
  };

  const createReadContract = async () => {
    const { ethereum } = window;
    const provider = new ethers.BrowserProvider(ethereum);
    const contract = new ethers.Contract(lot, lotABI.abi, provider);
    return contract;
  };

  const getWinner = async () => {
    const contract = await createReadContract();
    const data = await contract.s_recentWinner();
    console.log(data);
    setWinner(data);
  };

  useEffect(() => {
    getuserData();
    getWinner();
  }, []);

  return (
    <section className="container flex flex-col  gap-6 py-8 md:max-w-[64rem] md:py-12 lg:py-24">
      <div className="pb-6">
        Lastest Winner of the ECO4REWARD Lottery: {winner}
      </div>

      <div className="font-bold text-lg">Current Leaders</div>

      <section style={{ marginTop: "30px", overflowX: "auto" }} className="">
        <table className="font-heading mx-auto w-98 text-white px-3 table-auto w-full">
          <tbody>
            <tr className="font-heading">
              <th>Id</th>
              <th>Medal</th>
              <th>User</th>
              <th>Score</th>
            </tr>
            {data.map((item, index) => {
              return (
                <tr className="text-center">
                  <td className="py-6">{String(item?.id)}</td>
                  <td className="py-6">
                    {index === 0 ? (
                      <img
                        src="./gold.png"
                        style={{ width: "50px", marginLeft: "30px" }}
                      />
                    ) : index === 1 ? (
                      <img
                        src="./silver.png"
                        style={{ width: "50px", marginLeft: "30px" }}
                      />
                    ) : index === 2 ? (
                      <img
                        src="./bronze.png"
                        style={{ width: "50px", marginLeft: "30px" }}
                      />
                    ) : (
                      ""
                    )}
                  </td>
                  <td>{item.user}</td>
                  <td>{Number(item.score)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      <div className="font-bold text-lg mt-10">All Time Leaders</div>

      <section style={{ marginTop: "30px", overflowX: "auto" }} className="">
        <table className="font-heading mx-auto w-98 text-white px-3 table-auto w-full">
          <tbody>
            <tr className="font-heading">
              <th>Id</th>
              <th>Medal</th>
              <th>User</th>
              <th>Score</th>
            </tr>
            {data1.map((item, index) => {
              return (
                <tr className="text-center">
                  <td className="py-6">{String(item?.id)}</td>
                  <td className="py-6">
                    {index === 0 ? (
                      <img
                        src="./gold.png"
                        style={{ width: "50px", marginLeft: "30px" }}
                      />
                    ) : index === 1 ? (
                      <img
                        src="./silver.png"
                        style={{ width: "50px", marginLeft: "30px" }}
                      />
                    ) : index === 2 ? (
                      <img
                        src="./bronze.png"
                        style={{ width: "50px", marginLeft: "30px" }}
                      />
                    ) : (
                      ""
                    )}
                  </td>
                  <td>{item.user}</td>
                  <td>{Number(item.overall_score)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </section>
  );
}
