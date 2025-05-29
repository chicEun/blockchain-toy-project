import { useState } from "react";

const dummyTokenData = {
    stkTotalSupply: 100000,
    badgeTotalSupply: 5000,
    members: [
        { address: "0xABC123...", stk: 100, badges: 3 },
        { address: "0xDEF456...", stk: 50, badges: 1 },
    ],
};

const dummyUserData = {
    connectedAddresses: [
        { address: "0xABC123...", posts: 5, rank: "BEST" },
        { address: "0xXYZ789...", posts: 1, rank: "GOOD" },
    ],
    memberAddresses: [
        { address: "0xDEF456...", posts: 10, rank: "EXCELLENT" },
        { address: "0xGHI012...", posts: 0, rank: "NORMAL" },
    ],
};

export default function UserAdminPage() {
    const [activeTab, setActiveTab] = useState("token");

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-6xl mx-auto space-y-8">
                <div className="flex space-x-4 mb-8">
                    <button
                        className={`px-6 py-2 rounded-lg font-semibold ${activeTab === "token"
                            ? "bg-blue-600 text-white shadow"
                            : "bg-white border border-gray-300"
                            }`}
                        onClick={() => setActiveTab("token")}
                    >
                        Token Info
                    </button>
                    <button
                        className={`px-6 py-2 rounded-lg font-semibold ${activeTab === "user"
                            ? "bg-blue-600 text-white shadow"
                            : "bg-white border border-gray-300"
                            }`}
                        onClick={() => setActiveTab("user")}
                    >
                        User Info
                    </button>
                </div>

                {activeTab === "token" ? <TokenInfo /> : <UserInfo />}
            </div>
        </div>
    );
}

function TokenInfo() {
    const handleMintSTK = () => {
        alert("STKToken 민트 실행"); // 실제 민트 함수로 교체 필요
    };

    return (
        <>
            <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow text-center">
                    <h2 className="text-xl font-bold mb-2 border-b pb-2">STKToken</h2>
                    <p className="text-lg text-gray-700 mb-4">
                        총 발행량: <span className="font-mono">{dummyTokenData.stkTotalSupply.toLocaleString()}</span> STK
                    </p>
                    {/* 버튼 정렬용 flex 컨테이너 */}
                    <div className="flex justify-end">
                        <button
                            onClick={handleMintSTK}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition mr-3"
                        >
                            민트하기
                        </button>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow text-center">
                    <h2 className="text-xl font-bold mb-2 border-b pb-2">BadgeNFT</h2>
                    <p className="text-lg text-gray-700">
                        총 발행량: <span className="font-mono">{dummyTokenData.badgeTotalSupply.toLocaleString()}</span> 개
                    </p>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
                <h2 className="text-xl font-bold mb-4 border-b pb-2">멤버별 보유 현황</h2>
                <table className="min-w-full table-auto text-center">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-2 px-4">주소</th>
                            <th className="py-2 px-4">STK 보유 수량</th>
                            <th className="py-2 px-4">BadgeNFT 보유 수</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dummyTokenData.members.map((member, i) => (
                            <tr key={i} className="border-t hover:bg-gray-50">
                                <td className="py-2 px-4 font-mono">{member.address}</td>
                                <td className="py-2 px-4">{member.stk}</td>
                                <td className="py-2 px-4">{member.badges}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}


function UserInfo() {
    const [approved, setApproved] = useState({});

    // const handleApprove = (address) => {
    //     setApproved((prev) => ({ ...prev, [address]: true }));
    // };

    return (
        <>
            <div className="bg-white p-6 rounded-xl shadow mb-8">
                <h2 className="text-xl font-bold mb-4 border-b pb-2">연결된 주소</h2>
                <table className="min-w-full table-auto text-center">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-2 px-4">주소</th>
                            <th className="py-2 px-4">작성한 글 수</th>
                            <th className="py-2 px-4">등급</th>
                            <th className="py-2 px-4">승인</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dummyUserData.connectedAddresses.map((user, i) => (
                            <tr key={i} className="border-t hover:bg-gray-50">
                                <td className="py-2 px-4 font-mono">{user.address}</td>
                                <td className="py-2 px-4">{user.posts}</td>
                                <td className="py-2 px-4 font-semibold">{user.rank}</td>
                                <td className="py-2 px-4">
                                    {/* {approved[user.address] ? (
                                        <span className="text-green-600 font-semibold">승인 완료</span>
                                    ) : (
                                        <button
                                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                                            onClick={() => handleApprove(user.address)}
                                        >
                                            멤버 승인
                                        </button>
                                    )} */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
                <h2 className="text-xl font-bold mb-4 border-b pb-2">멤버 주소</h2>
                <table className="min-w-full table-auto text-center">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-2 px-4">주소</th>
                            <th className="py-2 px-4">작성한 글 수</th>
                            <th className="py-2 px-4">등급</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dummyUserData.memberAddresses.map((user, i) => (
                            <tr key={i} className="border-t hover:bg-gray-50">
                                <td className="py-2 px-4 font-mono">{user.address}</td>
                                <td className="py-2 px-4">{user.posts}</td>
                                <td className="py-2 px-4 font-semibold">{user.rank}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
