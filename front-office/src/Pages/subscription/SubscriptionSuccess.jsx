import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useEffect } from 'react';
import { fetchSuccess } from '../../services/subscriptionService';
import loadingSwal from '../../utils/loadingSwal';
import useToken from '../../store/useToken';
import { getRedirectUrl } from '../../utils/roles';


const SubscriptionSuccess = () => {
    const { user } = useToken();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const payerId = params.get('subscription_id');
        
        const getSuccessAbonnenmt = async () => {
            loadingSwal("Traitement de l'état");
            if (payerId) {
                try {
                    const fetchData = await fetchSuccess(payerId);
                    loadingSwal().close();
                    Swal.fire({
                        icon: 'success',
                        title: 'Succès de l\'abonnement',
                        text: fetchData.message,
                        confirmButtonText: "Confermé",
                        allowOutsideClick: false,
                        confirmButtonColor: "green",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            loadingSwal().close();
                            if (user) {
                                navigate(getRedirectUrl(user.role));
                            } else {
                                navigate(getRedirectUrl('visiteur'));
                            }
                        }
                    });
                } catch (error) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Succès de l\'abonnement',
                        text: error.message,
                        confirmButtonText: "Retourné",
                        confirmButtonColor: "red",
                        allowOutsideClick: false,
                    }).then((result) => {
                        if (result.isConfirmed) {
                            if (user) {
                                navigate(getRedirectUrl(user.role));
                            } else {
                                navigate(getRedirectUrl('visiteur'));
                            }
                        }
                    });
                } finally {
                    loadingSwal().close();
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Erreur',
                    text: 'L\'activation de l\'abonnement a échoué. Veuillez réessayer.',
                }).then((result) => {
                    if (result.isConfirmed) {
                        if (user) {
                            navigate(getRedirectUrl(user.role));
                        } else {
                            navigate(getRedirectUrl('visiteur'));
                        }
                    }
                });
            }
            loadingSwal().close();
        }

        getSuccessAbonnenmt(payerId);
        
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
            <h2 className="text-5xl font-bold text-[#6B4423] mb-4">État de l'abonnement</h2>
            <p className="text-lg text-gray-700 mb-6">
                Traitement de l'état de l'abonnement...
            </p>
        </div>
    );
};

export default SubscriptionSuccess