"use client";
import { useState } from "react";

export default function JoinRequestsAdmin({ tournament }: { tournament: any }) {
  const [requests, setRequests] = useState(tournament.joinRequests);

  const handleAction = async (requestId: number, action: "accept" | "reject") => {
    await fetch(`/api/tournaments/${tournament.id}/join/handle`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ requestId, action }),
    });
    setRequests(requests.map(r =>
      r.id === requestId ? { ...r, status: action === "accept" ? "accepted" : "rejected" } : r
    ));
  };

  return (
    <div>
      <h2 className="font-semibold mb-2">Demandes à traiter</h2>
      <ul>
        {requests.filter(r => r.status === "pending").map(r => (
          <li key={r.id} className="flex items-center justify-between mb-2">
            <span>{r.user.pseudo}</span>
            <div>
              <button
                className="bg-green-600 text-white px-2 py-1 rounded mr-2"
                onClick={() => handleAction(r.id, "accept")}
              >Accepter</button>
              <button
                className="bg-red-600 text-white px-2 py-1 rounded"
                onClick={() => handleAction(r.id, "reject")}
              >Refuser</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
