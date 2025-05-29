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
  const [account, setAccount] = useState("0x...");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);

  const {
    UserABIContract,
    userNftTokenContract,
  } = getContract();

  const [stkAmount, setStkAmount] = useState();
  const [grade, setGrade] = useState();
  const [badges, setBadges] = useState({
    GOOD: 0,
    BEST: 0,
    EXCELLENT: 0,
  });

  const connectWallet = async () => {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    const selectedAddress = accounts[0];
    setAccount(selectedAddress);
  };

  const handlePostSubmit = () => {
    if (!title || !content) return alert("제목과 내용을 입력해주세요!");
    const newPost = {
      title,
      content,
      date: new Date().toLocaleString(),
    };
    setPosts([newPost, ...posts]);
    setTitle("");
    setContent("");
  };

  const getStaytus = async (tokenId: string) => {
    if (!web3 || !account) return;
    try {
      await userNftTokenContract.methods.getAllMembers().call();
      alert("판매 등록 완료(권한 위임 완료)")
    } catch (error) {
      console.log("판매 등록 실패", error);
    }
  }
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* 🧭 상단: 지갑 정보 + 통계 */}
        <div className="grid grid-cols-2 gap-6 items-start">
          <div>
            <p className="text-sm text-gray-700 mb-2">지갑 주소: {account}</p>
            <button onClick={connectWallet} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl shadow">
              🦊 wallet Connect
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-white p-4 rounded-2xl shadow-md">
              <p className="text-sm text-gray-500">작성한 글 수</p>
              <p className="text-xl font-bold text-blue-600">{posts.length}</p>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow-md">
              <p className="text-sm text-gray-500">보유 STK</p>
              <p className="text-xl font-bold text-green-600">{stkAmount} STK</p>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow-md">
              <p className="text-sm text-gray-500">등급</p>
              <p className="text-xl font-bold text-yellow-600">{grade}</p>
            </div>
          </div>
        </div>

        {/* 🏅 보유 배지 */}
        <div className="bg-white p-4 rounded-2xl shadow-md">
          <h2 className="text-lg font-bold mb-4 text-gray-800">My Badge</h2>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-gray-50 p-3 rounded-xl shadow-sm">
              <p className="text-base font-semibold">🥈 GOOD</p>
              <p className="text-xl font-bold text-blue-600 mt-1">{badges.GOOD}개</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-xl shadow-sm">
              <p className="text-base font-semibold">🥇 BEST</p>
              <p className="text-xl font-bold text-yellow-500 mt-1">{badges.BEST}개</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-xl shadow-sm">
              <p className="text-base font-semibold">🏆 EXCELLENT</p>
              <p className="text-xl font-bold text-purple-600 mt-1">{badges.EXCELLENT}개</p>
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
            rows="3"
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
            {posts.map((post, idx) => (
              <li key={idx} className="border p-4 rounded-xl shadow-sm bg-gray-50">
                <p className="font-semibold text-gray-700">제목: {post.title}</p>
                <p className="text-sm text-gray-600">내용: {post.content}</p>
                <p className="text-xs text-gray-400 mt-1">작성일: {post.date}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}