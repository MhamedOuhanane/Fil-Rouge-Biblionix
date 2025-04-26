import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import PaginationGrad from "../../pagination/paginationGrid";

const TransactionList = ({
        transactions: initialTransactions,
        message,
        currentPage,
        totalPages,
        handlePreviousPage,
        handleNextPage,
    }) => {
    const [transactions, setTransactions] = useState(initialTransactions || []);
    const isDesktop = useMediaQuery({ minWidth: 768 });

    useEffect(() => {
        setTransactions(initialTransactions || []);
    }, [initialTransactions]);
    console.log(transactions);
    
    

    return (
        <div className="w-full h-[470px] flex flex-col justify-between">
        {transactions?.length === 0 ? (
            <div className="text-center text-amber-700 text-sm">{message}</div>
        ) : (
            <>
                <div className="overflow-x-auto">
                    {isDesktop ? (
                    <table className="hidden md:table min-w-full border border-gray-200">
                        <thead className="bg-gray-100">
                        <tr>
                            <th className="text-left p-3 text-amber-900">ID Paiement</th>
                            <th className="text-left p-3 text-amber-900">Montant</th>
                            <th className="text-left p-3 text-amber-900">Devise</th>
                            <th className="text-left p-3 text-amber-900">Statut</th>
                            <th className="text-left p-3 text-amber-900">Badge</th>
                            <th className="text-left p-3 text-amber-900">
                                Client
                            </th>
                            <th className="text-left p-3 text-amber-900">Date</th>
                        </tr>
                        </thead>
                        <tbody>
                        {transactions.data.map((transaction) => (
                            <tr key={transaction.id} className="border-b">
                            <td className="p-3 font-[merriweather]">
                                {transaction.payment_id}
                            </td>
                            <td className="p-3">{transaction.amount}</td>
                            <td className="p-3">{transaction.currency}</td>
                            <td className="p-3">
                                <span
                                className={`px-2 py-1 rounded text-xs font-medium`}
                                >
                                {transaction.status}
                                </span>
                            </td>
                            <td className="p-3">
                                {transaction?.badge?.title || "-"}
                            </td>
                            <td className="p-3">
                                {transaction?.transactiontable?.first_name  || "-"} {transaction?.transactiontable?.last_name  || "-"}
                            </td>
                            <td className="p-3">
                                {new Date(
                                transaction.created_at
                                ).toLocaleDateString()}
                            </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    ) : (
                    <div className="grid grid-cols-1 gap-4 md:hidden mt-4">
                        {transactions.data.map((transaction) => (
                        <div
                            key={transaction.id}
                            className="bg-white border border-gray-200 rounded-lg p-4 shadow"
                        >
                            <h3 className="font-medium font-[merriweather] text-amber-900 text-lg mb-1">
                            {transaction.payment_id}
                            </h3>
                            <p className="text-sm text-amber-700">
                            💰 {transaction.amount} {transaction.currency}
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                            📌{" "}
                            <span
                                className={`px-2 py-1 rounded`}
                            >
                                {transaction.status}
                            </span>
                            </p>
                            <p className="text-sm text-gray-600">
                            🎖️{" "}
                            <span className="font-medium">
                                {transaction?.badge?.title || "-"}
                            </span>
                            </p>
                            <p className="text-sm text-gray-600">
                            🛡️{" "}
                            <span className="font-medium">
                                {transaction?.transactiontable?.first_name  || "-"} {transaction?.transactiontable?.last_name  || "-"}
                            </span>
                            </p>
                            <p className="text-sm text-gray-600">
                            📅{" "}
                            <span className="font-medium">
                                {new Date(
                                transaction.created_at
                                ).toLocaleDateString()}
                            </span>
                            </p>
                        </div>
                        ))}
                    </div>
                    )}
                </div>
                <PaginationGrad currentPage={currentPage} totalPages={totalPages} handlePreviousPage={handlePreviousPage} handleNextPage={handleNextPage} />            
            </>
        )}
        </div>
    );
};

export default TransactionList;