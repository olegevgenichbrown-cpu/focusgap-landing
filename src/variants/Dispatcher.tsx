import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';
import VariantV1 from './v1/V1';
import VariantV2 from './v2/V2';
import VariantV3 from './v3/V3';
import VariantV4 from './v4/V4';
import AdminPanel from './admin/AdminPanel';
import VIP from './v1/pages/VIP';
import PrivacyPolicy from './v1/pages/PrivacyPolicy';
import TermsOfService from './v1/pages/TermsOfService';

export default function Dispatcher() {
  const location = useLocation();
  const variant = useMemo(() => {
    const params = new URLSearchParams(location.search);
    if (params.has('adm')) return 'admin';
    if (location.pathname === '/vip') return 'vip';
    if (location.pathname === '/privacy') return 'privacy';
    if (location.pathname === '/terms') return 'terms';
    if (params.has('v4')) return 'v4';
    if (params.has('v3')) return 'v3';
    if (params.has('v2')) return 'v2';
    if (params.has('v1')) return 'v1';
    return 'v1'; // Default
  }, [location]);

  switch (variant) {
    case 'admin': return <AdminPanel />;
    case 'v4': return <VariantV4 />;
    case 'v3': return <VariantV3 />;
    case 'v2': return <VariantV2 />;
    case 'vip': return <VIP />;
    case 'privacy': return <PrivacyPolicy />;
    case 'terms': return <TermsOfService />;
    case 'v1':
    default: return <VariantV1 />;
  }
}
