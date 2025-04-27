import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchCancel } from '../../services/subscriptionService';
import useToken from '../../store/useToken';
import { getRedirectUrl } from '../../utils/roles';
import { SpinnerLoadingIcon } from '../../Icons/Icons';


const SubscriptionCancel = () => {
    const { user } = useToken();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [errour, setErrour] = useState("");
    const params = new URLSearchParams(location.search);
    
    const payerId = params.get('subscription_id');
    const token = params.get('token');

    const getSuccessAbonnenmt = async () => {
        setIsLoading(true)
        if (payerId) {
            try {
                const fetchData = await fetchCancel(token, payerId);
                setMessage(fetchData?.message);
            } catch (error) {
                setErrour(error.message);
            }
        } else {
            setErrour("L'activation de l'abonnement a échoué. Veuillez réessayer.");
        } 

        setIsLoading(false);
    }

    useEffect(() => {
        getSuccessAbonnenmt();
    }, []);

    const handleClikConfirm = () => {
        if (user) {
            navigate(getRedirectUrl(user.role));
        } else {
            navigate(getRedirectUrl('visiteur'));
        }
    }

    const refreshClick = () => {
        setIsLoading(true);
        setErrour("");
        getSuccessAbonnenmt();
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
            {isLoading ? (
                <>
                    <div className='flex flex-col gap-6 items-center'>
                        <SpinnerLoadingIcon size={50} />
                        <p className="text-lg text-gray-700 mb-6">
                            Traitement de l'état de l'abonnement...
                        </p>
                    </div>
                </>
            ) : (
                <>
                    <h2 className="text-5xl font-bold text-[#6B4423] mb-4">État de l'abonnement</h2>
                    {errour ? (
                        <div className='space-x-3'>
                            <p className="text-lg text-red-700 mb-6">{errour}</p>
                            <button 
                                onClick={refreshClick}
                                className='bg-red-600 hover:bg-red-600 px-3 py-2 rounded-md text-white'>
                                    Ressayé
                            </button>
                            <button 
                                onClick={handleClikConfirm}
                                className='bg-gray-600 hover:bg-gray-600 px-3 py-2 rounded-md text-white'>
                                    Retourné
                            </button>
                        </div>

                    ) : (
                        <div>
                            <p className="text-lg text-gray-700 mb-6">{message}</p>
                            <button
                                onClick={handleClikConfirm} 
                                className='bg-[#6B4423] hover:bg-[#4f3a28] px-3 py-2 rounded-md text-white'>Confirmé</button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default SubscriptionCancel