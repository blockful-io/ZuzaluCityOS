'use client';

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAccount } from 'wagmi';
import toast from 'react-hot-toast';
import { DropdownMenuAdmin } from '@/app/spaces/[spaceid]/trustful/settings/components';
import { Box } from '@chakra-ui/react';
import { TheFooterNavbar } from '@/app/spaces/[spaceid]/trustful/components';

export const SettingsSection = () => {
  const { address, chain } = useAccount();
  const { push } = useRouter();
  const params = useParams();

  const actualURL = `/spaces/${params.spaceid}/trustful`;

  // const { villagerAttestationCount } = useContext(WalletContext);
  const villagerAttestationCount = Number(1);

  useEffect(() => {
    if (villagerAttestationCount === 0) {
      toast.error('You have not checked in. Please check-in first.');
      push('/pre-checkin');
    }
  }, [villagerAttestationCount]);

  return (
    <div>
      <DropdownMenuAdmin />
      <Box className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full items-center">
        <TheFooterNavbar />
      </Box>
    </div>
  );
};
