import { useEffect, useState } from 'react';
import getContract from './recycle/getContract';
import Web3 from 'web3';
import axios from 'axios';

declare global {
  interface Window {
    ethereum?: any;
  }
}

export default function UserPage() {
  const [account, setAccount] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [web3, setWeb3] = useState<Web3>();
  const [myStatus, setMyStatus] = useState({
    postingCount: 0,
    rewardTotal: "0",
    grade: "General",
    badge0: 0,
    badge1: 0,
    badge2: 0,
  });




  const {
    UserABIContract,
    STKTokenABIContract,
    BadgeABIContract,
    userContract,
    stkTokenContract,
    badgeNFTContract,
  } = getContract();

  useEffect(() => {
    if (window.ethereum) {
      const instance = new Web3(window.ethereum);
      setWeb3(instance);
    } else {
      ;
    }
  }, []);

  useEffect(() => {
    console.log(myStatus);

  }, [myStatus])

  const connectWallet = async () => {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    const selectedAddress = accounts[0];
    setAccount(selectedAddress);
    await getMyStatus();
  };

  const handlePostSubmit = () => {
    if (!title || !content) return alert("제목과 내용을 입력해주세요!");
    const newPost = {
      title,
      content,
      date: new Date().toLocaleString(),
    };
    // setPosts([newPost, ...posts]);
    setTitle("");
    setContent("");
  };

  const getMyStatus = async () => {
    if (!web3 || !account || !userContract) return;

    try {
      const result = await userContract.methods.getMyStatus().call({ from: account }) as {
        postingCount: bigint;
        rewardTotal: bigint;
        grade: string;
        badge0: bigint;
        badge1: bigint;
        badge2: bigint;
      };

      setMyStatus({
        postingCount: Number(result.postingCount),
        rewardTotal: Number(result.rewardTotal).toString(), // 문자열로 변환
        grade: result.grade,
        badge0: Number(result.badge0),
        badge1: Number(result.badge1),
        badge2: Number(result.badge2),
      });



    } catch (error) {
      console.error("getMyStatus error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto space-y-8">

        <div className="grid grid-cols-2 gap-6 items-start">
          <div>
            <p className="text-sm text-gray-700 mb-2">지갑 주소: {account}</p>
            <div className="">
              <button onClick={connectWallet} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl shadow">
                🦊 wallet Connect
              </button>

              <button onClick={getMyStatus} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-xl shadow">
                정보 불러오기
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-white p-4 rounded-2xl shadow-md">
              <p className="text-sm text-gray-500">작성한 글 수</p>
              <p className="text-xl font-bold text-blue-600">{myStatus.postingCount}</p>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow-md">
              <p className="text-sm text-gray-500">보유 STK</p>
              <p className="text-xl font-bold text-green-600">{myStatus.rewardTotal} STK</p>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow-md">
              <p className="text-sm text-gray-500">등급</p>
              <p className="text-xl font-bold text-yellow-600">{myStatus.grade}</p>
            </div>
          </div>
        </div>

        {/* 🏅 보유 배지 */}
        <div className="bg-white p-4 rounded-2xl shadow-md">
          <h2 className="text-lg font-bold mb-4 text-gray-800">My Badge</h2>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-gray-50 p-3 rounded-xl shadow-sm">
              <p className="text-base font-semibold">🥈 GOOD</p>
              <p className="text-xl font-bold text-blue-600 mt-1">{myStatus.badge0}개</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-xl shadow-sm">
              <p className="text-base font-semibold">🥇 BEST</p>
              <p className="text-xl font-bold text-yellow-500 mt-1">{myStatus.badge1}개</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-xl shadow-sm">
              <p className="text-base font-semibold">🏆 EXCELLENT</p>
              <p className="text-xl font-bold text-purple-600 mt-1">{myStatus.badge2}개</p>
            </div>
          </div>
        </div>

        {/* ✍️ 글 작성 */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-bold mb-4 text-gray-800"> write</h2>
          <input
            type="text"
            placeholder="제목을 입력하세요"
            className="w-full mb-3 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            // rows="3"
            placeholder="내용을 입력하세요"
            className="w-full mb-3 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="flex justify-end">
            <button
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-xl"
              onClick={handlePostSubmit}
            >
              작성하기
            </button>
          </div>
        </div>

        {/* 📋 작성 글 목록 */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">list</h2>
          <ul className="space-y-4">
            {/* {posts.map((post, idx) => (
              <li key={idx} className="border p-4 rounded-xl shadow-sm bg-gray-50">
                <p className="font-semibold text-gray-700">제목: {post.title}</p>
                <p className="text-sm text-gray-600">내용: {post.content}</p>
                <p className="text-xs text-gray-400 mt-1">작성일: {post.date}</p>
              </li> */}
            {/* ))} */}
          </ul>
        </div>
      </div>
    </div>
  );
}